"""
Network models expose a probability of connection and a scale of the weights
"""
import abc

import numpy as np
from scipy.special import gammaln, psi
from scipy.misc import logsumexp

from pybasicbayes.abstractions import \
    BayesianDistribution, GibbsSampling, MeanField, MeanFieldSVI
from pybasicbayes.util.stats import sample_discrete_from_log

from pyhawkes.internals.distributions import Discrete, Bernoulli, \
                                             Gamma, Dirichlet, Beta

# TODO: Make a base class for networks
# class Network(BayesianDistribution):
#
#     __metaclass__ = abc.ABCMeta
#
#     @abc.abstractproperty
#     def p(self):
#         """
#         Return a KxK matrix of probability of connection
#         """
#         pass
#
#     @abc.abstractproperty
#     def kappa(self):
#         """
#         Return a KxK matrix of gamma weight shape parameters
#         """
#         pass
#
#     @abc.abstractproperty
#     def v(self):
#         """
#         Return a KxK matrix of gamma weight scale parameters
#         """
#         pass

class _StochasticBlockModelBase(BayesianDistribution):
    """
    A stochastic block model is a clustered network model with
    K:          Number of nodes in the network
    C:          Number of blocks
    m[c]:       Probability that a node belongs block c
    p[c,c']:    Probability of connection from node in block c to node in block c'
    v[c,c']:    Scale of the gamma weight distribution from node in block c to node in block c'

    It is parameterized by:
    pi:         Parameter of Dirichlet prior over m
    tau0, tau1: Parameters of beta prior over p
    alpha:      Shape parameter of gamma prior over v
    beta:       Scale parameter of gamma prior over v
    """

    __metaclass__ = abc.ABCMeta

    def __init__(self, K, C,
                 c=None, m=None, pi=1.0,
                 p=None, tau0=0.1, tau1=0.1,
                 v=None, alpha=1.0, beta=1.0,
                 kappa=1.0,
                 allow_self_connections=True):
        """
        Initialize SBM with parameters defined above.
        """
        assert isinstance(K, int) and C >= 1, "K must be a positive integer number of nodes"
        self.K = K

        assert isinstance(C, int) and C >= 1, "C must be a positive integer number of blocks"
        self.C = C

        if isinstance(pi, (int, float)):
            self.pi = pi * np.ones(C)
        else:
            assert isinstance(pi, np.ndarray) and pi.shape == (C,), "pi must be a sclar or a C-vector"
            self.pi = pi

        self.tau0  = tau0
        self.tau1  = tau1
        self.kappa = kappa
        self.alpha = alpha
        self.beta  = beta
        self.allow_self_connections = allow_self_connections

        if m is not None:
            assert isinstance(m, np.ndarray) and m.shape == (C,) \
                   and np.allclose(m.sum(), 1.0) and np.amin(m) >= 0.0, \
                "m must be a length C probability vector"
            self.m = m
        else:
            self.m = np.random.dirichlet(self.pi)


        if c is not None:
            assert isinstance(c, np.ndarray) and c.shape == (K,) and c.dtype == np.int \
                   and np.amin(c) >= 0 and np.amax(c) <= self.C-1, \
                "c must be a length K-vector of block assignments"
            self.c = c.copy()
        else:
            self.c = np.random.choice(self.C, p=self.m, size=(self.K))

        if p is not None:
            if np.isscalar(p):
                assert p >= 0 and p <= 1, "p must be a probability"
                self.p = p * np.ones((C,C))

            else:
                assert isinstance(p, np.ndarray) and p.shape == (C,C) \
                       and np.amin(p) >= 0 and np.amax(p) <= 1.0, \
                    "p must be a CxC matrix of probabilities"
                self.p = p
        else:
            self.p = np.random.beta(self.tau1, self.tau0, size=(self.C, self.C))

        if v is not None:
            if np.isscalar(v):
                assert v >= 0, "v must be a probability"
                self.v = v * np.ones((C,C))

            else:
                assert isinstance(v, np.ndarray) and v.shape == (C,C) \
                       and np.amin(v) >= 0, \
                    "v must be a CxC matrix of nonnegative gamma scales"
                self.v = v
        else:
            self.v = np.random.gamma(self.alpha, 1.0/self.beta, size=(self.C, self.C))

        # If m, p, and v are specified, then the model is fixed and the prior parameters
        # are ignored
        if None not in (c, p, v):
            self.fixed = True
        else:
            self.fixed = False

    @property
    def P(self):
        """
        Get the KxK matrix of probabilities
        :return:
        """
        P = self.p[np.ix_(self.c, self.c)]
        if not self.allow_self_connections:
            np.fill_diagonal(P, 0.0)
        return P

    @property
    def V(self):
        """
        Get the KxK matrix of scales
        :return:
        """
        return self.v[np.ix_(self.c, self.c)]

    @property
    def Kappa(self):
        return self.kappa * np.ones((self.K, self.K))

    def log_likelihood(self, x):
        """
        Compute the log likelihood of a set of SBM parameters

        :param x:    (m,p,v) tuple
        :return:
        """
        m,p,v,c = x

        lp = 0
        lp += Dirichlet(self.pi).log_probability(m)
        lp += Beta(self.tau1 * np.ones((self.C, self.C)),
                   self.tau0 * np.ones((self.C, self.C))).log_probability(p).sum()
        lp += Gamma(self.alpha, self.beta).log_probability(v).sum()
        lp += (np.log(m)[c]).sum()
        return lp

    def log_probability(self):
        return self.log_likelihood((self.m, self.p, self.v, self.c))

    def rvs(self,size=[]):
        raise NotImplementedError()


