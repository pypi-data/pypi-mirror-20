from __future__ import absolute_import as _absolute_import

from numpy import clip, dot, inf, sqrt
from numpy.linalg import eigh
from numpy.random import RandomState

from .. import _epsilon as epsilon


def multivariate_normal(m, K, random_state=None):
    if random_state is None:
        random_state = RandomState()
    if len(m) <= 1000:
        return random_state.multivariate_normal(m, K)
    S, Q = eigh(K)
    S = clip(S, epsilon.small, inf)
    Ssq = sqrt(S)
    u = random_state.randn(len(m))
    return m + dot(Q, Ssq * u)
