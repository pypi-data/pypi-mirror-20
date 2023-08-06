ucs
===

Implements the CAM02-UCS (Luo et al. (2006), "`Uniform Colour Spaces Based on CIECAM02 Colour Appearance Model <https://s3-us-west-2.amazonaws.com/4843ec7c-89cf-4d26-a36a-0e40ebc9a3a7/luo2006.pdf>`_") forward transform symbolically, using Theano.

See: `CIECAM02 and Its Recent Developments <http://www.springer.com/cda/content/document/cda_downloaddocument/9781441961891-c1.pdf>`_.

The forward transform is symbolically differentiable in Theano and it may be approximately inverted, subject to gamut boundaries, by constrained function minimization (e.g. projected gradient descent or `L-BFGS-B <https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.fmin_l_bfgs_b.html#scipy.optimize.fmin_l_bfgs_b>`_).

Package contents
----------------

- ``constants.py`` contains constants needed by CAM02-UCS and others which are merely useful.

- ``functions.py`` contains compiled Theano functions, as well as NumPy equivalents of other symbolic functions.

- ``symbolic.py`` implements the forward transform symbolically in Theano. The functions therein can be used to construct custom auto-differentiable loss functions to be subject to optimization.


