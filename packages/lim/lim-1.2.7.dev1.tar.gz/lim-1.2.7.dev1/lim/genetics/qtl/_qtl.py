from __future__ import absolute_import, unicode_literals

import logging
from copy import copy
from operator import attrgetter

from numpy import asarray, empty, nan

from cachetools import LRUCache, cachedmethod
from limix_inference.glmm import ExpFamEP
from limix_inference.lmm import FastLMM
from numpy_sugar.linalg import economic_qs

from ..phenotype import NormalPhenotype


class QTLScan(object):
    def __init__(self, phenotype, covariates, X, Q0, Q1, S0):
        self._logger = logging.getLogger(__name__)

        self._X = X
        self._data = {
            'user': {
                'phenotype': phenotype,
                'covariates': covariates,
                'Q0': Q0,
                'Q1': Q1,
                'S0': S0
            },
            'effective': {
                'phenotype': None,
                'covariates': None,
                'Q0': None,
                'Q1': None,
                'S0': None
            }
        }
        self._null_lml = nan
        self._alt_lmls = None
        self._effect_sizes = None

    def _compute_effective_data(self):
        phenotype = self._data['user']['phenotype']
        covariates = self._data['user']['covariates']
        Q0, Q1 = self._data['user']['Q0'], self._data['user']['Q1']
        S0 = self._data['user']['S0']

        if phenotype.likelihood_name.lower() == 'normal':
            for k in self._data['user'].keys():
                self._data['effective'][k] = copy(self._data['user'][k])
        else:
            ep = ExpFamEP(
                phenotype.to_likelihood(), covariates, Q0=Q0, Q1=Q1, S0=S0)
            ep.optimize()

            phenotype = NormalPhenotype(ep._sitelik_eta / ep._sitelik_tau)
            K = ep.covariance()
            ((Q0, Q1), S0) = economic_qs(K)

            self._data['effective']['phenotype'] = phenotype
            self._data['effective']['covariates'] = covariates
            self._data['effective']['Q0'] = Q0
            self._data['effective']['Q1'] = Q1
            self._data['effective']['S0'] = S0

    @property
    def candidate_markers(self):
        """Candidate markers.

        :getter: Returns candidate markers
        :setter: Sets candidate markers
        :type: `array_like` (:math:`N\\times P_c`)
        """
        return self._X

    @candidate_markers.setter
    def candidate_markers(self, X):
        self._X = X
        self._cache_compute_alt_models.clear()

    def compute_statistics(self):
        self._logger.info('Computing likelihood-ratio test statistics.')
        self._compute_null_model()
        self._compute_alt_models()

    def _compute_null_model(self):
        self._compute_effective_data()

        phenotype = self._data['effective']['phenotype']
        covariates = self._data['effective']['covariates']
        Q0, Q1 = self._data['effective']['Q0'], self._data['effective']['Q1']
        S0 = self._data['effective']['S0']

        flmm = FastLMM(
            phenotype.outcome, Q0=Q0, Q1=Q1, S0=S0, covariates=covariates)
        flmm.learn()
        self._flmm = flmm
        self._null_lml = flmm.lml()

    def _compute_alt_models(self):
        phenotype = self._data['effective']['phenotype']
        covariates = self._data['effective']['covariates']
        Q0, Q1 = self._data['effective']['Q0'], self._data['effective']['Q1']
        S0 = self._data['effective']['S0']

        # if self._phenotype.likelihood_name.lower() == 'normal':
        n, p = self._X.shape
        nc = covariates.shape[1]
        self._alt_lmls = empty(p)
        self._effect_sizes = empty(p)
        M = empty((n, nc + 1))
        M[:, :nc] = covariates
        for i in range(p):
            M[:, nc] = self._X[:, i]
            flmm = self._flmm.copy()
            flmm.M = M
            flmm.learn()
            self._alt_lmls[i] = flmm.lml()
            self._effect_sizes[i] = flmm.beta[-1]

    def null_lml(self):
        """Log marginal likelihood for the null hypothesis."""
        self.compute_statistics()
        return self._null_lml

    def alt_lmls(self):
        """Log marginal likelihoods for the alternative hypothesis."""
        self.compute_statistics()
        return self._alt_lmls

    def candidate_effect_sizes(self):
        """Effect size for candidate markers."""
        self.compute_statistics()
        return self._effect_sizes

    def pvalues(self):
        """Association p-value for candidate markers."""
        self.compute_statistics()

        lml_alts = self.alt_lmls()
        lml_null = self.null_lml()

        lrs = -2 * lml_null + 2 * asarray(lml_alts)

        from scipy.stats import chi2
        chi2 = chi2(df=1)

        return chi2.sf(lrs)


