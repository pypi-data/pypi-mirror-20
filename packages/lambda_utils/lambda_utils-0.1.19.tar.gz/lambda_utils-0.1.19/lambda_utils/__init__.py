# -*- coding: utf-8 -*-

__author__ = """CloudHeads"""
__email__ = 'theguys@cloudheads.io'
__version__ = '0.1.19'


class Event(object):
    function = None
    wrapped_function = None

    def __call__(self, function):
        self.function = function
        return self.wrapped_function
