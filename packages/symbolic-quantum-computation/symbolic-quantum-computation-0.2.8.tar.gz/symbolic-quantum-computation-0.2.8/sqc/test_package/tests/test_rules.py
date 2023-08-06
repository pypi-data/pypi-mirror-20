import unittest

from sqc.src.Tree import Tree, Rules
from sqc.src.operations import Compare


class Test(unittest.TestCase):
    def test_const1(self):
        input_string = '2*pi*i'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('i*i:-1')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, '(2*pi)*i')

    def test_const2(self):
        input_string = 'i*i'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('i*i:-1')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, '-1')

    def test_const3(self):
        input_string = 'ln(e)'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('ln(e):1')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, '1')

    def test_const4(self):
        input_string = 'e**(pi*i)'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('e**(pi*i):-1')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, '-1')

    def test_mult_by_one(self):
        input_string = 'a*b'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('a:1*a')
        Rules.apply_rule(tree.root.children[0], rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, '(1*a)*b')

    def test_trig(self):
        input_string = 'sin(a)**2+sin(a)**2'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('sin(x)**2+sin(x)**2:1')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, '1')

    def test_1(self):
        input_string = '(a+1)**2'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('(a+b)**2:a**2+2*a*b+b**2')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, Tree(expression='a**2+2*a*1+1**2').to_expression())

    def test_Lt_apply(self):
        input_string = '1+x'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('1+x<e**x')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, Tree(expression='e**x').to_expression())

    def test_LtE_apply(self):
        input_string = 'sin(t)'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('sin(x)<=1')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, Tree(expression='1').to_expression())

    def test_Gt_apply(self):
        input_string = 'e**z'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('e**x>1+x')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, Tree(expression='1+z').to_expression())

    def test_GtE_apply(self):
        input_string = 'x**2'
        tree = Tree(expression=input_string)

        rule = Rules.get_rule_from_string('x**2>=0')
        Rules.apply_rule(tree.root, rule)

        output_string = tree.to_expression()
        self.assertEquals(output_string, Tree(expression='0').to_expression())

if __name__ == '__main__':
    unittest.main()