class GibbsSBM(_StochasticBlockModelBase, GibbsSampling):
    """
    Implement Gibbs sampling for SBM
    """
    def __init__(self, K, C,
                 c=None, pi=1.0, m=None,
                 p=None, tau0=0.1, tau1=0.1,
                 v=None, alpha=1.0, beta=1.0,
                 kappa=1.0,
                 allow_self_connections=True):
        super(GibbsSBM, self).__init__(K=K, C=C,
                                       c=c, pi=pi, m=m,
                                       p=p, tau0=tau0, tau1=tau1,
                                       v=v, alpha=alpha, beta=beta,
                                       kappa=kappa,
                                       allow_self_connections=allow_self_connections)

        # Initialize parameter estimates
        # print "Uncomment GibbsSBM init"
        if not self.fixed:
            self.c = np.random.choice(self.C, size=(self.K))
            self.m = 1.0/C * np.ones(self.C)
            # self.p = self.tau1 / (self.tau0 + self.tau1) * np.ones((self.C, self.C))
            self.p = np.random.beta(self.tau1, self.tau0, size=(self.C, self.C))
            # self.v = self.alpha / self.beta * np.ones((self.C, self.C))
            self.v = np.random.gamma(self.alpha, 1.0/self.beta, size=(self.C, self.C))

    def resample_p(self, A):
        """
        Resample p given observations of the weights
        """
        for c1 in range(self.C):
            for c2 in range(self.C):
                Ac1c2 = A[np.ix_(self.c==c1, self.c==c2)]

                if not self.allow_self_connections:
                    # TODO: Account for self connections
                    pass

                tau1 = self.tau1 + Ac1c2.sum()
                tau0 = self.tau0 + (1-Ac1c2).sum()
                self.p[c1,c2] = np.random.beta(tau1, tau0)

    def resample_v(self, A, W):
        """
        Resample v given observations of the weights
        """
        # import pdb; pdb.set_trace()
        for c1 in range(self.C):
            for c2 in range(self.C):
                Ac1c2 = A[np.ix_(self.c==c1, self.c==c2)]
                Wc1c2 = W[np.ix_(self.c==c1, self.c==c2)]
                alpha = self.alpha + Ac1c2.sum() * self.kappa
                beta  = self.beta + Wc1c2[Ac1c2 > 0].sum()
                self.v[c1,c2] = np.random.gamma(alpha, 1.0/beta)

    def resample_c(self, A, W):
        """
        Resample block assignments given the weighted adjacency matrix
        and the impulse response fits (if used)
        """
        if self.C == 1:
            return

        # Sample each assignment in order
        for k in range(self.K):
            # Compute unnormalized log probs of each connection
            lp = np.zeros(self.C)

            # Prior from m
            lp += np.log(self.m)

            # Likelihood from network
            for ck in range(self.C):
                c_temp = self.c.copy().astype(np.int)
                c_temp[k] = ck

                # p(A[k,k'] | c)
                lp[ck] += Bernoulli(self.p[ck, c_temp])\
                                .log_probability(A[k,:]).sum()

                # p(A[k',k] | c)
                lp[ck] += Bernoulli(self.p[c_temp, ck])\
                                .log_probability(A[:,k]).sum()

                # p(W[k,k'] | c)
                lp[ck] += (A[k,:] * Gamma(self.kappa, self.v[ck, c_temp])\
                                .log_probability(W[k,:])).sum()

                # p(W[k,k'] | c)
                lp[ck] += (A[:,k] * Gamma(self.kappa, self.v[c_temp, ck])\
                                .log_probability(W[:,k])).sum()

                # TODO: Subtract of self connection since we double counted

                # TODO: Get probability of impulse responses g

            # Resample from lp
            self.c[k] = sample_discrete_from_log(lp)

    def resample_m(self):
        """
        Resample m given c and pi
        """
        pi = self.pi + np.bincount(self.c, minlength=self.C)
        self.m = np.random.dirichlet(pi)

    def resample(self, data=[]):
        if self.fixed:
            return

        A,W = data
        self.resample_p(A)
        self.resample_v(A, W)
        self.resample_c(A, W)
        self.resample_m()

