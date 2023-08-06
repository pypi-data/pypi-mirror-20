# -*- coding: utf-8 -*-

from __future__ import division, print_function
import math
import logging
import numpy as np

from . import solver
from .modeling import ModelSet, ConstantModel

__all__ = ["GP", "get_solver"]


def get_solver(method=None):
    if method is None or method == "default":
        if solver.with_lapack():
            return solver.Solver(True)
        if solver.with_sparse():
            return solver.SparseSolver()
    elif method == "lapack" and solver.with_lapack():
        return solver.Solver(True)
    elif method == "sparse" and solver.with_sparse():
        return solver.SparseSolver()
    return solver.Solver(False)


class GP(ModelSet):
    """The main interface to the celerite Gaussian Process solver

    Args:
        kernel: An instance of a subclass of :class:`terms.Term`.
        mean (Optional): A simple mean value for the process. This can either
            be a ``float`` or a subclass of :class:`modeling.Model`.
            (default: ``0.0``)
        fit_mean (optional): If ``False``, all of the parameters of ``mean``
            will be frozen. Otherwise, the parameter states are unaffected.
            (default: ``False``)
        log_white_noise (Optional): A white noise model for the process. The
            ``exp`` of this will be added to the diagonal of the matrix in
            :func:`GP.compute`. In other words this model should be for the
            log of the _variance_ of the white noise. This can either be a
            ``float`` or a subclass of :class:`modeling.Model`.
            (default: ``-inf``)
        fit_white_noise (Optional): If ``False``, all of the parameters of
            ``log_white_noise`` will be frozen. Otherwise, the parameter
            states are unaffected. (default: ``False``)
        method: Select a matrix solver method by name. This can be one of
            (a) ``simple``: a simple banded Gaussian elimination based method,
            (b) ``lapack``: an optimized band solver if compiled with LAPACK,
            (c) ``sparse``: a sparse solver if compiled with Eigen/Sparse, or
            (d) ``default``: uses heuristics to select the fastest method that
            is available.

    """

    def __init__(self,
                 kernel,
                 mean=0.0, fit_mean=False,
                 log_white_noise=-float("inf"), fit_white_noise=False,
                 method=None):
        self.solver = None
        self._computed = False
        self._t = None
        self._y_var = None

        # Choose which solver to use
        use_sparse = False
        use_lapack = False
        if method is None or method == "default":
            coeffs = kernel.coefficients
            nterms = len(coeffs[0]) + 2 * len(coeffs[2])
            if solver.with_lapack():
                use_lapack = (nterms >= 8)
            elif solver.with_sparse():
                use_sparse = (nterms >= 8)
        elif method == "simple":
            pass
        elif method == "lapack":
            use_lapack = solver.with_lapack()
            if not use_lapack:
                logging.warn("celerite was not compiled with LAPACK support")
        elif method == "sparse":
            use_sparse = solver.with_sparse()
            if not use_sparse:
                logging.warn("celerite was not compiled with Sparse support")
        else:
            logging.warn("'method' must be one of ['default', 'simple', "
                         "'lapack', 'sparse']; falling back on 'simple'")
        self._use_sparse = bool(use_sparse)
        self._use_lapack = bool(use_lapack)

        # Build up a list of models for the ModelSet
        models = [("kernel", kernel)]

        # Interpret the white noise model
        try:
            float(log_white_noise)
        except TypeError:
            pass
        else:
            log_white_noise = ConstantModel(float(log_white_noise))

        # If this model is supposed to be constant, go through and freeze
        # all of the parameters
        if not fit_white_noise:
            for k in log_white_noise.get_parameter_names():
                log_white_noise.freeze_parameter(k)
        models += [("log_white_noise", log_white_noise)]

        # And the mean model
        try:
            float(mean)
        except TypeError:
            pass
        else:
            mean = ConstantModel(float(mean))

        if not fit_mean:
            for k in mean.get_parameter_names():
                mean.freeze_parameter(k)
        models += [("mean", mean)]

        # Init the superclass
        super(GP, self).__init__(models)

    @property
    def mean(self):
        """The mean :class:`modeling.Model`"""
        return self.models["mean"]

    @property
    def log_white_noise(self):
        """The white noise :class:`modeling.Model`"""
        return self.models["log_white_noise"]

    @property
    def kernel(self):
        return self.models["kernel"]

    @property
    def dirty(self):
        return super(GP, self).dirty or not self._computed

    @dirty.setter
    def dirty(self, value):
        self._computed = not value
        super(GP, self.__class__).dirty.fset(self, value)

    @property
    def computed(self):
        return (
            self.solver is not None and
            self.solver.computed() and
            not self.dirty
        )

    def compute(self, t, yerr=1.123e-12, check_sorted=True):
        """
        Compute the extended form of the covariance matrix and factorize

        Args:
            x (array[n]): The independent coordinates of the data points.
                This array must be _sorted_ in ascending order.
            yerr (Optional[float or array[n]]): The measurement uncertainties
                for the data points at coordinates ``x``. These values will be
                added in quadrature to the diagonal of the covariance matrix.
                (default: ``1.123e-12``)
            check_sorted (bool): If ``True``, ``x`` will be checked to make
                sure that it is properly sorted. If ``False``, the coordinates
                will be assumed to be in the correct order.

        Raises:
            ValueError: For un-sorted data or mismatched dimensions.

        """
        t = np.atleast_1d(t)
        if check_sorted and np.any(np.diff(t) < 0.0):
            raise ValueError("the input coordinates must be sorted")
        if check_sorted and len(t.shape) > 1:
            raise ValueError("dimension mismatch")
        self._t = t
        self._yerr = np.empty_like(self._t)
        self._yerr[:] = yerr
        if self.solver is None:
            if self._use_sparse:
                self.solver = solver.SparseSolver()
            else:
                self.solver = solver.Solver(self._use_lapack)
        (alpha_real, beta_real, alpha_complex_real, alpha_complex_imag,
         beta_complex_real, beta_complex_imag) = self.kernel.coefficients
        self.solver.compute(
            alpha_real, beta_real,
            alpha_complex_real, alpha_complex_imag,
            beta_complex_real, beta_complex_imag,
            t, self._get_diag()
        )
        self.dirty = False

    def _recompute(self):
        if not self.computed:
            if self._t is None:
                raise RuntimeError("you must call 'compute' first")
            self.compute(self._t, self._yerr, check_sorted=False)

    def _process_input(self, y):
        if self._t is None:
            raise RuntimeError("you must call 'compute' first")
        if len(self._t) != len(y):
            raise ValueError("dimension mismatch")
        return np.ascontiguousarray(y, dtype=float)

    def log_likelihood(self, y, _const=math.log(2.0*math.pi)):
        """
        Compute the marginalized likelihood of the GP model

        The factorized matrix from the previous call to :func:`GP.compute` is
        used so ``compute`` must be called first.

        Args:
            y (array[n]): The observations at coordinates ``x`` from
                :func:`GP.compute`.

        Returns:
            float: The marginalized likelihood of the GP model.

        Raises:
            ValueError: For mismatched dimensions.

        """
        y = self._process_input(y)
        resid = y - self.mean.get_value(self._t)
        self._recompute()
        if len(y.shape) > 1:
            raise ValueError("dimension mismatch")
        return -0.5 * (self.solver.dot_solve(resid) +
                       self.solver.log_determinant() +
                       len(y) * _const)

    def apply_inverse(self, y):
        """
        Apply the inverse of the covariance matrix to a vector or matrix

        Solve ``K.x = y`` for ``x`` where ``K`` is the covariance matrix of
        the GP with the white noise and ``yerr`` components included on the
        diagonal.

        Args:
            y (array[n] or array[n, nrhs]): The vector or matrix ``y``
            described above.

        Returns:
            array[n] or array[n, nrhs]: The solution to the linear system.
            This will have the same shape as ``y``.

        Raises:
            ValueError: For mismatched dimensions.

        """
        self._recompute()
        return self.solver.solve(self._process_input(y))

    def dot(self, y, kernel=None):
        """
        Dot the covariance matrix into a vector or matrix

        Compute ``K.y`` where ``K`` is the covariance matrix of the GP without
        the white noise or ``yerr`` values on the diagonal.

        Args:
            y (array[n] or array[n, nrhs]): The vector or matrix ``y``
                described above.
            kernel (Optional[terms.Term]): A different kernel can optionally
                be provided to compute the matrix ``K`` from a different
                kernel than the ``kernel`` property on this object.

        Returns:
            array[n] or array[n, nrhs]: The dot product ``K.y`` as described
            above. This will have the same shape as ``y``.

        Raises:
            ValueError: For mismatched dimensions.

        """
        if kernel is None:
            kernel = self.kernel
        (alpha_real, beta_real, alpha_complex_real, alpha_complex_imag,
         beta_complex_real, beta_complex_imag) = kernel.coefficients
        return self.solver.dot(
            alpha_real, beta_real,
            alpha_complex_real, alpha_complex_imag,
            beta_complex_real, beta_complex_imag,
            self._t, self._process_input(y)
        )

    def predict(self, y, t=None, return_cov=True, return_var=False):
        """
        Compute the conditional predictive distribution of the model

        You must call :func:`GP.compute` before this method.

        Args:
            y (array[n]): The observations at coordinates ``x`` from
                :func:`GP.compute`.
        t (Optional[array[ntest]]): The independent coordinates where the
            prediction should be made. If this is omitted the coordinates will
            be assumed to be ``x`` from :func:`GP.compute` and an efficient
            method will be used to compute the prediction.
        return_cov (Optional[bool]): If ``True``, the full covariance matrix
            is computed and returned. Otherwise, only the mean prediction is
            computed. (default: ``True``)
        return_var (Optional[bool]): If ``True``, only return the diagonal of
            the predictive covariance; this will be faster to compute than the
            full covariance matrix. This overrides ``return_cov`` so, if both
            are set to ``True``, only the diagonal is computed.
            (default: ``False``)

        Returns:
            ``mu``, ``(mu, cov)``, or ``(mu, var)`` depending on the values of
            ``return_cov`` and ``return_var``. These output values are:
            (a) **mu** ``(ntest,)``: mean of the predictive distribution,
            (b) **cov** ``(ntest, ntest)``: the predictive covariance matrix,
            and
            (c) **var** ``(ntest,)``: the diagonal elements of ``cov``.

        Raises:
            ValueError: For mismatched dimensions.

        """
        y = self._process_input(y)
        if len(y.shape) > 1:
            raise ValueError("dimension mismatch")

        if t is None:
            xs = self._t
        else:
            xs = np.ascontiguousarray(t, dtype=float)
            if len(xs.shape) > 1:
                raise ValueError("dimension mismatch")

        # Make sure that the model is computed
        self._recompute()

        # Compute the predictive mean.
        resid = y - self.mean.get_value(self._t)
        alpha = self.solver.solve(resid).flatten()

        if t is None:
            alpha = resid - self._get_diag() * alpha
        else:
            Kxs = self.get_matrix(xs, self._t)
            alpha = np.dot(Kxs, alpha)

        mu = self.mean.get_value(xs) + alpha
        if not (return_var or return_cov):
            return mu

        # Predictive variance.
        if t is None:
            Kxs = self.get_matrix(xs, self._t)
        KxsT = np.ascontiguousarray(Kxs.T, dtype=np.float64)
        if return_var:
            var = -np.sum(KxsT*self.apply_inverse(KxsT), axis=0)
            var += self.kernel.get_value(0.0)
            return mu, var

        # Predictive covariance
        cov = self.kernel.get_value(xs[:, None] - xs[None, :])
        cov -= np.dot(Kxs, self.apply_inverse(KxsT))
        return mu, cov

    def _get_diag(self):
        return self._yerr**2 + np.exp(self.log_white_noise
                                      .get_value(self._t))

    def get_matrix(self, x1=None, x2=None, include_diagonal=None):
        """
        Get the covariance matrix at given independent coordinates

        Args:
            x1 (Optional[array[n1]]): The first set of independent coordinates.
                If this is omitted, ``x1`` will be assumed to be equal to ``x``
                from a previous call to :func:`GP.compute`.
            x2 (Optional[array[n2]]): The second set of independent
                coordinates. If this is omitted, ``x2`` will be assumed to be
                ``x1``.
            include_diagonal (Optional[bool]): Should the white noise and
                ``yerr`` terms be included on the diagonal?
                (default: ``False``)

        """
        if x1 is None and x2 is None:
            if self._t is None or not self.computed:
                raise RuntimeError("you must call 'compute' first")
            K = self.kernel.get_value(self._t[:, None] - self._t[None, :])
            if include_diagonal is None or include_diagonal:
                K[np.diag_indices_from(K)] += self._get_diag()
            return K

        incl = False
        x1 = np.ascontiguousarray(x1, dtype=float)
        if x2 is None:
            x2 = x1
            incl = include_diagonal is not None and include_diagonal
        K = self.kernel.get_value(x1[:, None] - x2[None, :])
        if incl:
            K[np.diag_indices_from(K)] += np.exp(self.log_white_noise
                                                 .get_value(x1))
        return K

    def sample(self, x=None, diag=None, include_diagonal=False, size=None):
        """
        Sample from the prior distribution over datasets

        Args:
            x (Optional[array[n]]): The independent coordinates where the
                observations should be made. If ``None``, the coordinates used
                in the last call to ``compute`` will be used.
            diag (Optional[array[n] or float]): If provided, this will be
                added to the diagonal of the covariance matrix.
            include_diagonal (Optional[bool]): Should the white noise and/or
                ``yerr`` terms be included on the diagonal?
                (default: ``False``)
            size (Optional[int]): The number of samples to draw.

        Returns:
            array[n] or array[size, n]: The samples from the prior
            distribution over datasets.

        """
        K = self.get_matrix(x, include_diagonal=include_diagonal)
        if diag is not None:
            K[np.diag_indices_from(K)] += diag
        sample = np.random.multivariate_normal(np.zeros_like(x), K, size=size)
        return self.mean.get_value(x) + sample

    def sample_uniform(self, x_min, x_max, nx, size=None):
        x = np.linspace(x_min, x_max, nx)
        dx = x - x[0]

        k = self.kernel.get_value(dx)
        s = np.append(k, k[1:-1][::-1])
        M = len(s)
        Fs = np.sqrt(M*np.fft.fft(s))
        if size is None:
            nr = 1
        else:
            nr = int(np.ceil(0.5 * size))
        e = (np.random.randn(nr, M) + 1.j * np.random.randn(nr, M)) * Fs
        y = np.fft.ifft(e)[:, :nx]
        if size is None:
            return y[0].real
        y = np.concatenate((y.real, y.imag), axis=0)
        return y[:size]
