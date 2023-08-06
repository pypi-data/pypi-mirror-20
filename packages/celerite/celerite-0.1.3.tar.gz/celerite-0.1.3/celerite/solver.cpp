#include <pybind11/pybind11.h>
#include <pybind11/eigen.h>

#include <Eigen/Core>

#include "celerite/celerite.h"
#include "celerite/carma.h"

namespace py = pybind11;

//
// By sub-classing BandSolver here, we can make it picklable but not make C++11 a requirement for the C++ library.
//
// The pybind11 pickle docs are here: http://pybind11.readthedocs.io/en/master/advanced/classes.html#pickling-support
// but the gist is that class just needs to expose __getstate__ and __setstate__. These will just directly call
// serialize and deserialize below.
//
class PicklableBandSolver : public celerite::solver::BandSolver<double> {
public:
  PicklableBandSolver (bool use_lapack = false) : celerite::solver::BandSolver<double>(use_lapack) {};

  bool use_lapack() const { return use_lapack_; };

  auto serialize () const {
    return std::make_tuple(this->use_lapack_, this->computed_, this->n_, this->p_real_, this->p_complex_, this->log_det_,
                           this->a_, this->al_, this->ipiv_);
  };

  void deserialize (bool use_lapack, bool computed, int n, int p_real, int p_complex,
                    double log_det, Eigen::MatrixXd a, Eigen::MatrixXd al, Eigen::VectorXi ipiv) {
    this->use_lapack_ = use_lapack;
    this->computed_ = computed;
    this->n_ = n;
    this->p_real_ = p_real;
    this->p_complex_ = p_complex;
    this->log_det_ = log_det;
    this->a_ = a;
    this->al_ = al;
    this->ipiv_ = ipiv;
  };
};

class PicklableSingleSolver : public celerite::solver::SingleSolver<double> {
public:
  auto serialize () const {
    return std::make_tuple(this->computed_, this->n_, this->log_det_, this->dl_, this->d_,
                           this->dl_noise_, this->d_noise_, this->du_noise_);
  };

  void deserialize (bool computed, int n, double log_det, Eigen::MatrixXd dl, Eigen::MatrixXd d,
                    Eigen::MatrixXd dl_noise, Eigen::MatrixXd d_noise, Eigen::MatrixXd du_noise) {
    this->computed_ = computed;
    this->n_ = n;
    this->log_det_ = log_det;
    this->dl_ = dl;
    this->d_ = d;
    this->dl_noise_ = dl_noise;
    this->d_noise_ = d_noise;
    this->du_noise_ = du_noise;
  };
};