class MeanFieldSBM(_StochasticBlockModelBase, MeanField, MeanFieldSVI):
    """
    Implement Gibbs sampling for SBM
    """
    def __init__(self, K, C,
                 c=None, pi=1.0, m=None,
                 p=None, tau0=0.1, tau1=0.1,
                 v=None, alpha=1.0, beta=1.0,
                 kappa=1.0,
                 allow_self_connections=True):
        super(MeanFieldSBM, self).__init__(K=K, C=C,
                                           c=c, pi=pi, m=m,
                                           p=p, tau0=tau0, tau1=tau1,
                                           v=v, alpha=alpha, beta=beta,
                                           kappa=kappa,
                                           allow_self_connections=allow_self_connections)

        # Initialize mean field parameters
        self.mf_pi    = np.ones(self.C)
        # self.mf_m     = 1.0/self.C * np.ones((self.K, self.C))

        # To break symmetry, start with a sample of mf_m
        self.mf_m     = np.random.dirichlet(10 * np.ones(self.C),
                                            size=(self.K,))
        self.mf_tau0  = self.tau0  * np.ones((self.C, self.C))
        self.mf_tau1  = self.tau1  * np.ones((self.C, self.C))
        self.mf_alpha = self.alpha * np.ones((self.C, self.C))
        self.mf_beta  = self.beta  * np.ones((self.C, self.C))

    def expected_p(self):
        """
        Compute the expected probability of a connection, averaging over c
        :return:
        """
        if self.fixed:
            return self.P

        E_p = np.zeros((self.K, self.K))
        for c1 in range(self.C):
            for c2 in range(self.C):
                # Get the KxK matrix of joint class assignment probabilities
                pc1c2 = self.mf_m[:,c1][:, None] * self.mf_m[:,c2][None, :]

                # Get the probability of a connection for this pair of classes
                E_p += pc1c2 * self.mf_tau1[c1,c2] / (self.mf_tau0[c1,c2] + self.mf_tau1[c1,c2])

        if not self.allow_self_connections:
            np.fill_diagonal(E_p, 0.0)

        return E_p

    def expected_notp(self):
        """
        Compute the expected probability of NO connection, averaging over c
        :return:
        """
        return 1.0 - self.expected_p()

    def expected_log_p(self):
        """
        Compute the expected log probability of a connection, averaging over c
        :return:
        """
        if self.fixed:
            E_ln_p = np.log(self.P)
        else:
            E_ln_p = np.zeros((self.K, self.K))
            for c1 in range(self.C):
                for c2 in range(self.C):
                    # Get the KxK matrix of joint class assignment probabilities
                    pc1c2 = self.mf_m[:,c1][:, None] * self.mf_m[:,c2][None, :]

                    # Get the probability of a connection for this pair of classes
                    E_ln_p += pc1c2 * (psi(self.mf_tau1[c1,c2])
                                       - psi(self.mf_tau0[c1,c2] + self.mf_tau1[c1,c2]))

        if not self.allow_self_connections:
            np.fill_diagonal(E_ln_p, -np.inf)

        return E_ln_p

    def expected_log_notp(self):
        """
        Compute the expected log probability of NO connection, averaging over c
        :return:
        """
        if self.fixed:
            E_ln_notp = np.log(1.0 - self.P)
        else:
            E_ln_notp = np.zeros((self.K, self.K))
            for c1 in range(self.C):
                for c2 in range(self.C):
                    # Get the KxK matrix of joint class assignment probabilities
                    pc1c2 = self.mf_m[:,c1][:, None] * self.mf_m[:,c2][None, :]

                    # Get the probability of a connection for this pair of classes
                    E_ln_notp += pc1c2 * (psi(self.mf_tau0[c1,c2])
                                          - psi(self.mf_tau0[c1,c2] + self.mf_tau1[c1,c2]))

        if not self.allow_self_connections:
            np.fill_diagonal(E_ln_notp, 0.0)

        return E_ln_notp

    def expected_v(self):
        """
        Compute the expected scale of a connection, averaging over c
        :return:
        """
        if self.fixed:
            return self.V

        E_v = np.zeros((self.K, self.K))
        for c1 in range(self.C):
            for c2 in range(self.C):
                # Get the KxK matrix of joint class assignment probabilities
                pc1c2 = self.mf_m[:,c1][:, None] * self.mf_m[:,c2][None, :]

                # Get the probability of a connection for this pair of classes
                E_v += pc1c2 * self.mf_alpha[c1,c2] / self.mf_beta[c1,c2]
        return E_v

    def expected_log_v(self):
        """
        Compute the expected log scale of a connection, averaging over c
        :return:
        """
        if self.fixed:
            return np.log(self.V)

        E_log_v = np.zeros((self.K, self.K))
        for c1 in range(self.C):
            for c2 in range(self.C):
                # Get the KxK matrix of joint class assignment probabilities
                pc1c2 = self.mf_m[:,c1][:, None] * self.mf_m[:,c2][None, :]

                # Get the probability of a connection for this pair of classes
                E_log_v += pc1c2 * (psi(self.mf_alpha[c1,c2])
                                    - np.log(self.mf_beta[c1,c2]))
        return E_log_v

    def expected_m(self):
        return self.mf_pi / self.mf_pi.sum()

    def expected_log_m(self):
        """
        Compute the expected log probability of each block
        :return:
        """
        E_log_m = psi(self.mf_pi) - psi(self.mf_pi.sum())
        return E_log_m

    def expected_log_likelihood(self,x):
        pass

    def mf_update_c(self, E_A, E_notA, E_W_given_A, E_ln_W_given_A, stepsize=1.0):
        """
        Update the block assignment probabilitlies one at a time.
        This one involves a number of not-so-friendly expectations.
        :return:
        """
        # Sample each assignment in order
        for k in range(self.K):
            notk = np.concatenate((np.arange(k), np.arange(k+1,self.K)))

            # Compute unnormalized log probs of each connection
            lp = np.zeros(self.C)

            # Prior from m
            lp += self.expected_log_m()

            # Likelihood from network
            for ck in range(self.C):

                # Compute expectations with respect to other block assignments, c_{\neg k}
                # Initialize vectors for expected parameters
                E_ln_p_ck_to_cnotk    = np.zeros(self.K-1)
                E_ln_notp_ck_to_cnotk = np.zeros(self.K-1)
                E_ln_p_cnotk_to_ck    = np.zeros(self.K-1)
                E_ln_notp_cnotk_to_ck = np.zeros(self.K-1)
                E_v_ck_to_cnotk       = np.zeros(self.K-1)
                E_ln_v_ck_to_cnotk    = np.zeros(self.K-1)
                E_v_cnotk_to_ck       = np.zeros(self.K-1)
                E_ln_v_cnotk_to_ck    = np.zeros(self.K-1)

                for cnotk in range(self.C):
                    # Get the (K-1)-vector of other class assignment probabilities
                    p_cnotk = self.mf_m[notk,cnotk]

                    # Expected log probability of a connection from ck to cnotk
                    E_ln_p_ck_to_cnotk    += p_cnotk * (psi(self.mf_tau1[ck, cnotk])
                                                        - psi(self.mf_tau0[ck, cnotk] + self.mf_tau1[ck, cnotk]))
                    E_ln_notp_ck_to_cnotk += p_cnotk * (psi(self.mf_tau0[ck, cnotk])
                                                        - psi(self.mf_tau0[ck, cnotk] + self.mf_tau1[ck, cnotk]))

                    # Expected log probability of a connection from cnotk to ck
                    E_ln_p_cnotk_to_ck    += p_cnotk * (psi(self.mf_tau1[cnotk, ck])
                                                        - psi(self.mf_tau0[cnotk, ck] + self.mf_tau1[cnotk, ck]))
                    E_ln_notp_cnotk_to_ck += p_cnotk * (psi(self.mf_tau0[cnotk, ck])
                                                        - psi(self.mf_tau0[cnotk, ck] + self.mf_tau1[cnotk, ck]))

                    # Expected log scale of connections from ck to cnotk
                    E_v_ck_to_cnotk       += p_cnotk * (self.mf_alpha[ck, cnotk] / self.mf_beta[ck, cnotk])
                    E_ln_v_ck_to_cnotk    += p_cnotk * (psi(self.mf_alpha[ck, cnotk])
                                                        - np.log(self.mf_beta[ck, cnotk]))

                    # Expected log scale of connections from cnotk to ck
                    E_v_cnotk_to_ck       += p_cnotk * (self.mf_alpha[cnotk, ck] / self.mf_beta[cnotk, ck])
                    E_ln_v_cnotk_to_ck    += p_cnotk * (psi(self.mf_alpha[cnotk, ck])
                                                        - np.log(self.mf_beta[cnotk, ck]))

                # Compute E[ln p(A | c, p)]
                lp[ck] += Bernoulli().negentropy(E_x=E_A[k, notk],
                                                 E_notx=E_notA[k, notk],
                                                 E_ln_p=E_ln_p_ck_to_cnotk,
                                                 E_ln_notp=E_ln_notp_ck_to_cnotk).sum()

                lp[ck] += Bernoulli().negentropy(E_x=E_A[notk, k],
                                                 E_notx=E_notA[notk, k],
                                                 E_ln_p=E_ln_p_cnotk_to_ck,
                                                 E_ln_notp=E_ln_notp_cnotk_to_ck).sum()

                # Compute E[ln p(W | A=1, c, v)]
                lp[ck] += (E_A[k, notk] *
                           Gamma(self.kappa).negentropy(E_ln_lambda=E_ln_W_given_A[k, notk],
                                                        E_lambda=E_W_given_A[k,notk],
                                                        E_beta=E_v_ck_to_cnotk,
                                                        E_ln_beta=E_ln_v_ck_to_cnotk)).sum()

                lp[ck] += (E_A[notk, k] *
                           Gamma(self.kappa).negentropy(E_ln_lambda=E_ln_W_given_A[notk, k],
                                                        E_lambda=E_W_given_A[notk,k],
                                                        E_beta=E_v_cnotk_to_ck,
                                                        E_ln_beta=E_ln_v_cnotk_to_ck)).sum()

                # Compute expected log prob of self connection
                if self.allow_self_connections:
                    E_ln_p_ck_to_ck    = psi(self.mf_tau1[ck, ck]) - psi(self.mf_tau0[ck, ck] + self.mf_tau1[ck, ck])
                    E_ln_notp_ck_to_ck = psi(self.mf_tau0[ck, ck]) - psi(self.mf_tau0[ck, ck] + self.mf_tau1[ck, ck])
                    lp[ck] += Bernoulli().negentropy(E_x=E_A[k, k],
                                                     E_notx=E_notA[k, k],
                                                     E_ln_p=E_ln_p_ck_to_ck,
                                                     E_ln_notp=E_ln_notp_ck_to_ck
                                                    )
                    E_v_ck_to_ck    = self.mf_alpha[ck, ck] / self.mf_beta[ck, ck]
                    E_ln_v_ck_to_ck = psi(self.mf_alpha[ck, ck]) - np.log(self.mf_beta[ck, ck])
                    lp[ck] += (E_A[k, k] *
                               Gamma(self.kappa).negentropy(E_ln_lambda=E_ln_W_given_A[k, k],
                                                            E_lambda=E_W_given_A[k,k],
                                                            E_beta=E_v_ck_to_ck,
                                                            E_ln_beta=E_ln_v_ck_to_ck))


                # TODO: Get probability of impulse responses g


            # Normalize the log probabilities to update mf_m
            Z = logsumexp(lp)
            mk_hat = np.exp(lp - Z)

            self.mf_m[k,:] = (1.0 - stepsize) * self.mf_m[k,:] + stepsize * mk_hat


    def mf_update_p(self, E_A, E_notA, stepsize=1.0):
        """
        Mean field update for the CxC matrix of block connection probabilities
        :param E_A:
        :return:
        """
        for c1 in range(self.C):
            for c2 in range(self.C):
                # Get the KxK matrix of joint class assignment probabilities
                pc1c2 = self.mf_m[:,c1][:, None] * self.mf_m[:,c2][None, :]


                if self.allow_self_connections:
                    tau1_hat = self.tau1 + (pc1c2 * E_A).sum()
                    tau0_hat = self.tau0 + (pc1c2 * E_notA).sum()
                else:
                    # TODO: Account for self connections
                    tau1_hat = self.tau1 + (pc1c2 * E_A).sum()
                    tau0_hat = self.tau0 + (pc1c2 * E_notA).sum()

                self.mf_tau1[c1,c2] = (1.0 - stepsize) * self.mf_tau1[c1,c2] + stepsize * tau1_hat
                self.mf_tau0[c1,c2] = (1.0 - stepsize) * self.mf_tau0[c1,c2] + stepsize * tau0_hat

    def mf_update_v(self, E_A, E_W_given_A, stepsize=1.0):
        """
        Mean field update for the CxC matrix of block connection scales
        :param E_A:
        :param E_W_given_A: Expected W given A
        :return:
        """
        for c1 in range(self.C):
            for c2 in range(self.C):
                # Get the KxK matrix of joint class assignment probabilities
                pc1c2 = self.mf_m[:,c1][:, None] * self.mf_m[:,c2][None, :]

                alpha_hat = self.alpha + (pc1c2 * E_A * self.kappa).sum()
                beta_hat  = self.beta + (pc1c2 * E_A * E_W_given_A).sum()
                self.mf_alpha[c1,c2] = (1.0 - stepsize) * self.mf_alpha[c1,c2] + stepsize * alpha_hat
                self.mf_beta[c1,c2]  = (1.0 - stepsize) * self.mf_beta[c1,c2] + stepsize * beta_hat

    def mf_update_m(self, stepsize=1.0):
        """
        Mean field update of the block probabilities
        :return:
        """
        pi_hat = self.pi + self.mf_m.sum(axis=0)
        self.mf_pi = (1.0 - stepsize) * self.mf_pi + stepsize * pi_hat

    def meanfieldupdate(self, weight_model,
                        update_p=True,
                        update_v=True,
                        update_m=True,
                        update_c=True):
        # Get expectations from the weight model
        E_A = weight_model.expected_A()
        E_notA = 1.0 - E_A
        E_W_given_A = weight_model.expected_W_given_A(1.0)
        E_ln_W_given_A = weight_model.expected_log_W_given_A(1.0)

        # Update the remaining SBM parameters
        if update_c:
            self.mf_update_p(E_A=E_A, E_notA=E_notA)

        if update_v:
            self.mf_update_v(E_A=E_A, E_W_given_A=E_W_given_A)

        if update_m:
            self.mf_update_m()

        # Update the block assignments
        if update_c:
            self.mf_update_c(E_A=E_A,
                             E_notA=E_notA,
                             E_W_given_A=E_W_given_A,
                             E_ln_W_given_A=E_ln_W_given_A)

    def meanfield_sgdstep(self,weight_model, minibatchfrac, stepsize,
                          update_p=True,
                          update_v=True,
                          update_m=True,
                          update_c=True):
        # Get expectations from the weight model
        E_A = weight_model.expected_A()
        E_notA = 1.0 - E_A
        E_W_given_A = weight_model.expected_W_given_A(1.0)
        E_ln_W_given_A = weight_model.expected_log_W_given_A(1.0)

        # Update the remaining SBM parameters
        if update_p:
            self.mf_update_p(E_A=E_A, E_notA=E_notA, stepsize=stepsize)

        if update_v:
            self.mf_update_v(E_A=E_A, E_W_given_A=E_W_given_A, stepsize=stepsize)

        if update_m:
            self.mf_update_m(stepsize=stepsize)

        # Update the block assignments
        if update_c:
            self.mf_update_c(E_A=E_A,
                             E_notA=E_notA,
                             E_W_given_A=E_W_given_A,
                             E_ln_W_given_A=E_ln_W_given_A,
                             stepsize=stepsize)

    def get_vlb(self,
                vlb_c=True,
                vlb_p=True,
                vlb_v=True,
                vlb_m=True):
        # import pdb; pdb.set_trace()
        vlb = 0

        # Get the VLB of the expected class assignments
        if vlb_c:
            E_ln_m = self.expected_log_m()
            for k in range(self.K):
                # Add the cross entropy of p(c | m)
                vlb += Discrete().negentropy(E_x=self.mf_m[k,:], E_ln_p=E_ln_m)

                # Subtract the negative entropy of q(c)
                vlb -= Discrete(self.mf_m[k,:]).negentropy()

        # Get the VLB of the connection probability matrix
        # Add the cross entropy of p(p | tau1, tau0)
        if vlb_p:
            vlb += Beta(self.tau1, self.tau0).\
                negentropy(E_ln_p=(psi(self.mf_tau1) - psi(self.mf_tau0 + self.mf_tau1)),
                           E_ln_notp=(psi(self.mf_tau0) - psi(self.mf_tau0 + self.mf_tau1))).sum()

            # Subtract the negative entropy of q(p)
            vlb -= Beta(self.mf_tau1, self.mf_tau0).negentropy().sum()

        # Get the VLB of the weight scale matrix, v
        # Add the cross entropy of p(v | alpha, beta)
        if vlb_v:
            vlb += Gamma(self.alpha, self.beta).\
                negentropy(E_lambda=self.mf_alpha/self.mf_beta,
                           E_ln_lambda=psi(self.mf_alpha) - np.log(self.mf_beta)).sum()

            # Subtract the negative entropy of q(v)
            vlb -= Gamma(self.mf_alpha, self.mf_beta).negentropy().sum()

        # Get the VLB of the block probability vector, m
        # Add the cross entropy of p(m | pi)
        if vlb_m:
            vlb += Dirichlet(self.pi).negentropy(E_ln_g=self.expected_log_m())

            # Subtract the negative entropy of q(m)
            vlb -= Dirichlet(self.mf_pi).negentropy()

        return vlb

    def resample_from_mf(self):
        """
        Resample from the mean field distribution
        :return:
        """
        self.m = np.random.dirichlet(self.mf_pi)
        self.p = np.random.beta(self.mf_tau1, self.mf_tau0)
        self.v = np.random.gamma(self.mf_alpha, 1.0/self.mf_beta)

        self.c = np.zeros(self.K, dtype=np.int)
        for k in range(self.K):
            self.c[k] = int(np.random.choice(self.C, p=self.mf_m[k,:]))

