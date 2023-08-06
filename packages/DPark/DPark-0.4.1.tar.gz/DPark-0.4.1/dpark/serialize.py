import sys
import types
from cStringIO import StringIO
import marshal
import new
import cPickle
import itertools
from pickle import Pickler, whichmodule, PROTO, STOP
from collections import deque

from dpark.util import get_logger
logger = get_logger(__name__)


class LazySave(object):
    '''Out of band marker for lazy saves among lazy writes.'''

    def __init__(self, obj):
        self.obj = obj

    def __repr__(self):
        return '<LazySave %s>' % repr(self.obj)


class MyPickler(Pickler):

    def __init__(self, file, protocol=None):
        Pickler.__init__(self, file, protocol)
        self.lazywrites = deque()
        self.realwrite = file.write

        # Pickler.__init__ overwrites self.write, we do not want that
        del self.write

    def write(self, *args):
        if self.lazywrites:
            self.lazywrites.append(args)
        else:
            self.realwrite(*args)

    def save(self, obj):
        self.lazywrites.append(LazySave(obj))

    realsave = Pickler.save

    def dump(self, obj):
        """Write a pickled representation of obj to the open file."""
        if self.proto >= 2:
            self.write(PROTO + chr(self.proto))
        self.realsave(obj)
        queues = deque([self.lazywrites])
        while queues:
            lws = queues[0]
            self.lazywrites = deque()
            while lws:
                lw = lws.popleft()
                if isinstance(lw, LazySave):
                    self.realsave(lw.obj)
                    if self.lazywrites:
                        queues.appendleft(self.lazywrites)
                        break
                else:
                    self.realwrite(*lw)
            else:
                queues.popleft()

        self.realwrite(STOP)

    dispatch = Pickler.dispatch.copy()

    @classmethod
    def register(cls, type, reduce):
        def dispatcher(self, obj):
            rv = reduce(obj)
            if isinstance(rv, str):
                self.save_global(obj, rv)
            else:
                self.save_reduce(obj=obj, *rv)
        cls.dispatch[type] = dispatcher


def dumps(o):
    io = StringIO()
    MyPickler(io, -1).dump(o)
    return io.getvalue()


def loads(s):
    return cPickle.loads(s)

dump_func = dumps
load_func = loads


def reduce_module(mod):
    return load_module, (mod.__name__, )


def load_module(name):
    __import__(name)
    return sys.modules[name]

MyPickler.register(types.ModuleType, reduce_module)


class RecursiveFunctionPlaceholder(object):
    """
    Placeholder for a recursive reference to the current function,
    to avoid infinite recursion when serializing recursive functions.
    """

    def __eq__(self, other):
        return isinstance(other, RecursiveFunctionPlaceholder)

RECURSIVE_FUNCTION_PLACEHOLDER = RecursiveFunctionPlaceholder()


def marshalable(o):
    if o is None:
        return True
    t = type(o)
    if t in (str, unicode, bool, int, long, float, complex):
        return True
    if t in (tuple, list, set):
        for i in itertools.islice(o, 100):
            if not marshalable(i):
                return False
        return True
    if t == dict:
        for k, v in itertools.islice(o.iteritems(), 100):
            if not marshalable(k) or not marshalable(v):
                return False
        return True
    return False

OBJECT_SIZE_LIMIT = 100 << 10


def create_broadcast(name, obj, func_name):
    import dpark
    logger.info("use broadcast for object %s %s (used in function %s)",
                name, type(obj), func_name)
    return dpark._ctx.broadcast(obj)


def dump_obj(f, name, obj):
    if obj is f:
        # Prevent infinite recursion when dumping a recursive function
        return dumps(RECURSIVE_FUNCTION_PLACEHOLDER)

    try:
        if sys.getsizeof(obj) > OBJECT_SIZE_LIMIT:
            obj = create_broadcast(name, obj, f.__name__)
    except TypeError:
        pass

    b = dumps(obj)
    if len(b) > OBJECT_SIZE_LIMIT:
        b = dumps(create_broadcast(name, obj, f.__name__))
    if len(b) > OBJECT_SIZE_LIMIT:
        logger.warning("broadcast of %s obj too large", type(obj))
    return b


