from __future__ import unicode_literals

import collections

from ._unicode import unicode_airlock
from .variables import Variables, merge_variables


class Function(object):
    def __init__(self, **kwargs):
        self._variables = Variables(kwargs)
        self._data = dict()

    def feed(self, purpose='learn'):
        purpose = unicode_airlock(purpose)
        return FunctionDataFeed(self, self._data[purpose])

    def get(self, name):
        return self._variables.get(name).value

    def set(self, name, value):
        self._variables.get(name).value = value

    def gradient(self, *args, **kwargs):
        names = sorted(self._variables.select(fixed=False).names())
        grad = []
        for name in names:
            g = getattr(self, 'derivative_' + name)(*args, **kwargs)
            grad.append(g)
        return grad

    def get_derivative_list(self):
        names = sorted(self._variables.select(fixed=False).names())
        derivative_list = []
        for name in names:
            derivative_list.append('derivative_' + name)
        return derivative_list

    def fix(self, var_name):
        self._variables[var_name].fix()

    def unfix(self, var_name):
        self._variables[var_name].unfix()

    def isfixed(self, var_name):
        return self._variables[var_name].isfixed()

    def variables(self):
        return self._variables

    def set_nodata(self, purpose='learn'):
        purpose = unicode_airlock(purpose)
        self._data[purpose] = tuple()

    def set_data(self, data, purpose='learn'):
        purpose = unicode_airlock(purpose)
        if not isinstance(data, collections.Sequence):
            data = (data, )
        self._data[purpose] = data

    def unset_data(self, purpose='learn'):
        purpose = unicode_airlock(purpose)
        del self._data[purpose]


class FunctionReduce(object):
    def __init__(self, functions, prefix='noname'):
        self.functions = functions
        self.__prefix = prefix

    def operand(self, i):
        return self.functions[i]

    def feed(self, purpose='learn'):
        purpose = unicode_airlock(purpose)
        fs = [f.feed(purpose) for f in self.functions]
        return FunctionReduceDataFeed(self, fs)

    def gradient(self, *args, **kwargs):
        grad = []
        for l in self.functions:
            grad += l.gradient(*args, **kwargs)
        return grad

    def variables(self):
        vars_list = [l.variables() for l in self.functions]
        vd = dict()
        for (i, vs) in enumerate(vars_list):
            vd['%s[%d]' % (self.__prefix, i)] = vs
        return merge_variables(vd)


class FunctionDataFeed(object):
    def __init__(self, target, data):
        self._target = target
        self.raw = data

    def value(self):
        return self._target.value(*self.raw)

    def gradient(self):
        return self._target.gradient(*self.raw)

    def variables(self):
        return self._target.variables()

    def maximize(self, progress=True):
        from .optimize import maximize as _maximize
        return _maximize(self, progress=progress)

    def minimize(self, progress=True):
        from .optimize import minimize as _minimize
        return _minimize(self, progress=progress)


class FunctionReduceDataFeed(object):
    def __init__(self, target, functions):
        self._target = target
        self.functions = functions

    def value(self):
        return self._target.value_reduce([f.value() for f in self.functions])

    def gradient(self):
        grad = []
        for f in self.functions:
            grad += f.gradient()
        return grad

    def variables(self):
        return self._target.variables()

    def maximize(self, progress=True):
        from .optimize import maximize as _maximize
        return _maximize(self, progress=progress)

    def minimize(self, progress=True):
        from .optimize import minimize as _minimize
        return _minimize(self, progress=progress)


class Composite(object):
    def __init__(self, **kwargs):
        super(Composite, self).__init__()
        self.functions = kwargs
        self._data = dict()
        if 'prefix' in kwargs:
            self.__prefix = kwargs['prefix']
        else:
            self.__prefix = 'noname'

    def feed(self, purpose='learn'):
        purpose = unicode_airlock(purpose)
        return CompositeDataFeed(self, purpose)

    def gradient(self, *args, **kwargs):
        fnames = sorted(self.functions.keys())
        grad = []
        for fname in fnames:
            fg = getattr(self, 'gradient_' + fname)(*args, **kwargs)
            grad += fg
        return grad

    def set_nodata(self, purpose='learn'):
        purpose = unicode_airlock(purpose)
        self._data[purpose] = tuple()

    def set_data(self, data, purpose='learn'):
        purpose = unicode_airlock(purpose)
        if not isinstance(data, collections.Sequence):
            data = (data, )
        self._data[purpose] = data

    def unset_data(self, purpose='learn'):
        purpose = unicode_airlock(purpose)
        del self._data[purpose]

    def variables(self):
        fnames = sorted(self.functions.keys())
        vars_list = [self.functions[fn].variables() for fn in fnames]
        vd = dict()
        for (i, vs) in enumerate(vars_list):
            vd['%s[%d]' % (self.__prefix, i)] = vs
        return merge_variables(vd)


class CompositeDataFeed(object):
    def __init__(self, target, purpose):
        purpose = unicode_airlock(purpose)
        self._target = target
        self._purpose = purpose

    def value(self):
        fnames = sorted(self._target.functions.keys())

        fvals = dict()
        for fname in fnames:
            f = self._target.functions[fname].feed(self._purpose)
            fvals[fname] = f.value()

        return self._target.value(**fvals)

    def gradient(self):
        fnames = sorted(self._target.functions.keys())

        g_fvals = dict()
        for fname in fnames:
            f = self._target.functions[fname].feed(self._purpose)
            g_fvals[fname] = f.value()
            g_fvals['g' + fname] = f.gradient()

        return self._target.gradient(**g_fvals)

    def variables(self):
        return self._target.variables()

    def maximize(self, progress=True):
        from .optimize import maximize as _maximize
        return _maximize(self, progress=progress)

    def minimize(self, progress=True):
        from .optimize import minimize as _minimize
        return _minimize(self, progress=progress)
