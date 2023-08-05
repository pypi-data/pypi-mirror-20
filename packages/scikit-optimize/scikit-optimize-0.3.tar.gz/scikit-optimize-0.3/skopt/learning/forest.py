import numpy as np
from sklearn.ensemble import RandomForestRegressor as sk_RandomForestRegressor
from sklearn.ensemble import ExtraTreesRegressor as sk_ExtraTreesRegressor


def _return_std(X, trees, predictions, min_variance):
    """
    Returns `std(Y | X)`.

    Can be calculated by E[Var(Y | Tree)] + Var(E[Y | Tree]) where
    P(Tree) is `1 / len(trees)`.

    Parameters
    ----------
    * `X` [array-like, shape=(n_samples, n_features)]:
        Input data.

    * `trees` [list, shape=(n_estimators,)]:
        List of fit sklearn trees as obtained from the ``estimators_``
        attribute of a fit RandomForestRegressor or ExtraTreesRegressor.

    * `predictions` [array-like, shape=(n_samples,)]:
        Prediction of each data point as returned by RandomForestRegressor
        or ExtraTreesRegressor.

    Returns
    -------
    * `std` [array-like, shape=(n_samples,)]:
        Standard deviation of `y` at `X`. If criterion
        is set to "mse", then `std[i] ~= std(y | X[i])`.
    """
    # This derives std(y | x) as described in 4.3.2 of arXiv:1211.0906
    std = np.zeros(len(X))

    for tree in trees:
        var_tree = tree.tree_.impurity[tree.apply(X)]

        # This rounding off is done in accordance with the
        # adjustment done in section 4.3.3
        # of http://arxiv.org/pdf/1211.0906v2.pdf to account
        # for cases such as leaves with 1 sample in which there
        # is zero variance.
        var_tree[var_tree < min_variance] = min_variance
        mean_tree = tree.predict(X)
        std += var_tree + mean_tree ** 2

    std /= len(trees)
    std -= predictions ** 2.0
    std[std < 0.0] = 0.0
    std = std ** 0.5
    return std


class RandomForestRegressor(sk_RandomForestRegressor):
    """
    RandomForestRegressor that supports `return_std`.
    """
    def __init__(self, n_estimators=10, criterion='mse', max_depth=None,
                 min_samples_split=2, min_samples_leaf=1,
                 min_weight_fraction_leaf=0.0, max_features='auto',
                 max_leaf_nodes=None, bootstrap=True, oob_score=False,
                 n_jobs=1, random_state=None, verbose=0, warm_start=False,
                 min_variance=0.0):
        self.min_variance = min_variance
        super(RandomForestRegressor, self).__init__(
            n_estimators=n_estimators, criterion=criterion,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            min_samples_leaf=min_samples_leaf,
            min_weight_fraction_leaf=min_weight_fraction_leaf,
            max_features=max_features, max_leaf_nodes=max_leaf_nodes,
            bootstrap=bootstrap, oob_score=oob_score,
            n_jobs=n_jobs, random_state=random_state,
            verbose=verbose, warm_start=warm_start)

    def predict(self, X, return_std=False):
        """
        Predict continuous output for X.

        Parameters
        ----------
        * `X` [array-like, shape=(n_samples, n_features)]:
            Input data.

        * `return_std` [bool, default False]:
            Whether or not to return the standard deviation.

        Returns
        -------
        * `predictions` [array-like, shape=(n_samples,)]:
            Predicted values for X. If criterion is set to "mse",
            then `predictions[i] ~= mean(y | X[i])`.

        * `std` [array-like, shape=(n_samples,)]:
            Standard deviation of `y` at `X`. If criterion
            is set to "mse", then `std[i] ~= std(y | X[i])`.
        """
        mean = super(RandomForestRegressor, self).predict(X)

        if return_std:
            if self.criterion != "mse":
                raise ValueError(
                    "Expected impurity to be 'mse', got %s instead"
                    % self.criterion)
            std = _return_std(X, self.estimators_, mean, self.min_variance)
            return mean, std
        return mean


class ExtraTreesRegressor(sk_ExtraTreesRegressor):
    """
    ExtraTreesRegressor that supports `return_std`.
    """
    def __init__(self, n_estimators=10, criterion='mse', max_depth=None,
                 min_samples_split=2, min_samples_leaf=1,
                 min_weight_fraction_leaf=0.0, max_features='auto',
                 max_leaf_nodes=None, bootstrap=False, oob_score=False,
                 n_jobs=1, random_state=None, verbose=0, warm_start=False,
                 min_variance=0.0):
        self.min_variance = min_variance
        super(ExtraTreesRegressor, self).__init__(
            n_estimators=n_estimators, criterion=criterion,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            min_samples_leaf=min_samples_leaf,
            min_weight_fraction_leaf=min_weight_fraction_leaf,
            max_features=max_features, max_leaf_nodes=max_leaf_nodes,
            bootstrap=bootstrap, oob_score=oob_score,
            n_jobs=n_jobs, random_state=random_state,
            verbose=verbose, warm_start=warm_start)

    def predict(self, X, return_std=False):
        """
        Predict continuous output for X.

        Parameters
        ----------
        * `X` [array-like, shape=(n_samples, n_features)]:
            Input data.

        * `return_std` [bool, default: False]:
            Whether or not to return the standard deviation.

        Returns
        -------
        * `predictions` [array-like, shape=(n_samples,)]:
            Predicted values for X. If criterion is set to "mse",
            then `predictions[i] ~= mean(y | X[i])`.

        * `std` [array-like, shape=(n_samples,)]:
            Standard deviation of `y` at `X`. If criterion
            is set to "mse", then `std[i] ~= std(y | X[i])`.
        """
        mean = super(ExtraTreesRegressor, self).predict(X)

        if return_std:
            if self.criterion != "mse":
                raise ValueError(
                    "Expected impurity to be 'mse', got %s instead"
                    % self.criterion)
            std = _return_std(X, self.estimators_, mean, self.min_variance)
            return mean, std

        return mean