def get_co_names(code):
    co_names = code.co_names
    for const in code.co_consts:
        if isinstance(const, types.CodeType):
            co_names += get_co_names(const)

    return co_names


def dump_closure(f, skip=set()):
    def _do_dump(f):
        for i, c in enumerate(f.func_closure):
            if hasattr(c, 'cell_contents'):
                yield dump_obj(f, 'cell%d' % i, c.cell_contents)
            else:
                yield None

    code = f.func_code
    glob = {}
    for n in get_co_names(code):
        r = f.func_globals.get(n)
        if r is not None and n not in skip:
            glob[n] = dump_obj(f, n, r)

    closure = None
    if f.func_closure:
        closure = tuple(_do_dump(f))
    return marshal.dumps(
        (code, glob, f.func_name, f.func_defaults, closure, f.__module__))


def load_closure(bytes):
    code, glob, name, defaults, closure, mod = marshal.loads(bytes)
    glob = dict((k, loads(v)) for k, v in glob.items())
    glob['__builtins__'] = __builtins__
    closure = closure and reconstruct_closure(closure) or None
    f = new.function(code, glob, name, defaults, closure)
    f.__module__ = mod
    # Replace the recursive function placeholders with this simulated function
    # pointer
    for key, value in glob.items():
        if RECURSIVE_FUNCTION_PLACEHOLDER == value:
            f.func_globals[key] = f
    return f


def make_cell(value):
    return (lambda: value).func_closure[0]


def make_empty_cell():
    if False:
        unreachable = None
    return (lambda: unreachable).func_closure[0]


def reconstruct_closure(closure):
    return tuple(
        [make_cell(loads(v)) if v is not None
         else make_empty_cell() for v in closure])


def get_global_function(module, name):
    __import__(module)
    mod = sys.modules[module]
    return getattr(mod, name)


def reduce_function(obj):
    name = obj.__name__
    if not name or name == '<lambda>':
        return load_closure, (dump_closure(obj),)

    module = getattr(obj, "__module__", None)
    if module is None:
        module = whichmodule(obj, name)

    if module == '__main__' and \
       name not in ('load_closure', 'load_module',
                    'load_method', 'load_local_class'):  # fix for test
        return load_closure, (dump_closure(obj),)

    try:
        f = get_global_function(module, name)
    except (ImportError, KeyError, AttributeError):
        return load_closure, (dump_closure(obj),)
    else:
        if f is not obj:
            return load_closure, (dump_closure(obj),)
        return name

classes_dumping = set()
internal_fields = {
    '__weakref__': False,
    '__dict__': False,
    '__doc__': True,
    '__slots__': True,
}


def dump_local_class(cls):
    name = cls.__name__
    if cls in classes_dumping:
        return dumps(name)

    classes_dumping.add(cls)
    internal = {}
    external = {}
    keys = cls.__dict__.keys()
    for k in keys:
        if k not in internal_fields:
            v = getattr(cls, k)
            if isinstance(v, property):
                k = ('property', k)
                v = (v.fget, v.fset, v.fdel, v.__doc__)

            if isinstance(v, types.FunctionType):
                k = ('staticmethod', k)

            if isinstance(v, types.MethodType):
                k = ('method', k)
                v = (v.im_self, dump_closure(v.im_func, skip=set(keys)))

            if not isinstance(v, types.MemberDescriptorType):
                external[k] = v

        elif internal_fields[k]:
            internal[k] = getattr(cls, k)

    result = dumps((cls.__name__, cls.__bases__, internal, dumps(external)))
    if cls in classes_dumping:
        classes_dumping.remove(cls)

    return result

classes_loaded = {}


