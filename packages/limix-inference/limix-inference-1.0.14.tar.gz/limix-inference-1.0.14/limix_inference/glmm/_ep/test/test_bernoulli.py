from __future__ import division

from numpy import array, dot, empty, ones, sqrt
from numpy.random import RandomState
from numpy.testing import assert_almost_equal, assert_allclose

from numpy_sugar.linalg import economic_qs_linear

from limix_inference.glmm import ExpFamEP
from limix_inference.lik import BernoulliProdLik
from limix_inference.link import LogitLink


def test_bernoulli_lml():
    n = 3
    M = ones((n, 1)) * 1.
    G = array([[1.2, 3.4], [-.1, 1.2], [0.0, .2]])
    (Q, S0) = economic_qs_linear(G)
    y = array([1., 0., 1.])
    lik = BernoulliProdLik(LogitLink())
    lik.outcome = y
    ep = ExpFamEP(lik, M, Q[0], Q[1], S0 + 1.0)
    ep.beta = array([1.])
    assert_almost_equal(ep.beta, array([1.]))
    ep.v = 1.
    ep.delta = 0.
    assert_almost_equal(ep.lml(), -2.3202659215368935)
    assert_almost_equal(ep.sigma2_epsilon, 0)
    assert_almost_equal(ep.sigma2_b, 1)


def test_bernoulli_gradient_over_v():
    n = 3
    M = ones((n, 1)) * 1.
    G = array([[1.2, 3.4], [-.1, 1.2], [0.0, .2]])
    (Q, S0) = economic_qs_linear(G)
    y = array([1., 0., 1.])
    lik = BernoulliProdLik(LogitLink())
    lik.outcome = y
    ep = ExpFamEP(lik, M, Q[0], Q[1], S0 + 1.0)
    ep.beta = array([1.])
    assert_almost_equal(ep.beta, array([1.]))
    ep.v = 1.
    ep.delta = 0.

    analytical_gradient = ep._gradient_over_v()

    lml0 = ep.lml()
    step = 1e-5
    ep.v = ep.v + step
    lml1 = ep.lml()

    empirical_gradient = (lml1 - lml0) / step

    assert_almost_equal(empirical_gradient, analytical_gradient, decimal=4)


def test_bernoulli_optimize():
    random = RandomState(139)
    nsamples = 100
    nfeatures = nsamples + 10

    G = random.randn(nsamples, nfeatures) / sqrt(nfeatures)

    M = ones((nsamples, 1))

    u = random.randn(nfeatures)

    z = 0.1 + dot(G, u) + 0.5 * random.randn(nsamples)

    y = empty(nsamples)
    y[z > 0] = 1
    y[z <= 0] = 0

    (Q, S0) = economic_qs_linear(G)

    lik = BernoulliProdLik(LogitLink())
    lik.outcome = y
    ep = ExpFamEP(lik, M, Q[0], Q[1], S0)
    ep.learn(progress=False)
    assert_allclose(ep.lml(), -67.68161933698035, rtol=1e-5)
    assert_allclose(ep.heritability, 0.952635979147327, rtol=1e-5)
    assert_allclose(ep.beta[0], -0.15856727011101007, rtol=1e-5)

def test_bernoulli_exceptions():
    from limix_inference.random import bernoulli_sample
    from limix_inference.glmm import ExpFamEP
    from limix_inference.lik import BernoulliProdLik
    from limix_inference.link import LogLink
    from numpy_sugar.linalg import economic_qs_linear
    from numpy.random import RandomState

    offset = 5
    G = [[1, -1], [2, 1]]
    (Q0, Q1), S0 = economic_qs_linear(G)
    y = bernoulli_sample(offset, G, random_state=RandomState(0))
    covariates = [[1.], [0.6]]
    lik = BernoulliProdLik(LogLink)
    lik.outcome = y
    glmm = ExpFamEP(lik, covariates, Q0, Q1, S0)
    # glmm.learn()
    # glmm.lml()


if __name__ == '__main__':
    __import__('pytest').main([__file__, '-s'])
