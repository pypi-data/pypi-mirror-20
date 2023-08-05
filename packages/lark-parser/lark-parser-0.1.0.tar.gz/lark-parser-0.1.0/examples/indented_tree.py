"""This example demonstrates usage of the Indenter class.

Since indentation is context-sensitive, a postlex stage is introduced to manufacture INDENT/DEDENT tokens.
It is crucial for the indenter that the NL_type matches the spaces (and tabs) after the newline.
"""

from lark.lark import Lark
from lark.indenter import Indenter

tree_grammar = """
    ?start: _NL* tree

    tree: /\w+/ _NL [_INDENT tree+ _DEDENT]

    NAME: /\w+/

    WS.ignore: /\s+/
    _NL.newline: /(\r?\n[\t ]*)+/
"""

class TreeIndenter(Indenter):
    NL_type = '_NL'
    OPEN_PAREN_types = []
    CLOSE_PAREN_types = []
    INDENT_type = '_INDENT'
    DEDENT_type = '_DEDENT'
    tab_len = 8

parser = Lark(tree_grammar, parser='lalr', postlex=TreeIndenter())

test_tree = """
a
    b
    c
        d
        e
    f
        g
"""

def test():
    print parser.parse(test_tree).pretty()

if __name__ == '__main__':
    test()

