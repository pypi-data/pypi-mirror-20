# -*- coding: utf-8 -*-

"""Fixtures."""

#------------------------------------------------------------------------------
# Imports
#------------------------------------------------------------------------------

import os.path as op

import numpy as np
from pytest import fixture

from klusta.kwik.mea import staggered_positions
from klusta.kwik.mock import (artificial_waveforms,
                              artificial_features,
                              artificial_spike_clusters,
                              artificial_spike_samples,
                              artificial_masks,
                              artificial_traces,
                              )
from klusta.utils import Bunch, _spikes_per_cluster


#------------------------------------------------------------------------------
# Fixtures
#------------------------------------------------------------------------------

@fixture
def model(tempdir):
    model = Bunch()

    n_spikes = 51
    n_samples_w = 31
    n_samples_t = 20000
    n_channels = 11
    n_clusters = 3
    n_features = 4

    model.path = op.join(tempdir, 'test')
    model.n_channels = n_channels
    # TODO: test with permutation and dead channels
    model.channel_order = None
    model.n_spikes = n_spikes
    model.sample_rate = 20000.
    model.duration = n_samples_t / float(model.sample_rate)
    model.spike_times = artificial_spike_samples(n_spikes) * 1.
    model.spike_times /= model.spike_times[-1]
    model.spike_clusters = artificial_spike_clusters(n_spikes, n_clusters)
    model.cluster_ids = np.unique(model.spike_clusters)
    model.channel_positions = staggered_positions(n_channels)
    model.all_waveforms = artificial_waveforms(n_spikes, n_samples_w,
                                               n_channels)
    model.all_masks = artificial_masks(n_spikes, n_channels)
    model.all_traces = artificial_traces(n_samples_t, n_channels)
    model.all_features = artificial_features(n_spikes, n_channels, n_features)

    # features_masks array
    f = model.all_features.reshape((n_spikes, -1))
    m = np.repeat(model.all_masks, n_features, axis=1)
    model.all_features_masks = np.dstack((f, m))

    model.spikes_per_cluster = _spikes_per_cluster(model.spike_clusters)
    model.n_features_per_channel = n_features
    model.n_samples_waveforms = n_samples_w
    model.cluster_groups = {c: None for c in range(n_clusters)}

    return model