class QTLScan0(object):
    def __init__(self, phenotype, covariates, X, Q0, Q1, S0):
        self._logger = logging.getLogger(__name__)

        self._cache_compute_null_model = LRUCache(maxsize=1)
        self._cache_compute_alt_models = LRUCache(maxsize=1)
        self._phenotype = phenotype
        self._covariates = covariates
        self._X = X
        self._Q0 = Q0
        self._Q1 = Q1
        self._S0 = S0
        self._null_lml = nan
        self._alt_lmls = None
        self._effect_sizes = None

    @property
    def candidate_markers(self):
        """Candidate markers.

        :getter: Returns candidate markers
        :setter: Sets candidate markers
        :type: `array_like` (:math:`N\\times P_c`)
        """
        return self._X

    @candidate_markers.setter
    def candidate_markers(self, X):
        self._X = X
        self._cache_compute_alt_models.clear()

    def compute_statistics(self):
        self._logger.info('Computing likelihood-ratio test statistics.')
        self._compute_null_model()
        self._compute_alt_models()

    @cachedmethod(attrgetter('_cache_compute_null_model'))
    def _compute_null_model(self):
        covariates = self._covariates
        Q0, Q1 = self._Q0, self._Q1
        S0 = self._S0
        if self._phenotype.likelihood_name.lower() == 'normal':
            flmm = FastLMM(
                self._phenotype.outcome,
                Q0=Q0,
                Q1=Q1,
                S0=S0,
                covariates=covariates)
            flmm.learn()
            self._flmm = flmm
            self._null_lml = flmm.lml()
        else:
            ep = ExpFamEP(
                self._phenotype.to_likelihood(),
                covariates,
                Q0=Q0,
                Q1=Q1,
                S0=S0)
            ep.optimize()
            self._null_lml = ep.lml()
            self._fixed_ep = ep.fixed_ep()

    @cachedmethod(attrgetter('_cache_compute_alt_models'))
    def _compute_alt_models(self):
        if self._phenotype.likelihood_name.lower() == 'normal':
            n, p = self._X.shape
            nc = self._covariates.shape[1]
            self._alt_lmls = empty(p)
            self._effect_sizes = empty(p)
            M = empty((n, nc + 1))
            M[:, :nc] = self._covariates
            for i in range(p):
                M[:, nc] = self._X[:, i]
                flmm = self._flmm.copy()
                flmm.M = M
                flmm.learn()
                self._alt_lmls[i] = flmm.lml()
                self._effect_sizes[i] = flmm.beta[-1]
        else:
            fep = self._fixed_ep
            covariates = self._covariates
            X = self._X
            self._alt_lmls, self._effect_sizes = fep.compute(covariates, X)

    def null_lml(self):
        """Log marginal likelihood for the null hypothesis."""
        self.compute_statistics()
        return self._null_lml

    def alt_lmls(self):
        """Log marginal likelihoods for the alternative hypothesis."""
        self.compute_statistics()
        return self._alt_lmls

    def candidate_effect_sizes(self):
        """Effect size for candidate markers."""
        self.compute_statistics()
        return self._effect_sizes

    def pvalues(self):
        """Association p-value for candidate markers."""
        self.compute_statistics()

        lml_alts = self.alt_lmls()
        lml_null = self.null_lml()

        lrs = -2 * lml_null + 2 * asarray(lml_alts)

        from scipy.stats import chi2
        chi2 = chi2(df=1)

        return chi2.sf(lrs)
