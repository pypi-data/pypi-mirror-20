from operator import attrgetter
from nose.tools import assert_raises
from syn.base.b import Attr
from syn.tree.b import Node, TreeError
from syn.schema.b.sequence import Sequence
from syn.base.b.tests.test_base import check_idempotence
from syn.base_utils import assert_equivalent, assert_inequivalent, consume, \
    ngzwarn, is_hashable
from syn.types.a import generate, hashable, find_ne, DiffersAtAttribute, \
    estr, visit, rstr, attrs, pairs, deserialize, serialize, deep_feq, \
    primitive_form
from syn.five import xrange

from syn.globals import TEST_SAMPLES as SAMPLES
SAMPLES //= 10
SAMPLES = max(SAMPLES, 1)
ngzwarn(SAMPLES, 'SAMPLES')

#-------------------------------------------------------------------------------
# Tree Node Test 1

def treenode_tst_1(cls):
    n1 = cls(_name='n1')
    n2 = cls(_name='n2')
    n3 = cls(_name='n3')

    assert n1.node_count() == 1
    n1.add_child(n2)
    assert n1.node_count() == 2

    assert n2 in n1._children
    assert n2._parent is n1
    assert not n2._children
    assert not n1._parent

    n1.add_child(n3, 0)
    assert n3 == n1._children[0]
    assert n1.node_count() == 3

    check_idempotence(n1)

    n1.validate()
    n1.set_child_parents(1, True)
    assert all(c._parent == 1 for c in n1._children)
    assert all(c._parent == 1 for c in n2._children)
    assert_raises(TypeError, n1.validate)

#-------------------------------------------------------------------------------
# Tree Node Test 2

class Tst1(Node):
    _attrs = dict(value = Attr(int))

def tree_node_from_nested_list(x, lst):
    ret = Tst1(_name= 'n{}'.format(x), value = x)
    assert len(lst) % 2 == 0 or not any(isinstance(x, list) for x in lst)
    
    if not any(isinstance(x, list) for x in lst):
        for x in lst:
            child = Tst1(_name = 'n{}'.format(x), value = x)
            ret.add_child(child)
    else:
        for i in range(0, len(lst), 2):
            x, sublst = lst[i], lst[i+1]
            child = tree_node_from_nested_list(x, sublst)
            ret.add_child(child)

    return ret

class Tst2(Tst1):
    pass

def tree_node_from_nested_list_types(x, lst, mod=4):
    if x % mod == 0:
        ret = Tst2(_name= 'n{}'.format(x), value = x)
    else:
        ret = Tst1(_name= 'n{}'.format(x), value = x)
    assert len(lst) % 2 == 0 or not any(isinstance(x, list) for x in lst)
    
    if not any(isinstance(x, list) for x in lst):
        for x in lst:
            if x % mod == 0:
                child = Tst2(_name = 'n{}'.format(x), value = x)
            else:
                child = Tst1(_name = 'n{}'.format(x), value = x)
            ret.add_child(child)
    else:
        for i in range(0, len(lst), 2):
            x, sublst = lst[i], lst[i+1]
            child = tree_node_from_nested_list_types(x, sublst, mod)
            ret.add_child(child)

    return ret

def treenode_tst_2(cls):
    import math
    from syn.base_utils import seq_list_nested

    b = 3
    d = 4 # 121 nodes

    lst, N = seq_list_nested(b, d, top_level=False)

    root = tree_node_from_nested_list(lst[0], lst[1])
    assert isinstance(root, Node)
    assert isinstance(root, Tst1)

    nodes = root.collect_nodes()
    assert len(nodes) == N
    check_idempotence(root)

    mod = 4
    sproot = tree_node_from_nested_list_types(lst[0], lst[1], mod)
    specials = sproot.collect_by_type(Tst2)

    assert len(specials) == int(math.floor(N/mod))

    special = sproot.find_type(Tst2)
    assert special.value == 16
    assert sproot.find_type(Tst2, True) is None

    n79l = sproot.collect_nodes('value', 79)
    assert len(n79l) == 1
    assert n79l[0].value == 79

    gt50l = sproot.collect_nodes(key = lambda n: n.value > 50)
    assert len(gt50l) == N - 50
    assert all(n.value > 50 for n in gt50l)

    assert_raises(TypeError, sproot.collect_nodes, key=1)

#-------------------------------------------------------------------------------
# Tree Node Test 3

