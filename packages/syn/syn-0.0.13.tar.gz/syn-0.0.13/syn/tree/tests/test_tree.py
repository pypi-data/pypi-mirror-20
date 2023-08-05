import syn.tree
import syn.tree.b
from syn.tree import query as sq

#-------------------------------------------------------------------------------
# Tree imports

def test_tree_imports():
    assert syn.tree.Node is syn.tree.b.Node
    assert syn.tree.Tree is syn.tree.b.Tree
    assert syn.tree.TreeError is syn.tree.b.TreeError
    assert sq.Query is syn.tree.b.query.Query

#-------------------------------------------------------------------------------

if __name__ == '__main__': # pragma: no cover
    from syn.base_utils import run_all_tests
    run_all_tests(globals(), verbose=True, print_errors=False)