//
// Below is the boilerplate code for the pybind11 extension module.
//
PYBIND11_PLUGIN(solver) {
  py::module m("solver", R"delim(
This is the low-level interface to the C++ implementation of the celerite
algorithm. These methods do most of the heavy lifting but most users shouldn't
need to call these directly. This interface was built using `pybind11
<http://pybind11.readthedocs.io/>`_.

)delim");

  m.def("get_library_version", []() { return CELERITE_VERSION_STRING; }, "The version of the linked C++ library");

  m.def("with_lapack", []() {
#ifdef WITH_LAPACK
    return true;
#else
    return false;
#endif
  }, "Was celerite compiled with LAPACK support");
  m.def("lapack_variant", []() {
#ifdef LAPACK_VARIANT
    return CELERITE_TO_STRING(LAPACK_VARIANT);
#else
    return "";
#endif
  }, "The variant of LAPACK used to compile celerite");

  m.def("with_sparse", []() {
#ifdef WITH_SPARSE
    return true;
#else
    return false;
#endif
  }, "Was celerite compiled with sparse support");

  m.def("get_kernel_value",
    [](
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      py::array_t<double> tau
    ) {
      auto get_kernel_value_closure = [alpha_real, beta_real, alpha_complex_real, alpha_complex_imag, beta_complex_real, beta_complex_imag] (double t) {
        return celerite::get_kernel_value(
          alpha_real, beta_real, alpha_complex_real, alpha_complex_imag, beta_complex_real, beta_complex_imag, t
        );
      };
      return py::vectorize(get_kernel_value_closure)(tau);
    },
    R"delim(
Get the value of the kernel for given parameters and lags

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    tau (array[n]): The time lags where the kernel should be evaluated.

Returns:
    array[n]: The kernel evaluated at ``tau``.

)delim");

  m.def("get_psd_value",
    [](
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      py::array_t<double> omega
    ) {
      auto get_psd_value_closure = [alpha_real, beta_real, alpha_complex_real, alpha_complex_imag, beta_complex_real, beta_complex_imag] (double t) {
        return celerite::get_psd_value(
          alpha_real, beta_real, alpha_complex_real, alpha_complex_imag, beta_complex_real, beta_complex_imag, t
        );
      };
      return py::vectorize(get_psd_value_closure)(omega);
    },
    R"delim(
Get the PSD of the kernel for given parameters and angular frequencies

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    omega (array[n]): The frequencies where the PSD should be evaluated.

Returns:
    array[n]: The PSD evaluated at ``omega``.

)delim");

  m.def("check_coefficients",
    [](
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag
    ) {
      return celerite::check_coefficients(
        alpha_real, beta_real,
        alpha_complex_real, alpha_complex_imag,
        beta_complex_real, beta_complex_imag
      );
    },
    R"delim(
Apply Sturm's theorem to check if parameters yield a positive PSD

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.

Returns:
    bool: ``True`` if the PSD is everywhere positive.

)delim");

  //
  // ------ BAND ------
  //
  py::class_<PicklableBandSolver> solver(m, "Solver", R"delim(
A thin wrapper around the C++ BandSolver class

The class provides all of the computation power for the ``celerite``
module. The key methods are listed below but the :func:`solver.Solver.compute`
method must always be called first.

)delim");
  solver.def(py::init<>());
  solver.def(py::init<bool>());

  solver.def("compute", [](PicklableBandSolver& solver,
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      const Eigen::VectorXd& x,
      const Eigen::VectorXd& diag) {
    return solver.compute(
      alpha_real,
      beta_real,
      alpha_complex_real,
      alpha_complex_imag,
      beta_complex_real,
      beta_complex_imag,
      x,
      diag
    );
  },
  R"delim(
Assemble the extended matrix and perform the banded LU decomposition

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    x (array[n]): The _sorted_ array of input coordinates.
    diag (array[n]): An array that should be added to the diagonal of the
        matrix. This often corresponds to measurement uncertainties and in
        that case, ``diag`` should be the measurement _variance_
        (i.e. sigma^2).

Returns:
    int: ``1`` if the dimensions are inconsistent and ``0`` otherwise. No
    attempt is made to confirm that the matrix is positive definite. If
    it is not positive definite, the ``solve`` and ``log_determinant``
    methods will return incorrect results.

)delim");

  solver.def("solve", [](PicklableBandSolver& solver, const Eigen::MatrixXd& b) {
    return solver.solve(b);
  },
  R"delim(
Solve a linear system for the matrix defined in ``compute``

A previous call to :func:`solver.Solver.compute` defines a matrix ``A``
and this method solves for ``x`` in the matrix equation ``A.x = b``.

Args:
    b (array[n] or array[n, nrhs]): The right hand side of the linear system.

Returns:
    array[n] or array[n, nrhs]: The solution of the linear system.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  solver.def("dot", [](PicklableBandSolver& solver,
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      const Eigen::VectorXd& x,
      const Eigen::MatrixXd& b) {
    return solver.dot(
      alpha_real,
      beta_real,
      alpha_complex_real,
      alpha_complex_imag,
      beta_complex_real,
      beta_complex_imag,
      x,
      b
    );
  },
  R"delim(
Compute the dot product of a ``celerite`` matrix and another arbitrary matrix

This method computes ``A.b`` where ``A`` is defined by the parameters and
``b`` is an arbitrary matrix of the correct shape.

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    x (array[n]): The _sorted_ array of input coordinates.
    b (array[n] or array[n, neq]): The matrix ``b`` described above.

Returns:
    array[n] or array[n, neq]: The dot product ``A.b`` as described above.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  solver.def("dot_solve", [](PicklableBandSolver& solver, const Eigen::MatrixXd& b) {
    return solver.dot_solve(b);
  },
  R"delim(
Solve the system ``b^T . A^-1 . b``

A previous call to :func:`solver.Solver.compute` defines a matrix ``A``
and this method solves ``b^T . A^-1 . b`` for a vector ``b``.

Args:
    b (array[n]): The right hand side of the linear system.

Returns:
    float: The solution of ``b^T . A^-1 . b``.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  solver.def("log_determinant", [](PicklableBandSolver& solver) {
    return solver.log_determinant();
  },
  R"delim(
Get the log-determinant of the matrix defined by ``compute``

Returns:
    float: The log-determinant of the matrix defined by
    :func:`solver.Solver.compute`.

)delim");

  solver.def("computed", [](PicklableBandSolver& solver) {
      return solver.computed();
  },
  R"delim(
A flag that indicates if ``compute`` has been executed

Returns:
    bool: ``True`` if :func:`solver.Solver.compute` was previously executed
    successfully.

)delim");

  solver.def("use_lapack", [](const PicklableBandSolver& solver) {
    return solver.use_lapack();
  });

  solver.def("__getstate__", [](const PicklableBandSolver& solver) {
    return solver.serialize();
  });

  solver.def("__setstate__", [](PicklableBandSolver& solver, py::tuple t) {
    if (t.size() != 9) throw std::runtime_error("Invalid state!");

    new (&solver) PicklableBandSolver(t[0].cast<bool>());

    solver.deserialize(
      t[0].cast<bool>(),
      t[1].cast<bool>(),
      t[2].cast<int>(),
      t[3].cast<int>(),
      t[4].cast<int>(),
      t[5].cast<double>(),
      t[6].cast<Eigen::MatrixXd>(),
      t[7].cast<Eigen::MatrixXd>(),
      t[8].cast<Eigen::VectorXi>()
    );
  });

  //
  // ------ SINGLE ------
  //
  py::class_<PicklableSingleSolver> single_solver(m, "SingleSolver", R"delim(
A thin wrapper around the C++ SingleSolver class

The class implements the original R&P method.

)delim");
  single_solver.def(py::init<>());

  single_solver.def("compute", [](PicklableSingleSolver& solver,
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      const Eigen::VectorXd& x,
      const Eigen::VectorXd& diag) {
    return solver.compute(
      alpha_real,
      beta_real,
      alpha_complex_real,
      alpha_complex_imag,
      beta_complex_real,
      beta_complex_imag,
      x,
      diag
    );
  },
  R"delim(
Compute the diagonals and the log determinant

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    x (array[n]): The _sorted_ array of input coordinates.
    diag (array[n]): An array that should be added to the diagonal of the
        matrix. This often corresponds to measurement uncertainties and in
        that case, ``diag`` should be the measurement _variance_
        (i.e. sigma^2).

Returns:
    int: ``1`` if the dimensions are inconsistent and ``0`` otherwise. No
    attempt is made to confirm that the matrix is positive definite. If
    it is not positive definite, the ``solve`` and ``log_determinant``
    methods will return incorrect results.

)delim");

  single_solver.def("solve", [](PicklableSingleSolver& solver, const Eigen::MatrixXd& b) {
    return solver.solve(b);
  },
  R"delim(
Solve a linear system for the matrix defined in ``compute``

A previous call to :func:`solver.SingleSolver.compute` defines a matrix ``A``
and this method solves for ``x`` in the matrix equation ``A.x = b``.

Args:
    b (array[n] or array[n, nrhs]): The right hand side of the linear system.

Returns:
    array[n] or array[n, nrhs]: The solution of the linear system.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  single_solver.def("dot", [](PicklableSingleSolver& solver,
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      const Eigen::VectorXd& x,
      const Eigen::MatrixXd& b) {
    return solver.dot(
      alpha_real,
      beta_real,
      alpha_complex_real,
      alpha_complex_imag,
      beta_complex_real,
      beta_complex_imag,
      x,
      b
    );
  },
  R"delim(
Compute the dot product of a ``celerite`` matrix and another arbitrary matrix

This method computes ``A.b`` where ``A`` is defined by the parameters and
``b`` is an arbitrary matrix of the correct shape.

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    x (array[n]): The _sorted_ array of input coordinates.
    b (array[n] or array[n, neq]): The matrix ``b`` described above.

Returns:
    array[n] or array[n, neq]: The dot product ``A.b`` as described above.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  single_solver.def("dot_solve", [](PicklableSingleSolver& solver, const Eigen::MatrixXd& b) {
    return solver.dot_solve(b);
  },
  R"delim(
Solve the system ``b^T . A^-1 . b``

A previous call to :func:`solver.SingleSolver.compute` defines a matrix ``A``
and this method solves ``b^T . A^-1 . b`` for a vector ``b``.

Args:
    b (array[n]): The right hand side of the linear system.

Returns:
    float: The solution of ``b^T . A^-1 . b``.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  single_solver.def("log_determinant", [](PicklableSingleSolver& solver) {
    return solver.log_determinant();
  },
  R"delim(
Get the log-determinant of the matrix defined by ``compute``

Returns:
    float: The log-determinant of the matrix defined by
    :func:`solver.SingleSolver.compute`.

)delim");

  single_solver.def("computed", [](PicklableSingleSolver& solver) {
      return solver.computed();
  },
  R"delim(
A flag that indicates if ``compute`` has been executed

Returns:
    bool: ``True`` if :func:`solver.SingleSolver.compute` was previously
    executed successfully.

)delim");

  single_solver.def("__getstate__", [](const PicklableSingleSolver& solver) {
    return solver.serialize();
  });

  single_solver.def("__setstate__", [](PicklableSingleSolver& solver, py::tuple t) {
    if (t.size() != 8) throw std::runtime_error("Invalid state!");
    new (&solver) PicklableSingleSolver();
    solver.deserialize(
      t[0].cast<bool>(),
      t[1].cast<int>(),
      t[2].cast<double>(),
      t[3].cast<Eigen::MatrixXd>(),
      t[4].cast<Eigen::MatrixXd>(),
      t[5].cast<Eigen::MatrixXd>(),
      t[6].cast<Eigen::MatrixXd>(),
      t[7].cast<Eigen::MatrixXd>()
    );
  });

  //
  // ------ CARMA ------
  //
  py::class_<celerite::carma::CARMASolver> carma_solver(m, "CARMASolver", R"delim(
A thin wrapper around the C++ CARMASolver class
)delim");
  carma_solver.def(py::init<double, Eigen::VectorXd, Eigen::VectorXd>());
  carma_solver.def("log_likelihood", [](celerite::carma::CARMASolver& solver, const Eigen::VectorXd& t, const Eigen::VectorXd& y, const Eigen::VectorXd& yerr) {
    return solver.log_likelihood(t, y, yerr);
  });
  carma_solver.def("get_celerite_coeffs", [](celerite::carma::CARMASolver& solver) {
    Eigen::VectorXd alpha_real, beta_real, alpha_complex_real, alpha_complex_imag, beta_complex_real, beta_complex_imag;
    solver.get_celerite_coeffs(
      alpha_real, beta_real, alpha_complex_real, alpha_complex_imag, beta_complex_real, beta_complex_imag
    );
    return std::make_tuple(
      alpha_real, beta_real, alpha_complex_real, alpha_complex_imag, beta_complex_real, beta_complex_imag
    );
  });

#ifdef WITH_SPARSE
  //
  // ------ SPARSE ------
  //
  py::class_<celerite::solver::SparseSolver<double> > sparse_solver(m, "SparseSolver", R"delim(
A thin wrapper around the C++ SparseSolver class
)delim");
  sparse_solver.def(py::init<>());

  sparse_solver.def("compute", [](celerite::solver::SparseSolver<double>& solver,
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      const Eigen::VectorXd& x,
      const Eigen::VectorXd& diag) {
    return solver.compute(
      alpha_real,
      beta_real,
      alpha_complex_real,
      alpha_complex_imag,
      beta_complex_real,
      beta_complex_imag,
      x,
      diag
    );
  },
  R"delim(
Assemble the extended matrix and perform the banded LU decomposition

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    x (array[n]): The _sorted_ array of input coordinates.
    diag (array[n]): An array that should be added to the diagonal of the
        matrix. This often corresponds to measurement uncertainties and in
        that case, ``diag`` should be the measurement _variance_
        (i.e. sigma^2).

Returns:
    int: ``1`` if the dimensions are inconsistent and ``0`` otherwise. No
    attempt is made to confirm that the matrix is positive definite. If
    it is not positive definite, the ``solve`` and ``log_determinant``
    methods will return incorrect results.

)delim");

  sparse_solver.def("solve", [](celerite::solver::SparseSolver<double>& solver, const Eigen::MatrixXd& b) {
    return solver.solve(b);
  },
  R"delim(
Solve a linear system for the matrix defined in ``compute``

A previous call to :func:`solver.Solver.compute` defines a matrix ``A``
and this method solves for ``x`` in the matrix equation ``A.x = b``.

Args:
    b (array[n] or array[n, nrhs]): The right hand side of the linear system.

Returns:
    array[n] or array[n, nrhs]: The solution of the linear system.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  sparse_solver.def("dot_solve", [](celerite::solver::SparseSolver<double>& solver, const Eigen::MatrixXd& b) {
    return solver.dot_solve(b);
  },
  R"delim(
Solve the system ``b^T . A^-1 . b``

A previous call to :func:`solver.Solver.compute` defines a matrix ``A``
and this method solves ``b^T . A^-1 . b`` for a vector ``b``.

Args:
    b (array[n]): The right hand side of the linear system.

Returns:
    float: The solution of ``b^T . A^-1 . b``.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  sparse_solver.def("dot", [](celerite::solver::SparseSolver<double>& solver,
      const Eigen::VectorXd& alpha_real,
      const Eigen::VectorXd& beta_real,
      const Eigen::VectorXd& alpha_complex_real,
      const Eigen::VectorXd& alpha_complex_imag,
      const Eigen::VectorXd& beta_complex_real,
      const Eigen::VectorXd& beta_complex_imag,
      const Eigen::VectorXd& x,
      const Eigen::MatrixXd& b) {
    return solver.dot(
      alpha_real,
      beta_real,
      alpha_complex_real,
      alpha_complex_imag,
      beta_complex_real,
      beta_complex_imag,
      x,
      b
    );
  },
  R"delim(
Compute the dot product of a ``celerite`` matrix and another arbitrary matrix

This method computes ``A.b`` where ``A`` is defined by the parameters and
``b`` is an arbitrary matrix of the correct shape.

Args:
    alpha_real (array[j_real]): The coefficients of the real terms.
    beta_real (array[j_real]): The exponents of the real terms.
    alpha_complex_real (array[j_complex]): The real part of the
        coefficients of the complex terms.
    alpha_complex_imag (array[j_complex]): The imaginary part of the
        coefficients of the complex terms.
    beta_complex_real (array[j_complex]): The real part of the
        exponents of the complex terms.
    beta_complex_imag (array[j_complex]): The imaginary part of the
        exponents of the complex terms.
    x (array[n]): The _sorted_ array of input coordinates.
    b (array[n] or array[n, neq]): The matrix ``b`` described above.

Returns:
    array[n] or array[n, neq]: The dot product ``A.b`` as described above.

Raises:
    ValueError: For mismatched dimensions.

)delim");

  sparse_solver.def("log_determinant", [](celerite::solver::SparseSolver<double>& solver) {
    return solver.log_determinant();
  },
  R"delim(
Get the log-determinant of the matrix defined by ``compute``

Returns:
    float: The log-determinant of the matrix defined by
    :func:`solver.Solver.compute`.

)delim");

  sparse_solver.def("computed", [](celerite::solver::SparseSolver<double>& solver) {
      return solver.computed();
  },
  R"delim(
A flag that indicates if ``compute`` has been executed

Returns:
    bool: ``True`` if :func:`solver.Solver.compute` was previously executed
    successfully.

)delim");

  // It turns out that SparseLU objects are hard to serialize so we'll just punt. Sorry!
  sparse_solver.def("__getstate__", [](const celerite::solver::SparseSolver<double>& solver) {
    return std::make_tuple(false);
  });
  sparse_solver.def("__setstate__", [](celerite::solver::SparseSolver<double>& solver, py::tuple t) {
    new (&solver) celerite::solver::SparseSolver<double>();
  });
#endif

  return m.ptr();
}
