"""
this module contains the neccesary datastructures that are used by the utility functions in the cruds module

Contents
--------
Expression
     This class is used to construct a function with the specified expression
"""
#types used to give type hintings wherever possible 
import typing
#the sqlalchemy DeclarativeMeta class is imported to check if methods that require model arguments are actually modelsS
from sqlalchemy.ext.declarative.api import DeclarativeMeta as base
from src.utils.datastructures import Queue, Stack
class Expression:
    """
    This class is used to construct an expression node in the expression parse tree

    Methods
    -------
    __init__
        constructor, takes the model class the atrribute, the operator and a value to construct an expression function
    get_expression
        returns the constructed expression         
    """
    def __init__(self, model,
    module_attribute: str, operator: str, value):
        """
        Constructor for the Expression class.

        The constructor takes a model, the desired_attribute, the comparitor operator and the value to compare to.
        An lambda function is built where the contents of this function is the expression built with the arguments described.

        Parameters
        ----------
        model
            sqlalchemy.ext.declarative.api.DeclativeMeta
            class which inherits the base class from the sqlalchemy declaritive system 
        module_attribute
            str
            the desired attribute of the passed model which will be used to build the left side of the expression
        operator
            str 
            the boolean operator of the expression 
        value
            str OR int OR float OR bool
            the value which will be used to construct the right side of the expression 
        """
        #ensure arguments have valid types
        if not isinstance(model, base):
            raise TypeError('model must be of type sqlalchemy.ext.declarative.api.DeclativeMeta')
        elif not isinstance(module_attribute, str):
            raise TypeError('module_attribute must be of type str')
        elif not isinstance(operator, str):
            raise TypeError('operator must be of type str')
        elif not isinstance(value, (str,int,float,bool)):
            raise TypeError('value must be of type str OR int OR float OR bool')
        #call __getattribute__ to ensure that the object attribute exists 
        model.__getattribute__(module_attribute)
        #construct a dictionary with the possible lambda functions for each of the operators 
        valid_operators = {
            '==': lambda: model.__getattribute__(module_attribute) == value,
            '>=': lambda: model.__getattribute__(module_attribute) >= value,
            '<=': lambda: model.__getattribute__(module_attribute) <= value,
            '>': lambda: model.__getattribute__(module_attribute) > value,
            '<': lambda: model.__getattribute__(module_attribute) < value
        }
        #get the appriopriate lambda function 
        self.expression = valid_operators.get(operator)
        #if self.expression is none this means that the operator is invalid
        if self.expression is None:
            raise ValueError('operator is not valid')
    def get_expression(self):
        """
        get constructed expression

        Returns
        -------
        function
               the function with the expression
        """
        return self.expression
class Operator:
    """
    This class is used to construct an Operator node in the expression parse tree
    """
    VALID_OPERATORS = set(['and', 'or'])
    def __init__(self, operator = None):
        """
        Constructor for Operator class.
        """
        #check if arguments are of correct type
        if operator is not None:
            self.set_operator(operator)
        else:
            self.operator = None
        self.children = Queue()
    def dequeue_child(self):
        return self.children.dequeue()
    def enqueue_child(self, child):
        self.children.enqueue(child)
    def get_operator(self):
        """
        returns the boolean operator of this operator node
        Returns
        -------
        str
            the boolean operator of this operator node
        """
        return self.operator
    def set_operator(self, operator):
        if not isinstance(operator, str):
            raise TypeError('operator must be of type str')
        elif not operator in self.VALID_OPERATORS:
            raise ValueError('operator is not valid')
        self.operator = operator
class ParseTree:
    """

    """
    def __init__(self, model, filters: typing.List[typing.Dict]):
        #check if filters is a list
        if not isinstance(filters, list):
            raise TypeError('filters must be of type list with dict children')
        #loop over dictionary items
        filt_queue = Queue(filters)
        traverse_stack = Stack()
        self.root = Operator()
        traverse_stack.push(self.root)
        while not filt_queue.isEmpty():
            elem = filt_queue.dequeue()
            elem_next = filt_queue.peek()
            elem_column = list(elem.keys())[0]
            elem_value = elem[elem_column]['data']
            elem_operator = elem[elem_column]['comparitor']
            elem_expression = Expression(model, elem_column, elem_operator, elem_value)
            if elem_next is None:
                parent = traverse_stack.pop()
                parent.enqueue_child(elem_expression)
            else:
                elem_join = elem['join']
                current_parent = traverse_stack.pop()
                current_operator = current_parent.get_operator()
                if elem_join == 'or':
                    if current_operator == 'or':
                        current_parent.enqueue_child(elem_expression)
                        traverse_stack.push(current_parent)
                    elif current_operator == 'and':
                        parent_parent = traverse_stack.pop()
                        if parent_parent is None:
                            self.root = Operator('or')
                            self.root.enqueue_child(current_parent)
                            self.root.enqueue_child(elem_expression)
                            traverse_stack.push(self.root)
                        else:
                            parent_parent.enqueue_child(elem_expression)
                            traverse_stack.push(parent_parent)
                    else:
                        current_parent.set_operator('or')
                        current_parent.enqueue_child(elem_expression)
                        traverse_stack.push(current_parent)
                elif elem_join == 'and':
                    if current_operator == 'or':
                        child = Operator('and')
                        child.enqueue_child(elem_expression)
                        traverse_stack.push(child)
                    elif current_operator == 'and':
                        current_parent.enqueue_child(elem_expression)
                        traverse_stack.push(current_parent)
                    else:
                        current_parent.set_operator('and')
                        current_parent.enqueue_child(elem_expression)
                        traverse_stack.push(current_parent)


            

        