def treenode_tst_3(cls):
    n5 = cls(_id = 5)
    n4 = cls(_id = 4)
    n3 = cls(n4, _id = 3)
    n2 = cls(_id = 2)
    n1 = cls(n2, n3, n5, _id = 1)

    assert n4.collect_rootward() == [n4, n3, n1]
    assert list(n4.rootward()) == [n4, n3, n1]
    assert list(n4.rootward(filt=lambda n: n._id >= 3)) == [n4, n3]
    assert list(n4.rootward(filt=lambda n: n._id <= 3)) == [n3, n1]
    assert list(n4.rootward(func=attrgetter('_id'), 
                            filt=lambda n: n._id <= 3)) == [3, 1]
    
    assert list(n1.depth_first()) == [n1, n2, n3, n4, n5]
    assert list(n1.depth_first(reverse=True)) == [n5, n4, n3, n2, n1]
    assert list(n1.depth_first(func=attrgetter('_id'),
                               filt=lambda n: n._id % 2 == 0)) == [2, 4]

    assert n1._children == [n2, n3, n5]
    assert n3._children == [n4]
    assert n2._parent is n1
    assert n3._parent is n1
    assert n4._parent is n3
    assert n5._parent is n1

    assert list(n1.children()) == [n2, n3, n5]
    assert list(n1.children(reverse=True)) == [n5, n3, n2]
    
    assert list(n5.siblings()) == [n2, n3]
    assert list(n5.siblings(preceding=True)) == [n2, n3]
    assert list(n5.siblings(preceding=True, axis=True)) == [n3, n2]
    assert list(n5.siblings(following=True)) == []
    assert list(n5.siblings(following=True, axis=True)) == []
    assert list(n4.siblings()) == []
    assert list(n3.siblings()) == [n2, n5]
    assert list(n3.siblings(preceding=True)) == [n2]
    assert list(n3.siblings(preceding=True, axis=True)) == [n2]
    assert list(n3.siblings(following=True)) == [n5]
    assert list(n3.siblings(following=True, axis=True)) == [n5]
    assert list(n2.siblings()) == [n3, n5]
    assert list(n2.siblings(axis=True)) == [n3, n5]
    assert list(n2.siblings(following=True)) == [n3, n5]
    assert list(n2.siblings(following=True, axis=True)) == [n3, n5]
    assert list(n2.siblings(preceding=True)) == []
    assert list(n2.siblings(preceding=True, axis=True)) == []
    assert list(n1.siblings()) == []

    assert list(n1.descendants()) == [n2, n3, n4, n5]
    assert list(n1.descendants(include_self=True)) == [n1, n2, n3, n4, n5]
    assert list(n2.descendants()) == []
    assert list(n3.descendants()) == [n4]
    assert list(n4.descendants()) == []
    assert list(n5.descendants()) == []

    assert list(n1.ancestors()) == []
    assert list(n2.ancestors()) == [n1]
    assert list(n3.ancestors()) == [n1]
    assert list(n4.ancestors()) == [n3, n1]
    assert list(n4.ancestors(include_self=True)) == [n4, n3, n1]
    assert list(n5.ancestors()) == [n1]

    assert list(n1.following()) == [n2, n3, n4, n5]
    assert list(n2.following()) == [n3, n4, n5]
    assert list(n3.following()) == [n4, n5]
    assert list(n4.following()) == [n5]
    assert list(n5.following()) == []

    assert list(n1.preceding()) == []
    assert list(n2.preceding()) == [n1]
    assert list(n3.preceding()) == [n2, n1]
    assert list(n4.preceding()) == [n3, n2, n1]
    assert list(n5.preceding()) == [n4, n3, n2, n1]

    assert n1.root() is n1
    assert n2.root() is n1
    assert n3.root() is n1
    assert n4.root() is n1
    assert n5.root() is n1

    assert n1.node_count() == 5
    n4.add_child(Node())
    assert n1.node_count() == 6
    assert n4.node_count() == 2
    n3.remove_child(n4)
    assert n1.node_count() == 4
    n1.remove_child(n5)
    assert n1.node_count() == 3
    assert n1._children == [n2, n3]
    assert n5._parent is None
    assert list(n5.siblings()) == []
    assert list(n1.descendants()) == [n2, n3]
    
    assert_raises(TreeError, n1.remove_child, n5)

    def set_foo(n):
        n.foo = n._id * 2
    consume(n1.depth_first(set_foo))
    assert list(n1.depth_first(attrgetter('foo'))) == [2, 4, 6]

#-------------------------------------------------------------------------------
# Tree Node

