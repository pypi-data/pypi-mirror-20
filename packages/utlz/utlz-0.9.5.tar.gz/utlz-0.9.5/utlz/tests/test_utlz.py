import hashlib
import random
from os.path import join, dirname
from tempfile import NamedTemporaryFile

import utlz
from utlz import flo


def test_flo():
    foo = 'AAA'
    bar = 'Bbb'
    baz = 'ccc'

    assert utlz.flo('{foo}.{bar}.{baz}') == 'AAA.Bbb.ccc'

    long_ = '{foo}.{bar}.{baz}'.format(**locals())
    assert utlz.flo('{foo}.{bar}.{baz}') == long_

    very_long = '{foo}.{bar}.{baz}'.format(foo=foo, bar=bar, baz=baz)
    assert utlz.flo('{foo}.{bar}.{baz}') == very_long


def test_load_json():
    filename = join(dirname(__file__), 'test_data', 'data.json')
    data_is = utlz.load_json(filename)
    data_must = ['aa', {'a': {'k1': [1, 2, 3], 'k2': 'value'}, 'b': 'bbb'}, 333]
    assert data_is == data_must


def test_write_json():
    test_data = [  # (<data_in>, <data_must>, <from_file_must>), ...
        (
            ['aa', {'a': {'k1': [1, 2, 3], 'k2': 'val'}, 'b': 'bbb'}, 333],
            ['aa', {'a': {'k1': [1, 2, 3], 'k2': 'val'}, 'b': 'bbb'}, 333],
            '["aa", {"a": {"k1": [1, 2, 3], "k2": "val"}, "b": "bbb"}, 333]',
        ),
        (
            ['aa', {'a': {'k2': 'val', 'k1': [1, 2, 3]}, 'b': 'bbb'}, 333],
            ['aa', {'a': {'k1': [1, 2, 3], 'k2': 'val'}, 'b': 'bbb'}, 333],
            '["aa", {"a": {"k1": [1, 2, 3], "k2": "val"}, "b": "bbb"}, 333]',
        ),
    ]
    for data_in, data_must, from_file_must in test_data:
        with NamedTemporaryFile() as tmpf:
            utlz.write_json(data_in, tmpf.name)
            tmpf.seek(0)
            data_is = utlz.load_json(tmpf.name)
            tmpf.seek(0)
            from_file = tmpf.read().decode('utf-8')
            assert data_is == data_must
            assert from_file == from_file_must


def test_flat_list():
    assert utlz.flat_list([[1, 2], [3, 4, 5], [6]]) == [1, 2, 3, 4, 5, 6]


def test_text_with_newlines():
    prefix = 'This is a "very" long string which is longer than 78 chars.  '
    middle = 'Really, it has 79'
    postfx = '.'
    long_text = prefix + middle + postfx
    assert utlz.text_with_newlines(long_text) == prefix + middle + '\n' + postfx
    assert utlz.text_with_newlines(long_text, line_length=79) == long_text
    assert utlz.text_with_newlines(long_text, line_length=80) == long_text
    assert utlz.text_with_newlines(long_text, line_length=900) == long_text
    assert utlz.text_with_newlines(long_text, line_length=0) == long_text
    special_newline = prefix + middle + '\r\n' + postfx
    assert utlz.text_with_newlines(long_text, newline='\r\n') == special_newline


def test_func_has_arg():

    def func1(foo):
        pass

    class Class1(object):

        def __init__(self, bar):
            pass

    assert utlz.func_has_arg(func=func1, arg='foo') is True
    assert utlz.func_has_arg(func=func1, arg='bar') is False
    assert utlz.func_has_arg(func=Class1.__init__, arg='self') is True
    assert utlz.func_has_arg(func=Class1.__init__, arg='bar') is True
    assert utlz.func_has_arg(func=Class1.__init__, arg='baz') is False


