import numpy.linalg as la
import scipy as sp
import pandas as pd
from .base import Transition
from scipy.spatial import cKDTree
from .util import smart_cov
from .exceptions import NotEnoughParticles
import logging

logger = logging.getLogger("LocalTransition")


class LocalTransition(Transition):
    """
    Local KDE fit. Takes into account only the k
    nearest neighbors.

    Parameters
    ----------

    k: int
        Number of nearest neighbors for local covariance
        calculation.

    scaling: float
        Scaling factor for the local covariance matrices.

    k_fraction: float, optional
        Calculate number of nearest neighbors to use according to
        k = ``k_fraction`` * `population_size``

    Attributes
    ----------

    EPS: float
        Scaling of the identity matrix to be added to the covariance
        in case the covariances are not invertible.
    """
    EPS = 1e-3
    MIN_K = 10

    def __init__(self, k=None, k_fraction=1/4, scaling=2):
        if k_fraction is not None:
            self.k_fraction = k_fraction
            self._k = None
        else:
            self.k_fraction = None
            self._k = k

        self.scaling = scaling

    @property
    def k(self):
        if self.k_fraction is not None:
            if self.w is None:
                k_ = 0
            else:
                k_ = int(self.k_fraction * len(self.w))
        else:
            k_ = self._k

        try:
            dim = self.X_arr.shape[1]
        except AttributeError:
            dim = 0

        return max([k_, self.MIN_K, dim])

    def fit(self, X, w):
        if len(X) == 0:
            raise NotEnoughParticles("Fitting not possible.")
        self.X_arr = X.as_matrix()

        ctree = cKDTree(X)
        _, indices = ctree.query(X, k=min(self.k + 1, X.shape[0]))

        covs, inv_covs = list(zip(*[self._cov_and_inv(n, indices)
                                    for n in range(X.shape[0])]))
        self.covs = sp.array(covs)
        self.inv_covs = sp.array(inv_covs)
        self.determinants = sp.array(list(map(la.det, self.covs)))
        self.normalization = sp.sqrt(
            (2 * sp.pi) ** self.X_arr.shape[1] * self.determinants)

    def pdf(self, x):
        x = x[self.X.columns].as_matrix()
        if len(x.shape) == 1:
            return self._pdf_single(x)
        else:
            return sp.array([self._pdf_single(x) for x in x])

    def _pdf_single(self, x):
        distance = self.X_arr - x
        cov_distance = sp.einsum("ij,ijk,ik->i",
                                 distance, self.inv_covs, distance)
        return sp.average(sp.exp(-.5 * cov_distance) / self.normalization,
                          weights=self.w)

    def _cov_and_inv(self, n, indices):
        """
        Calculate covariance around local support vector
        and also the inverse
        """
        try:
            cov = self._cov(indices, n)
            inv_cov = la.inv(cov)
        except la.LinAlgError:
            cov += sp.identity(cov.shape[0]) * self.EPS
            inv_cov = la.inv(cov)
        return cov, inv_cov

    def _cov(self, indices, n, eps=0):
        if len(indices) > 1:
            surrounding_indices = indices[n, 1:]
            nearest_vector_deltas = (self.X_arr[surrounding_indices]
                                     - self.X_arr[n])
            local_weights = self.w[surrounding_indices]
        else:
            nearest_vector_deltas = sp.absolute(self.X_arr)
            local_weights = sp.array([1])
        cov = smart_cov(nearest_vector_deltas,
                        local_weights / local_weights.sum())
        if sp.absolute(cov.sum()) == 0:
            for k in range(cov.shape[0]):
                cov[k, k] = sp.absolute(self.X_arr[0, k])
        return cov * self.scaling

    def rvs(self):
        support_index = sp.random.choice(self.w.shape[0], p=self.w)
        sample = sp.random.multivariate_normal(self.X_arr[support_index],
                                               self.covs[support_index])
        return pd.Series(sample, index=self.X.columns)