def test_tree_node():
    n = Node()
    assert n._children == []
    assert n._parent is None
    assert n._id is None
    assert n._name is None
    assert bool(n) is True
    assert_equivalent(n, Node())

    obj = Node(_id = 4545, _name = 'foonode')
    assert obj._children == []
    assert obj._parent is None
    assert obj._id == 4545
    assert obj._name == 'foonode'

    assert list(obj.children()) == obj._children
    assert obj.parent() is obj._parent
    assert obj.id() is obj._id
    assert obj.name() is obj._name
    assert_inequivalent(obj, n)

    treenode_tst_1(Node)
    treenode_tst_2(Node)
    treenode_tst_3(Node)

#-------------------------------------------------------------------------------
# must_be_root

class Root1(Node):
    _opts = dict(must_be_root = True)

def test_node_must_be_root():
    n2 = Node(_id = 2)
    r1 = Root1(n2, _id = 1)

    r1.validate()

    r2 = Root1(_id = 3)
    r1.add_child(r2)
    assert_raises(TreeError, r2.validate)
    assert_raises(TreeError, r1.validate)

#-------------------------------------------------------------------------------
# attributes

class A1(Node):
    _attrs = dict(a = Attr(int),
                  b = Attr(float),
                  c = Attr(int, internal=True))
    
def test_attributes():
    a = A1(a = 1, b = 1.2, c = 3)
    assert sorted(list(a.attributes())) == [('a', 1), ('b', 1.2)]

#-------------------------------------------------------------------------------
# Child Types

class CT1(Node):
    pass

class CT2(Node):
    pass

class CTTest(Node):
    _opts = dict(init_validate = True,
                 min_len = 1)
    types = [CT1]

def test_child_types():
    CTTest(CT1())
    assert_raises(TypeError, CTTest, CT1(), CT2())

    for k in xrange(SAMPLES):
        val = generate(CTTest)
        val.validate()

#-------------------------------------------------------------------------------
# Descendant Exclude

class DE1(Node):
    pass

class DE3(Node):
    pass

class DE4(Node):
    pass

class DE2(Node):
    _opts = dict(min_len = 1)
    types = [DE3, DE4]

class DETest(Node):
    types = [DE1, DE2]
    _opts = dict(descendant_exclude = [DE4],
                 min_len = 1,
                 init_validate = True)

def test_descendant_exclude():
    DETest(DE1())
    DETest(DE1(DE2(DE3())))

    n = DE2(DE4())
    assert_raises(TypeError, DETest, n)

    for k in xrange(SAMPLES):
        val = generate(DETest)
        val.validate()

#-------------------------------------------------------------------------------
# Schema Attrs

class SA1(Node):
    pass

class SA2(Node):
    pass

class SA3(Node):
    pass

class SA4(Node):
    _opts = dict(min_len = 1)
    types = [SA2, SA3]

class SchemaTest(Node):
    _opts = dict(init_validate = True)
    _attrs = dict(a = Attr(int))
    schema = Sequence(SA1, SA2)

class ST2(Node):
    _opts = dict(init_validate = True,
                 descendant_exclude = [SA3])
    schema = Sequence(SA1, SA4)
    

def test_schema_attrs():
    SchemaTest(SA1(), SA2(), a=1)
    assert_raises(TypeError, SchemaTest, SA1(), SA3(), a=2)

    for k in xrange(SAMPLES):
        val = generate(SchemaTest)
        assert type(val) is SchemaTest
        assert isinstance(val.a, int)
        assert type(val[0]) is SA1
        assert type(val[1]) is SA2
        assert len(val) == 2

    def bad():
        class SchemaTest2(Node):
            schema = Sequence(SA1, SA2)
            types = (SA1, SA1)

    assert_raises(TypeError, bad)

    ST2(SA1(), SA4(SA2()))
    SA4(SA3()).validate()
    assert_raises(TypeError, ST2, SA1(), SA4(SA3()))

    for k in xrange(SAMPLES):
        val = generate(ST2)
        assert type(val) is ST2
        assert type(val[0]) is SA1
        assert type(val[1]) is SA4
        assert len(val) == 2

#-------------------------------------------------------------------------------
# syn.types functionality

class STT1(Node):
    _attrs = dict(a = Attr(int))

class SynTypesTest(Node):
    _opts = dict(min_len = 1)
    _attrs = dict(a = Attr(int),
                  b = Attr(float))
    types = [STT1]

def test_syn_types_functionality():
    c1 = STT1(a=3)
    n = SynTypesTest(c1, a=1, b=2.3)
    n.validate()

    assert not is_hashable(n)
    assert is_hashable(hashable(n))
    
#-------------------------------------------------------------------------------

if __name__ == '__main__': # pragma: no cover
    from syn.base_utils import run_all_tests
    run_all_tests(globals(), verbose=True, print_errors=False)