def test_lazy_val():

    def func1(arg):
        func1.calls += 1
        return arg.attr + arg.attr
    func1.calls = 0

    class TestClass:

        lazy1 = utlz.lazy_val(lambda self: 'baz ' + str(self.attr),
                              with_del_hook=True)

        def __init__(self, arg):
            self.attr = arg

        @utlz.lazy_val
        def lazy2(self):
            return func1(self)

        @utlz.lazy_val
        def lazy3(self):
            return 'foo ' + str(self.attr)

    inst1 = TestClass(111)
    assert func1.calls == 0
    assert inst1.lazy2 == 222
    assert func1.calls == 1
    assert inst1.lazy2 == 222
    assert func1.calls == 1, 'func1.calls is still 1'
    assert inst1.lazy3 == 'foo 111'
    assert inst1.lazy1 == 'baz 111'
    inst2 = TestClass(333)
    assert inst2.lazy1 == 'baz 333'

    # test_lazy_val: del_hook()

    for i in range(10):
        instances = []
        for j in range(10):
            inst = TestClass(random.randint(0, 1000))
            assert inst.lazy1 == flo('baz {inst.attr}')
            assert inst.lazy2 == inst.attr * 2
            assert inst.lazy3 == flo('foo {inst.attr}')
            instances.append(inst)
        for inst in instances:
            assert inst.lazy1 == flo('baz {inst.attr}')
            assert inst.lazy2 == inst.attr * 2
            assert inst.lazy3 == flo('foo {inst.attr}')


def test_namedtuple():
    SimpleTuple = utlz.namedtuple(
        typename='SimpleTuple',
        field_names='foo, bar, baz'
    )
    st1 = SimpleTuple(1, 2, 3)
    assert st1.foo == 1 and st1.bar == 2 and st1.baz == 3
    assert st1[0] == 1 and st1[1] == 2 and st1[2] == 3
    st2 = SimpleTuple(baz='ccc', bar='bbb', foo='aaa')
    assert st2.foo == 'aaa' and st2.bar == 'bbb' and st2.baz == 'ccc'

    WithDefaults = utlz.namedtuple(
        typename='WithDefaults',
        field_names='foo, bar=222, baz=None, bla="hihi"'
    )
    wd1 = WithDefaults('hoho')
    assert str(wd1) == "WithDefaults(foo='hoho', bar=222, baz=None, bla='hihi')"
    wd2 = WithDefaults(baz=True, foo='111')
    assert wd2.baz is True and wd2[0] == '111'

    WithLazyVals = utlz.namedtuple(
        typename='WithLazyVals',
        field_names='foo, bar=22',
        lazy_vals={
            'foo_upper': lambda self: self.foo.upper(),
            'bar_as_str': lambda self: str(self.bar),
        }
    )
    wlv1 = WithLazyVals('Hello, World!')
    assert wlv1.bar_as_str == '22'
    assert wlv1.foo_upper == 'HELLO, WORLD!'
    wlv2 = WithLazyVals('asdf')
    assert wlv2.foo_upper == 'ASDF'


def test_namedtuple_lazy_val():
    tail_a = str(random.randint(0, 100))
    tail_b = str(random.randint(0, 100))
    tail_c = str(random.randint(0, 100))
    Tuple = utlz.namedtuple(
        typename='Tuple',
        field_names=[
            'a',
            'b',
            'c',
            'd',
            'e',
        ],
        lazy_vals={
            'a_lazy': lambda self: self.a + tail_a,
            'b_lazy': lambda self: self.b + tail_b,
            'c_lazy': lambda self: bytes(self.c + tail_c, 'utf-8'),
            'd_lazy': lambda self: hashlib.sha256(bytes(self.d,
                                                        'utf-8')).digest(),
            'e_lazy': lambda self: [i+123 for i in self.e],
        }
    )
    for i in range(10):
        tupels = []
        for j in range(10):
            tup = Tuple(
                a=str(random.randint(0, 1000)),
                b=str(random.randint(0, 1000)),
                c=str(random.randint(0, 1000)),
                d=str(random.randint(0, 1000)),
                e=[1, 2, 3, random.randint(0, 1000)],
            )
            assert tup.a + tail_a == tup.a_lazy
            assert tup.b + tail_b == tup.b_lazy
            try:
                assert bytes(tup.c + tail_c, 'utf-8') == tup.c_lazy
                assert hashlib.sha256(bytes(tup.d,
                                            'utf-8')).digest() == tup.d_lazy
            except TypeError:
                # python 2.x
                # in python 2.x bytes == str, and accepts exactly one argument
                pass
            assert [i+123 for i in tup.e] == tup.e_lazy
            tupels.append(tup)
        for tup in tupels:
            assert tup.a + tail_a == tup.a_lazy
            assert tup.b + tail_b == tup.b_lazy
            try:
                assert bytes(tup.c + tail_c, 'utf-8') == tup.c_lazy
                assert hashlib.sha256(bytes(tup.d,
                                            'utf-8')).digest() == tup.d_lazy
            except TypeError:
                # python 2.x
                # in python 2.x bytes == str, and accepts exactly one argument
                pass
            assert [i+123 for i in tup.e] == tup.e_lazy
