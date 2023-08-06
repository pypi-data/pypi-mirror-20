from numpy import asarray, concatenate
from scipy.optimize import fmin_l_bfgs_b

from ..exception import OptimixError


def do_flatten(x):
    if isinstance(x, (list, tuple)):
        return concatenate([asarray(xi).ravel() for xi in x])
    return concatenate(x)


class ProxyFunction(object):
    def __init__(self, function, progress, negative):
        self._function = function
        self._signal = -1 if negative else +1

    def value(self):
        return self._signal * self._function.value()

    def gradient(self):
        return [self._signal * gi for gi in self._function.gradient()]

    def __call__(self, x):
        x = asarray(x).ravel()
        self._function.variables().select(fixed=False).from_flat(x)
        v = self.value()
        g = do_flatten(self.gradient())
        return v, g

    def set_solution(self, x):
        t = self._function.variables().select(fixed=False)
        t.from_flat(asarray(x).ravel())

    def get_solution(self):
        return self._function.variables().select(fixed=False).flatten()


def _minimize(proxy_function):
    x0 = proxy_function.get_solution()
    r = fmin_l_bfgs_b(proxy_function, x0, disp=0)
    if r[2]['warnflag'] == 1:
        raise OptimixError("BFGS: too many function evaluations" +
                           " or too many iterations")
    elif r[2]['warnflag'] == 2:
        raise OptimixError("BFGS: %s" % r[2]['task'])

    proxy_function.set_solution(r[0])


def minimize(function, progress=None):
    return _minimize(ProxyFunction(function, progress, False))


def maximize(function, progress=None):
    return _minimize(ProxyFunction(function, progress, True))