def load_local_class(bytes):
    t = loads(bytes)
    if not isinstance(t, tuple):
        return classes_loaded[t]

    name, bases, internal, external = t
    if name in classes_loaded:
        return classes_loaded[name]

    cls = new.classobj(name, bases, internal)
    classes_loaded[name] = cls
    for k, v in loads(external).items():
        if isinstance(k, tuple):
            t, k = k
            if t == 'property':
                fget, fset, fdel, doc = v
                v = property(fget, fset, fdel, doc)

            if t == 'staticmethod':
                v = staticmethod(v)

            if t == 'method':
                im_self, _func = v
                im_func = load_closure(_func)
                v = types.MethodType(im_func, im_self, cls)

        setattr(cls, k, v)

    return cls


def reduce_class(obj):
    name = obj.__name__
    module = getattr(obj, "__module__", None)
    if module == '__main__' and name not in (
            'MyPickler', 'RecursiveFunctionPlaceholder'):
        result = load_local_class, (dump_local_class(obj),)
        return result

    return name


def dump_method(method):
    obj = method.im_self or method.im_class
    func = method.im_func

    return dumps((obj, func.__name__))


def load_method(bytes):
    _self, func_name = loads(bytes)
    return getattr(_self, func_name)


def reduce_method(method):
    module = method.im_func.__module__
    return load_method, (dump_method(method), )

MyPickler.register(types.LambdaType, reduce_function)
MyPickler.register(types.ClassType, reduce_class)
MyPickler.register(types.TypeType, reduce_class)
MyPickler.register(types.MethodType, reduce_method)

if __name__ == "__main__":
    assert marshalable(None)
    assert marshalable("")
    assert marshalable(u"")
    assert not marshalable(buffer(""))
    assert marshalable(0)
    assert marshalable(0)
    assert marshalable(0.0)
    assert marshalable(True)
    assert marshalable(complex(1, 1))
    assert marshalable((1, 1))
    assert marshalable([1, 1])
    assert marshalable(set([1, 1]))
    assert marshalable({1: None})

    some_global = 'some global'

    def glob_func(s):
        return "glob:" + s

    def get_closure(x):
        glob_func(some_global)
        last = " last"

        def foo(y): return "foo: " + y

        def the_closure(a, b=1):
            marshal.dumps(a)
            return (a * x + int(b), glob_func(foo(some_global) + last))
        return the_closure

    f = get_closure(10)
    ff = loads(dumps(f))
    # print globals()
    print f(2)
    print ff(2)
    glob_func = loads(dumps(glob_func))
    get_closure = loads(dumps(get_closure))

    # Test recursive functions
    def fib(n): return n if n <= 1 else fib(n - 1) + fib(n - 2)
    assert fib(8) == loads(dumps(fib))(8)

    class Foo1:

        def foo(self):
            return 1234

    class Foo2(object):

        def foo(self):
            return 5678

    class Foo3(Foo2):
        x = 1111

        def foo(self):
            return super(Foo3, self).foo() + Foo3.x

    class Foo4(object):

        @classmethod
        def x(cls):
            return 1

        @property
        def y(self):
            return 2

        @staticmethod
        def z():
            return 3

        def recursive(self, x):
            if x <= 0:
                return x
            else:
                return self.recursive(x - 1)

    df1 = dumps(Foo1)
    df2 = dumps(Foo2)
    df3 = dumps(Foo3)
    df4 = dumps(Foo4)

    del Foo1
    del Foo2
    del Foo3
    del Foo4

    Foo1 = loads(df1)
    Foo2 = loads(df2)
    Foo3 = loads(df3)
    Foo4 = loads(df4)

    f1 = Foo1()
    f2 = Foo2()
    f3 = Foo3()
    f4 = Foo4()

    assert f1.foo() == 1234
    assert f2.foo() == 5678
    assert f3.foo() == 5678 + 1111
    assert Foo4.x() == 1

    recursive = Foo4().recursive
    _recursive = loads(dumps(recursive))
    assert _recursive(5) == 0

    f = loads(dumps(lambda: (some_global for i in xrange(1))))
    print list(f())
    assert list(f()) == [some_global]