class StochasticBlockModel(GibbsSBM, MeanFieldSBM):
    pass


class StochasticBlockModelFixedSparsity(StochasticBlockModel):

    """
    Special case of the SBM where the probability of connection, P,
    is fixed. This is valuable for Gibbs sampling, where there is
    a degenerate mode at the dense posterior.
    """
    def __init__(self, K, C=1,
             p=None,
             c=None, pi=1.0, m=None,
             v=None, alpha=1.0, beta=1.0,
             kappa=1.0,
             allow_self_connections=True):

        assert p is not None, "CxC probability matrix must be given at init!"

        super(StochasticBlockModelFixedSparsity, self).\
            __init__(K=K, C=C,
                     p=p,
                     c=c, pi=pi, m=m,
                     v=v, alpha=alpha, beta=beta,
                     kappa=kappa,
                     allow_self_connections=allow_self_connections)

        if np.isscalar(p):
            assert p >= 0 and p <= 1, "p must be a probability"
            self.p = p * np.ones((C,C))

        else:
            assert isinstance(p, np.ndarray) and p.shape == (C,C) \
                   and np.amin(p) >= 0 and np.amax(p) <= 1.0, \
                "p must be a CxC matrix of probabilities"
            self.p = p

    def log_likelihood(self, x):
        """
        Compute the log likelihood of a set of SBM parameters

        :param x:    (m,p,v) tuple
        :return:
        """
        m,p,v = x

        lp = 0
        lp += Dirichlet(self.pi).log_probability(m)
        lp += Gamma(self.alpha, self.beta).log_probability(v).sum()
        return lp

    def resample(self, data=[]):
        if self.fixed:
            return

        A,W = data
        self.resample_v(A, W)
        self.resample_c(A, W)
        self.resample_m()

    def resample_p(self, A):
        pass

    def expected_p(self):
        """
        Compute the expected probability of a connection, averaging over c
        :return:
        """
        return self.P

    def expected_log_p(self):
        """
        Compute the expected log probability of a connection, averaging over c
        :return:
        """
        E_ln_p = np.log(self.P)
        if not self.allow_self_connections:
            np.fill_diagonal(E_ln_p, -np.inf)

        return E_ln_p

    def expected_log_notp(self):
        """
        Compute the expected log probability of NO connection, averaging over c
        :return:
        """
        E_ln_notp = np.log(1-self.P)
        if not self.allow_self_connections:
            np.fill_diagonal(E_ln_notp, np.inf)
        return E_ln_notp

    def meanfieldupdate(self, weight_model,
                        update_p=False,
                        update_v=True,
                        update_m=True,
                        update_c=True):
        assert update_p is False, "Cannot update p!"
        super(StochasticBlockModelFixedSparsity, self).\
            meanfieldupdate(weight_model,
                            update_p=False,
                            update_v=update_v,
                            update_m=update_m,
                            update_c=update_c)

    def meanfield_sgdstep(self, weight_model, minibatchfrac, stepsize,
                          update_p=False,
                          update_v=True,
                          update_m=True,
                          update_c=True):
        assert update_p is False, "Cannot update p!"
        super(StochasticBlockModelFixedSparsity, self).\
            meanfield_sgdstep(weight_model, minibatchfrac, stepsize,
                              update_p=False,
                              update_v=update_v,
                              update_m=update_m,
                              update_c=update_c)

    def get_vlb(self,
                vlb_c=True,
                vlb_p=False,
                vlb_v=True,
                vlb_m=True):
        assert vlb_p is False, "Cannot calculate vlb wrt p!"
        super(StochasticBlockModelFixedSparsity, self).\
            get_vlb(vlb_c=vlb_c,
                    vlb_p=False,
                    vlb_v=vlb_v,
                    vlb_m=vlb_m)

    def resample_from_mf(self):
        """
        Resample from the mean field distribution
        :return:
        """
        self.m = np.random.dirichlet(self.mf_pi)
        self.v = np.random.gamma(self.mf_alpha, 1.0/self.mf_beta)

        self.c = np.zeros(self.K, dtype=np.int)
        for k in range(self.K):
            self.c[k] = int(np.random.choice(self.C, p=self.mf_m[k,:]))



class ErdosRenyiModel(StochasticBlockModel):
    """
    The Erdos-Renyi network model is a special case of the SBM with one block.
    """
    def __init__(self, K,
                 p=None, tau0=0.1, tau1=0.1,
                 v=None, alpha=1.0, beta=1.0,
                 kappa=1.0):
        C = 1
        c = np.zeros(K, dtype=np.int)
        super(ErdosRenyiModel, self).__init__(K, C, c=c,
                                              p=p, tau0=tau0, tau1=tau1,
                                              v=v, alpha=alpha, beta=beta,
                                              kappa=kappa)


class ErdosRenyiFixedSparsity(GibbsSampling, MeanField):
    """
    An ErdosRenyi model with fixed parameters
    """
    def __init__(self, K, p, kappa=1.0, alpha=None, beta=None, v=None, allow_self_connections=True):
        self.K = K
        self.p = p
        self.kappa = kappa

        # Set the weight scale
        if alpha is beta is v is None:
            # If no parameters are specified, set v to be as large as possible
            # while still being stable with high probability
            # See the original paper for details
            self.v = K * kappa * p / 0.5
            self.alpha = self.beta = None
        elif v is not None:
            self.v = v
            self.alpha = self.beta = None
        elif alpha is not None:
            self.alpha = alpha
            if beta is not None:
                self.beta= beta
            else:
                self.beta = alpha * K
            self.v = self.alpha / self.beta
        else:
            raise NotImplementedError("Invalid v,alpha,beta settings")


        self.allow_self_connections = allow_self_connections

        # Mean field
        if self.alpha and self.beta:
            self.mf_alpha = self.alpha
            self.mf_beta = self.beta

    @property
    def P(self):
        """
        Get the KxK matrix of probabilities
        :return:
        """
        P = self.p * np.ones((self.K, self.K))
        if not self.allow_self_connections:
            np.fill_diagonal(P, 0.0)
        return P

    @property
    def V(self):
        """
        Get the KxK matrix of scales
        :return:
        """
        return self.v * np.ones((self.K, self.K))

    @property
    def Kappa(self):
        return self.kappa * np.ones((self.K, self.K))

    def log_likelihood(self, x):
        """
        Compute the log likelihood of a set of SBM parameters

        :param x:    (m,p,v) tuple
        :return:
        """
        lp = 0
        lp += Gamma(self.alpha, self.beta).log_probability(self.v).sum()
        return lp

    def log_probability(self):
        return self.log_likelihood((self.m, self.p, self.v, self.c))

    def rvs(self,size=[]):
        raise NotImplementedError()

    ### Gibbs sampling
    def resample_v(self, A, W):
        """
        Resample v given observations of the weights
        """
        alpha = self.alpha + A.sum() * self.kappa
        beta  = self.beta + W[A > 0].sum()
        self.v = np.random.gamma(alpha, 1.0/beta)

    def resample(self, data=[]):
        if all([self.alpha, self.beta]):
            A,W = data
            self.resample_v(A, W)

    ### Mean Field
    def expected_p(self):
        return self.P

    def expected_notp(self):
        return 1.0 - self.expected_p()

    def expected_log_p(self):
        return np.log(self.P)

    def expected_log_notp(self):
         return np.log(1.0 - self.P)

    def expected_v(self):
        E_v = self.mf_alpha / self.mf_beta
        return E_v

    def expected_log_v(self):
        return psi(self.mf_alpha) - np.log(self.mf_beta)

    def expected_log_likelihood(self,x):
        pass

    def mf_update_v(self, E_A, E_W_given_A, stepsize=1.0):
        """
        Mean field update for the CxC matrix of block connection scales
        :param E_A:
        :param E_W_given_A: Expected W given A
        :return:
        """
        alpha_hat = self.alpha + (E_A * self.kappa).sum()
        beta_hat  = self.beta + (E_A * E_W_given_A).sum()
        self.mf_alpha = (1.0 - stepsize) * self.mf_alpha + stepsize * alpha_hat
        self.mf_beta  = (1.0 - stepsize) * self.mf_beta + stepsize * beta_hat

    def meanfieldupdate(self, weight_model, stepsize=1.0):
        E_A = weight_model.expected_A()
        E_W_given_A = weight_model.expected_W_given_A(1.0)
        self.mf_update_v(E_A=E_A, E_W_given_A=E_W_given_A, stepsize=stepsize)

    def meanfield_sgdstep(self,weight_model, minibatchfrac, stepsize):
        self.meanfieldupdate(weight_model, stepsize)

    def get_vlb(self):
        vlb = 0
        vlb += Gamma(self.alpha, self.beta).\
            negentropy(E_lambda=self.mf_alpha/self.mf_beta,
                       E_ln_lambda=psi(self.mf_alpha) - np.log(self.mf_beta)).sum()

        # Subtract the negative entropy of q(v)
        vlb -= Gamma(self.mf_alpha, self.mf_beta).negentropy().sum()
        return vlb

    def resample_from_mf(self):
        """
        Resample from the mean field distribution
        :return:
        """
        self.v = np.random.gamma(self.mf_alpha, 1.0/self.mf_beta)


class LatentDistanceAdjacencyModel(ErdosRenyiModel):
    """
    Network model with probability of connection given by
    a latent distance model. Depends on graphistician package.
    """
    def __init__(self, K, dim=2,
                 v=None, alpha=1.0, beta=1.0,
                 kappa=1.0):
        super(LatentDistanceAdjacencyModel, self).\
            __init__(K=K, v=v, alpha=alpha, beta=beta, kappa=kappa)

        # Create a latent distance model for adjacency matrix
        from graphistician.adjacency import LatentDistanceAdjacencyDistribution
        self.A_dist = LatentDistanceAdjacencyDistribution(K, dim=dim)

    @property
    def P(self):
        return self.A_dist.P

    @property
    def L(self):
        return self.A_dist.L

    def resample(self, data=[]):
        A,W = data
        self.resample_v(A, W)
        self.A_dist.resample(A)