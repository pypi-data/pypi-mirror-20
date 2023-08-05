# -*- coding: utf-8 -*-

"""The KwikModel class manages in-memory structures and Kwik file open/save."""

#------------------------------------------------------------------------------
# Imports
#------------------------------------------------------------------------------

from collections import defaultdict
import os
import os.path as op
from random import randint

import logging
import numpy as np
from six import string_types, integer_types

from ..traces.waveform import WaveformLoader, SpikeLoader
from ..traces.filter import bandpass_filter, apply_filter
from ..utils import _unique, _as_tuple, _read_python
from .h5 import open_h5, File, _mmap_h5
from .mea import MEA

logger = logging.getLogger(__name__)


# -----------------------------------------------------------------------------
# PartialArray
# -----------------------------------------------------------------------------

class PartialArray(object):
    """Proxy to a view of an array, allowing selection along the first
    dimensions and fixing the trailing dimensions."""
    def __init__(self, arr, trailing_index=None, reshape=None):
        self._arr = arr
        self._trailing_index = _as_tuple(trailing_index)
        self.shape = _partial_shape(arr.shape, self._trailing_index)
        self.dtype = arr.dtype
        self.ndim = len(self.shape)
        # We can reshape selections dynamically.
        # Use to reshape the 2D features array into a 3D array.
        self.reshape = reshape
        if reshape and reshape[0] == -1:
            self.shape = (self.shape[0],) + self.reshape[1:]

    def __getitem__(self, item):
        if self._trailing_index is None:
            out = self._arr[item]
        else:
            item = _as_tuple(item)
            k = len(item)
            n = len(self._arr.shape)
            t = len(self._trailing_index)
            if k < (n - t):
                item += (slice(None, None, None),) * (n - k - t)
            item += self._trailing_index
            if len(item) != n:
                raise ValueError("The array selection is invalid: "
                                 "{0}".format(str(item)))
            out = self._arr[item]
        if self.reshape:
            # Avoid error when the reshaped array contains extra dimensions.
            n = np.prod(self.reshape[1:])
            return out[..., :n].reshape(self.reshape)
        else:
            return out

    def __len__(self):
        return self.shape[0]


class ConcatenatedArrays(object):
    """This object represents a concatenation of several memory-mapped
    arrays."""
    def __init__(self, arrs, cols=None):
        assert isinstance(arrs, list)
        self.arrs = arrs
        # Reordering of the columns.
        self.cols = cols
        self.offsets = np.concatenate([[0], np.cumsum([arr.shape[0]
                                                       for arr in arrs])],
                                      axis=0)
        self.dtype = arrs[0].dtype if arrs else None

    @property
    def shape(self):
        ncols = (len(self.cols) if self.cols is not None
                 else self.arrs[0].shape[1])
        return (self.offsets[-1], ncols)

    def _get_recording(self, index):
        """Return the recording that contains a given index."""
        assert index >= 0
        recs = np.nonzero((index - self.offsets[:-1]) >= 0)[0]
        if len(recs) == 0:
            # If the index is greater than the total size,
            # return the last recording.
            return len(self.arrs) - 1
        # Return the last recording such that the index is greater than
        # its offset.
        return recs[-1]

    def __getitem__(self, item):
        cols = self.cols if self.cols is not None else slice(None, None, None)
        # Get the start and stop indices of the requested item.
        start, stop = _start_stop(item)
        # Return the concatenation of all arrays.
        if start is None and stop is None:
            return np.concatenate(self.arrs, axis=0)[:, cols]
        if start is None:
            start = 0
        if stop is None:
            stop = self.offsets[-1]
        if stop < 0:
            stop = self.offsets[-1] + stop
        # Get the recording indices of the first and last item.
        rec_start = self._get_recording(start)
        rec_stop = self._get_recording(stop)
        assert 0 <= rec_start <= rec_stop < len(self.arrs)
        # Find the start and stop relative to the arrays.
        start_rel = start - self.offsets[rec_start]
        stop_rel = stop - self.offsets[rec_stop]
        # Single array case.
        if rec_start == rec_stop:
            # Apply the rest of the index.
            return _fill_index(self.arrs[rec_start][start_rel:stop_rel],
                               item)[:, cols]
        chunk_start = self.arrs[rec_start][start_rel:]
        chunk_stop = self.arrs[rec_stop][:stop_rel]
        # Concatenate all chunks.
        l = [chunk_start]
        if rec_stop - rec_start >= 2:
            logger.warn("Loading a full virtual array: this might be slow "
                        "and something might be wrong.")
            l += [self.arrs[r][...] for r in range(rec_start + 1,
                                                   rec_stop)]
        l += [chunk_stop]
        # Apply the rest of the index.
        return _fill_index(np.concatenate(l, axis=0), item)[:, cols]

    def __len__(self):
        return self.shape[0]


class VirtualMappedArray(object):
    """A virtual mapped array that yields null arrays to any selection."""
    def __init__(self, shape, dtype, fill=0):
        self.shape = shape
        self.dtype = dtype
        self.ndim = len(self.shape)
        self._fill = fill

    def __getitem__(self, item):
        if isinstance(item, integer_types):
            return self._fill * np.ones(self.shape[1:], dtype=self.dtype)
        else:
            assert not isinstance(item, tuple)
            n = _len_index(item, max_len=self.shape[0])
            return self._fill * np.ones((n,) + self.shape[1:],
                                        dtype=self.dtype)

    def __len__(self):
        return self.shape[0]


#------------------------------------------------------------------------------
# Utility functions
#------------------------------------------------------------------------------

def _start_stop(item):
    """Find the start and stop indices of a __getitem__ item.

    This is used only by ConcatenatedArrays.

    Only two cases are supported currently:

    * Single integer.
    * Contiguous slice in the first dimension only.

    """
    if isinstance(item, tuple):
        item = item[0]
    if isinstance(item, slice):
        # Slice.
        if item.step not in (None, 1):
            return NotImplementedError()
        return item.start, item.stop
    elif isinstance(item, (list, np.ndarray)):
        # List or array of indices.
        return np.min(item), np.max(item)
    else:
        # Integer.
        return item, item + 1


def _len_index(item, max_len=0):
    """Return the expected length of the output of __getitem__(item)."""
    if isinstance(item, (list, np.ndarray)):
        return len(item)
    elif isinstance(item, slice):
        stop = item.stop or max_len
        start = item.start or 0
        step = item.step or 1
        start = np.clip(start, 0, stop)
        assert 0 <= start <= stop
        return 1 + ((stop - 1 - start) // step)
    else:
        return 1


def _fill_index(arr, item):
    if isinstance(item, tuple):
        item = (slice(None, None, None),) + item[1:]
        return arr[item]
    else:
        return arr


def _partial_shape(shape, trailing_index):
    """Return the shape of a partial array."""
    if shape is None:
        shape = ()
    if trailing_index is None:
        trailing_index = ()
    trailing_index = _as_tuple(trailing_index)
    # Length of the selection items for the partial array.
    len_item = len(shape) - len(trailing_index)
    # Array for the trailing dimensions.
    _arr = np.empty(shape=shape[len_item:])
    try:
        trailing_arr = _arr[trailing_index]
    except IndexError:
        raise ValueError("The partial shape index is invalid.")
    return shape[:len_item] + trailing_arr.shape


def _concatenate_virtual_arrays(arrs, cols=None):
    """Return a virtual concatenate of several NumPy arrays."""
    n = len(arrs)
    if n == 0:
        return None
    return ConcatenatedArrays(arrs, cols)


def _dat_n_samples(filename, dtype=None, n_channels=None):
    assert dtype is not None
    item_size = np.dtype(dtype).itemsize
    n_samples = op.getsize(filename) // (item_size * n_channels)
    assert n_samples >= 0
    return n_samples


def _dat_to_traces(dat_path, n_channels, dtype):
    assert dtype is not None
    assert n_channels is not None
    n_samples = _dat_n_samples(dat_path,
                               n_channels=n_channels,
                               dtype=dtype,
                               )
    return np.memmap(dat_path, dtype=dtype, shape=(n_samples, n_channels))


#------------------------------------------------------------------------------
# Kwik utility functions
#------------------------------------------------------------------------------

def _to_int_list(l):
    """Convert int strings to ints."""
    return [int(_) for _ in l]


def _list_int_children(group):
    """Return the list of int children of a HDF5 group."""
    return sorted(_to_int_list(group.keys()))


def _list_channel_groups(kwik):
    """Return the list of channel groups in a kwik file."""
    if 'channel_groups' in kwik:
        return _list_int_children(kwik['/channel_groups'])
    else:
        return []


def _list_recordings(kwik):
    """Return the list of recordings in a kwik file."""
    if '/recordings' in kwik:
        recordings = _list_int_children(kwik['/recordings'])
    else:
        recordings = []
    # TODO: return a dictionary of recordings instead of a list of recording
    # ids.
    # return {rec: Bunch({
    #     'start': kwik['/recordings/{0}'.format(rec)].attrs['start_sample']
    # }) for rec in recordings}
    return recordings


def _list_channels(kwik, channel_group=None):
    """Return the list of channels in a kwik file."""
    assert isinstance(channel_group, integer_types)
    path = '/channel_groups/{0:d}/channels'.format(channel_group)
    if path in kwik:
        channels = _list_int_children(kwik[path])
        return channels
    else:
        return []


def _list_clusterings(kwik, channel_group=None):
    """Return the list of clusterings in a kwik file."""
    if channel_group is None:
        raise RuntimeError("channel_group must be specified when listing "
                           "the clusterings.")
    assert isinstance(channel_group, integer_types)
    path = '/channel_groups/{0:d}/clusters'.format(channel_group)
    if path not in kwik:
        return []
    clusterings = sorted(kwik[path].keys())
    # Ensure 'main' is the first if it exists.
    if 'main' in clusterings:
        clusterings.remove('main')
        clusterings = ['main'] + clusterings
    return clusterings


def _concatenate_spikes(spikes, recs, offsets):
    """Concatenate spike samples belonging to consecutive recordings."""
    assert offsets is not None
    spikes = np.asarray(spikes)
    offsets = np.asarray(offsets)
    recs = np.asarray(recs)
    return (spikes + offsets[recs]).astype(np.int64)


def _create_cluster_group(f, group_id, name,
                          clustering=None,
                          channel_group=None,
                          write_color=True,
                          ):
    cg_path = ('/channel_groups/{0:d}/'
               'cluster_groups/{1:s}/{2:d}').format(channel_group,
                                                    clustering,
                                                    group_id,
                                                    )
    kv_path = cg_path + '/application_data/klustaviewa'
    f.write_attr(cg_path, 'name', name)
    if write_color:
        f.write_attr(kv_path, 'color', randint(2, 10))


def _create_clustering(f, name,
                       channel_group=None,
                       spike_clusters=None,
                       cluster_groups=None,
                       ):
    if cluster_groups is None:
        cluster_groups = {}
    assert isinstance(f, File)
    path = '/channel_groups/{0:d}/spikes/clusters/{1:s}'.format(channel_group,
                                                                name)
    assert not f.exists(path)

    # Save spike_clusters.
    f.write(path, spike_clusters.astype(np.int32))

    cluster_ids = _unique(spike_clusters)

    # Create cluster metadata.
    for cluster in cluster_ids:
        cluster_path = '/channel_groups/{0:d}/clusters/{1:s}/{2:d}'.format(
            channel_group, name, cluster)
        kv_path = cluster_path + '/application_data/klustaviewa'

        # Default group: unsorted.
        cluster_group = cluster_groups.get(cluster, 3)
        f.write_attr(cluster_path, 'cluster_group', cluster_group)
        f.write_attr(kv_path, 'color', randint(2, 10))

    # Create cluster group metadata.
    for group_id, cg_name in _DEFAULT_GROUPS:
        _create_cluster_group(f, group_id, cg_name,
                              clustering=name,
                              channel_group=channel_group,
                              )


def list_kwik(folders):
    """Return the list of Kwik files found in a list of folders."""
    ret = []
    for d in folders:
        for root, dirs, files in os.walk(os.path.expanduser(d)):
            for f in files:
                if f.endswith(".kwik"):
                    ret.append(os.path.join(root, f))
    return ret


def _open_h5_if_exists(kwik_path, file_type, mode=None):
    basename, ext = op.splitext(kwik_path)
    path = '{basename}.{ext}'.format(basename=basename, ext=file_type)
    return open_h5(path, mode=mode) if op.exists(path) else None


def _read_traces(kwik, dtype=None, n_channels=None):
    kwd_path = None
    dat_path = None

    dtype = kwik.read_attr('/application_data/spikedetekt/', 'dtype', None)
    if dtype:
        dtype = np.dtype(dtype)

    n_channels = kwik.read_attr('/application_data/spikedetekt/',
                                'n_channels',
                                None)
    # HACK: old format.
    nchannels = kwik.read_attr('/application_data/spikedetekt/',
                               'nchannels',
                               None)
    n_channels = n_channels or nchannels
    if n_channels:
        n_channels = int(n_channels)

    if '/recordings' not in kwik:
        return (None, None)
    recordings = kwik.children('/recordings')
    traces = []
    opened_files = []

    # HACK when there is no recordings: find a .dat file with the same
    # base name in the current directory.
    if not recordings:
        name = op.splitext(op.basename(kwik.filename))[0]
        p = op.join(op.dirname(op.realpath(kwik.filename)), name + '.dat')
        if op.exists(p):
            logger.debug("Loading traces: %s", p)
            dat = _dat_to_traces(p, dtype=dtype or 'int16',
                                 n_channels=n_channels)
            traces.append(dat)
            opened_files.append(dat)

    for recording in recordings:
        # Is there a path specified to a .raw.kwd file which exists in
        # [KWIK]/recordings/[X]/raw? If so, open it.
        path = '/recordings/{}/raw'.format(recording)
        if kwik.has_attr(path, 'hdf5_path'):
            kwd_path = kwik.read_attr(path, 'hdf5_path')[:-8]
            kwd = _open_h5_if_exists(kwd_path, 'raw.kwd')
            if kwd is None:
                logger.debug("%s not found, trying same basename in KWIK dir",
                             kwd_path)
            else:
                logger.debug("Loading traces: %s", kwd_path)
                traces.append(kwd.read('/recordings/{}/data'
                              .format(recording)))
                opened_files.append(kwd)
                continue
        # Is there a path specified to a .dat file which exists?
        elif kwik.has_attr(path, 'dat_path'):
            assert dtype is not None
            assert n_channels
            dat_path = kwik.read_attr(path, 'dat_path')
            if not op.exists(dat_path):
                logger.debug("%s not found, trying same basename in KWIK dir",
                             dat_path)
            else:
                logger.debug("Loading traces: %s", dat_path)
                dat = _dat_to_traces(dat_path, dtype=dtype,
                                     n_channels=n_channels)
                traces.append(dat)
                opened_files.append(dat)
                continue

        # Does a file exist with the same name in the current directory?
        # If so, open it.
        if kwd_path is not None:
            rel_path = str(op.basename(kwd_path))
            rel_path = op.join(op.dirname(op.realpath(kwik.filename)),
                               rel_path)
            kwd = _open_h5_if_exists(rel_path, 'raw.kwd')
            if kwd is None:
                logger.debug("%s not found, trying experiment basename in "
                             "KWIK dir", rel_path)
            else:
                logger.debug("Loading traces: %s", rel_path)
                traces.append(kwd.read('/recordings/{}/data'
                              .format(recording)))
                opened_files.append(kwd)
                continue
        elif dat_path is not None:
            rel_path = op.basename(dat_path)
            rel_path = op.join(op.dirname(op.realpath(kwik.filename)),
                               rel_path)
            if not op.exists(rel_path):
                logger.debug("%s not found, trying experiment basename in "
                             "KWIK dir", rel_path)
            else:
                logger.debug("Loading traces: %s", rel_path)
                dat = _dat_to_traces(rel_path, dtype=dtype,
                                     n_channels=n_channels)
                traces.append(dat)
                opened_files.append(dat)
                continue

        # Finally, is there a `raw.kwd` with the experiment basename in the
        # current directory? If so, open it.
        kwd = _open_h5_if_exists(kwik.filename, 'raw.kwd')
        if kwd is None:
            logger.warn("Could not find any data source for traces "
                        "(raw.kwd or .dat or .bin.). Waveforms and "
                        "traces will not be available.")
        else:
            logger.debug("Successfully loaded basename.raw.kwd in "
                         "same directory")
            traces.append(kwd.read('/recordings/{}/data'.format(recording)))
            opened_files.append(kwd)

    return traces, opened_files


_DEFAULT_GROUPS = [(0, 'Noise'),
                   (1, 'MUA'),
                   (2, 'Good'),
                   (3, 'Unsorted'),
                   ]


def _check_spikes_increasing(spike_samples):

    while not np.all(np.diff(spike_samples) >= 0):
        # NOTE: for an unknown reason, spike times are not
        # always strictly increasing in Kwik files. Mostly, there is
        # a difference of 1 sample, e.g. [..., 123456, 123455, 123490, ...]
        # We try to fix this specific problem, otherwise we raise an
        # error. The program makes the assumption that spike times
        # are always increasing. Otherwise, the CCG computation may fail.
        # There might be other issues as well.
        msg = "The spike times must be increasing. "
        spk = np.nonzero(np.diff(spike_samples) < 0)[0]
        msg += "The spurious spike ids are: %s (%d)" % (str(spk[:9].tolist()),
                                                        len(spk))
        logger.debug(msg)
        # logger.debug(str(spike_samples[spk[:10]].tolist()))
        # logger.debug(str(spike_samples[spk[:10]+1].tolist()))
        logger.debug("Trying a quick hack to fix the problem.")
        spike_samples[spk + 1] += 1
    return spike_samples


#------------------------------------------------------------------------------
# KwikModel class
#------------------------------------------------------------------------------

class KwikModel(object):
    """Holds data contained in a kwik file."""

    def __init__(self, kwik_path=None,
                 channel_group=None,
                 clustering=None,
                 waveform_filter=True,
                 ):
        self.name = None
        self._channel_group = None
        self._clustering = None

        # Initialize fields.
        self._spike_samples = None
        self._spike_times = None
        self._spike_clusters = None
        self._metadata = None
        self._kk2_metadata = None
        self._clustering = clustering or 'main'
        self._probe = None
        self._channels = []
        self._channel_order = None
        self._features = None
        self._features_masks = None
        self._masks = None
        self._waveforms = None
        self._cluster_metadata = None
        self._clustering_metadata = {}
        self._all_traces = None
        self._traces = None
        self._recording_offsets = None
        self._waveform_loader = None
        self._waveform_filter = waveform_filter
        self._opened_files = []

        # Open the experiment.
        self.kwik_path = kwik_path
        self.open(kwik_path,
                  channel_group=channel_group,
                  clustering=clustering)

    @property
    def path(self):
        return self.kwik_path

    # Internal properties and methods
    # -------------------------------------------------------------------------

    def _check_kwik_version(self):
        # This class only works with kwik version 2 for now.
        kwik_version = self._kwik.read_attr('/', 'kwik_version')
        if kwik_version != 2:
            raise IOError("The kwik version is %d != 2." % kwik_version)

    @property
    def _channel_groups_path(self):
        return '/channel_groups/{0:d}'.format(self._channel_group)

    @property
    def _spikes_path(self):
        return '{0:s}/spikes'.format(self._channel_groups_path)

    @property
    def _channels_path(self):
        return '{0:s}/channels'.format(self._channel_groups_path)

    @property
    def _clusters_path(self):
        return '{0:s}/clusters'.format(self._channel_groups_path)

    @property
    def _cluster_groups_path(self):
        return '{0:s}/cluster_groups'.format(self._channel_groups_path)

    def _cluster_path(self, cluster):
        return '{0:s}/{1:d}'.format(self._clustering_path, cluster)

    @property
    def _spike_clusters_path(self):
        return '{0:s}/clusters/{1:s}'.format(self._spikes_path,
                                             self._clustering)

    @property
    def _clustering_path(self):
        return '{0:s}/{1:s}'.format(self._clusters_path, self._clustering)

    # Loading and saving
    # -------------------------------------------------------------------------

    def _open_kwik_if_needed(self, mode=None):
        if not self._kwik.is_open():
            self._kwik.open(mode=mode)
            return True
        else:
            if mode is not None:
                self._kwik.mode = mode
            return False

    @property
    def n_samples_waveforms(self):
        return (self._metadata['extract_s_before'] +
                self._metadata['extract_s_after'])

    def _create_waveform_loader(self):
        """Create a waveform loader."""
        n_samples = (self._metadata['extract_s_before'],
                     self._metadata['extract_s_after'])
        order = self._metadata['filter_butter_order']
        rate = self._metadata['sample_rate']
        low = self._metadata['filter_low']
        high = self._metadata['filter_high_factor'] * rate
        b_filter = bandpass_filter(rate=rate,
                                   low=low,
                                   high=high,
                                   order=order)

        if self._metadata.get('waveform_filter', True):
            logger.debug("Enable waveform filter.")

            def the_filter(x, axis=0):
                return apply_filter(x, b_filter, axis=axis)

            filter_margin = order * 3
        else:
            logger.debug("Disable waveform filter.")
            the_filter = None
            filter_margin = 0

        dc_offset = self._metadata.get('waveform_dc_offset', None)
        scale_factor = self._metadata.get('waveform_scale_factor', None)
        self._waveform_loader = WaveformLoader(n_samples=n_samples,
                                               filter=the_filter,
                                               filter_margin=filter_margin,
                                               dc_offset=dc_offset,
                                               scale_factor=scale_factor,
                                               )

    def _update_waveform_loader(self):
        if self._traces is not None:
            self._waveform_loader.traces = self._traces
        else:
            self._waveform_loader.traces = np.zeros((0, self.n_channels),
                                                    dtype=np.float32)

        # Update the list of channels for the waveform loader.
        # UPDATE: no need to do this because channel_order is now
        # taken into account in the traces
        # self._waveform_loader.channels = self._channel_order

    def _create_cluster_metadata(self):
        self._cluster_metadata = defaultdict(lambda: 'unsorted')

    def _load_meta(self, name='spikedetekt'):
        """Load metadata from kwik file."""
        # Automatically load all metadata from spikedetekt group.
        path = '/application_data/{}/'.format(name)
        params = {}
        for attr in self._kwik.attrs(path):
            params[attr] = self._kwik.read_attr(path, attr)
        # Load the default spikedetekt parameters.
        curdir = op.realpath(op.dirname(__file__))
        path = op.join(curdir, '../traces/default_settings.py')
        dfs = _read_python(path).get(name, {})
        for name, default_value in dfs.items():
            if name not in params:
                params[name] = default_value
        return params

    def _load_probe(self):
        # Re-create the probe from the Kwik file.
        channel_groups = {}
        for group in self._channel_groups:
            cg_p = '/channel_groups/{:d}'.format(group)
            c_p = cg_p + '/channels'
            channels = self._kwik.read_attr(cg_p, 'channel_order')
            graph = self._kwik.read_attr(cg_p, 'adjacency_graph')
            positions = {
                channel: self._kwik.read_attr(c_p + '/' + str(channel),
                                              'position')
                for channel in channels
            }
            channel_groups[group] = {
                'channels': channels,
                'graph': graph,
                'geometry': positions,
            }
        probe = {'channel_groups': channel_groups}
        self._probe = MEA(probe=probe)

    def _load_recordings(self):
        # Load recordings.
        self._recordings = _list_recordings(self._kwik.h5py_file)
        # This will be updated later if a KWD file is present.
        self._recording_offsets = [0] * (len(self._recordings) + 1)

    def _load_channels(self):
        self._channels = np.array(_list_channels(self._kwik.h5py_file,
                                                 self._channel_group))
        self._channel_order = self._probe.channels
        if self._traces is not None:
            self._traces.cols = self._channel_order
        assert set(self._channel_order) <= set(self._channels)

    def _load_channel_groups(self, channel_group=None):
        self._channel_groups = _list_channel_groups(self._kwik.h5py_file)
        if channel_group is None and self._channel_groups:
            # Choose the default channel group if not specified.
            channel_group = self._channel_groups[0]
        # Load the channel group.
        self._channel_group = channel_group

    def _load_features_masks(self):

        # Load features masks.
        h5_path = '{0:s}/features_masks'.format(self._channel_groups_path)

        nfpc = self._metadata['n_features_per_channel']
        nc = len(self.channel_order)

        basename, ext = op.splitext(self.kwik_path)
        kwx_path = basename + '.kwx'

        if not op.exists(kwx_path):
            logger.warn("The `.kwx` file hasn't been found. "
                        "Features and masks won't be available.")
            return

        with open_h5(kwx_path, 'r') as f:
            if h5_path not in f:
                logger.debug("There are no features and masks in the "
                             "`.kwx` file.")
                self._features_masks = self._features = self._masks = None
                return

        # Now we are sure that the kwx file exists and contains the features
        # and masks.

        # NOTE: we bypass HDF5 when reading the features_masks array,
        # for performance reasons. We retrieve the offset in the file
        # and use NumPy memmap.
        # fm = self._kwx.read(path)
        fm = _mmap_h5(kwx_path, h5_path)
        self._features_masks = fm
        self._features = PartialArray(fm, 0, reshape=(-1, nc, nfpc))

        # This partial array simulates a (n_spikes, n_channels) array.
        self._masks = PartialArray(fm, (slice(0, nfpc * nc, nfpc), 1))
        assert self._masks.shape == (self.n_spikes, nc)

    def _load_spikes(self):
        # Load spike samples.
        path = '{0:s}/time_samples'.format(self._spikes_path)

        # Concatenate the spike samples from consecutive recordings.
        if path not in self._kwik:
            logger.debug("No spikes found.")
            self._spike_recordings = np.array([], dtype=np.int32)
            self._spike_samples = None
            self._recording_offsets = np.array([], dtype=np.int32)
            return
        _spikes = self._kwik.read(path)[:]
        self._spike_recordings = self._kwik.read(
            '{0:s}/recording'.format(self._spikes_path))[:]

        # If the recording offsets have not been set, we need to create
        # non-trivial ones to ensure that spike times are increasing.
        if np.all(np.array(self._recording_offsets) == 0):
            bounds = np.nonzero(np.diff(self._spike_recordings) > 0)[0]
            self._recording_offsets = np.cumsum(np.hstack(([0],
                                                           _spikes[bounds],
                                                           _spikes[-1])))
        # FIX: remove +1 offset at each recording.
        self._recording_offsets -= np.arange(len(self._recording_offsets))
        self._spike_samples = _concatenate_spikes(_spikes,
                                                  self._spike_recordings,
                                                  self._recording_offsets)
        # Check that spikes are increasing.
        _check_spikes_increasing(self._spike_samples)

    def _load_spike_clusters(self):
        self._spike_clusters = self._kwik.read(self._spike_clusters_path)[:]

    def _save_spike_clusters(self, spike_clusters):
        assert spike_clusters.shape == self._spike_clusters.shape
        assert spike_clusters.dtype == self._spike_clusters.dtype
        self._spike_clusters = spike_clusters
        sc = self._kwik.read(self._spike_clusters_path)
        sc[:] = spike_clusters

    def _load_clusterings(self, clustering=None):
        # Once the channel group is loaded, list the clusterings.
        self._clusterings = _list_clusterings(self._kwik.h5py_file,
                                              self.channel_group)
        # Choose the first clustering (should always be 'main').
        if clustering is None and self.clusterings:
            clustering = self.clusterings[0]
        # Load the specified clustering.
        self._clustering = clustering

    @property
    def _cluster_groups_mapping(self):
        """Mapping {cluster_group_id: name}."""
        path = '{}/{}'.format(self._cluster_groups_path,
                              self._clustering)
        cluster_groups = sorted(map(int, self._kwik.groups(path)))
        mapping = {}
        for cluster_group in cluster_groups:
            name = self._kwik.read_attr('{}/{}'.format(path, cluster_group),
                                        'name')
            mapping[cluster_group] = name
        return mapping

    def _load_cluster_groups(self):
        clusters = self._kwik.groups(self._clustering_path)
        clusters = [int(cluster) for cluster in clusters]
        # NOTE: inverse mapping group name ==> group_number
        mapping = {a: b.lower() if b else str(b)
                   for a, b in self._cluster_groups_mapping.items()}
        imapping = {b: a for a, b in mapping.items()}
        for cluster in clusters:
            path = self._cluster_path(cluster)
            # NOTE: The group id is saved in the Kwik file. However,
            # it might happen that the Kwik file was saved with a bug that
            # replaced the group id by its name. Here we ensure that we
            # have a group id.
            group_id = self._kwik.read_attr(path, 'cluster_group')
            if isinstance(group_id, string_types):
                group_id = group_id.lower()
            # HACK: for an unknown reason, group_id might sometimes be an array
            if isinstance(group_id, np.ndarray):  # pragma: no cover
                group_id = group_id[0]
            group_id = int(imapping.get(group_id, group_id))
            # Get the group name.
            group = mapping.get(group_id, 'group_%d' % group_id).lower()
            assert group and isinstance(group, string_types)
            self._cluster_metadata[cluster] = group

    def _save_cluster_groups(self, cluster_groups):
        assert isinstance(cluster_groups, dict)
        # NOTE: inverse mapping group name ==> group_number
        mapping = {a: b.lower() if b else str(b)
                   for a, b in self._cluster_groups_mapping.items()}
        imapping = {b: a for a, b in mapping.items()}
        for cluster, group in cluster_groups.items():
            # Find the group and the group name.
            if isinstance(group, integer_types):
                group_id = group
                assert group_id in mapping
                group = mapping.get(group_id)
            elif group in (None, 'None'):
                group_id = imapping.get(group)
            elif isinstance(group, string_types):
                group = group.lower()
                assert group in imapping
                group_id = imapping.get(group)
            elif group is None:
                group_id = 3
                group = mapping.get(group_id)
            assert group_id is not None
            assert group_id >= 0
            assert group is not None
            assert isinstance(group, string_types)
            path = self._cluster_path(cluster)
            self._kwik.write_attr(path, 'cluster_group', group_id)
            self._cluster_metadata[cluster] = group

    def _load_clustering_metadata(self):
        attrs = self._kwik.attrs(self._clustering_path)
        metadata = {}
        for attr in attrs:
            try:
                metadata[attr] = self._kwik.read_attr(self._clustering_path,
                                                      attr)
            except OSError:
                logger.debug("Error when reading `%s:%s`.",
                             self._clustering_path, attr)
        self._clustering_metadata = metadata

    def _save_clustering_metadata(self, metadata):
        if not metadata:
            return
        assert isinstance(metadata, dict)
        for name, value in metadata.items():
            path = self._clustering_path
            self._kwik.write_attr(path, name, value)
        self._clustering_metadata.update(metadata)

    def _load_traces(self):
        # n_channels = self._metadata.get('n_channels', None)
        # dtype = self._metadata.get('dtype', None)
        # dtype = np.dtype(dtype) if dtype else None
        traces, opened_files = _read_traces(self._kwik,
                                            # dtype=dtype,
                                            # n_channels=n_channels,
                                            )

        if not traces:
            return

        # Update the list of opened files for cleanup.
        self._opened_files.extend(opened_files)

        # Set the recordings offsets (no delay between consecutive recordings).
        i = 0
        self._recording_offsets = []
        for trace in traces:
            self._recording_offsets.append(i)
            i += trace.shape[0] + 1
        self._traces = _concatenate_virtual_arrays(traces,
                                                   self._channel_order)
        self._all_traces = _concatenate_virtual_arrays(traces)

    def open(self, kwik_path, channel_group=None, clustering=None):
        """Open a Kwik dataset.

        The `.kwik` and `.kwx` must be in the same folder with the
        same basename.

        The files containing the traces (`.raw.kwd` or `.dat` / `.bin`) are
        determined according to the following logic:

        - Is there a path specified to a file which exists in
        [KWIK]/recordings/[X]/raw? If so, open it.
        - If this file does not exist, does a file exist with the same name
        in the current directory? If so, open it.
        - If such a file does not exist, or no filename is specified in
        the [KWIK], then is there a `raw.kwd` with the experiment basename
        in the current directory? If so, open it.
        - If not, return with a warning.

        Notes
        -----

        The `.kwik` file is opened in read-only mode, and is automatically
        closed when this function returns. It is temporarily reopened when
        the channel group or clustering changes.

        The `.kwik` file is temporarily opened in append mode when saving.

        The `.kwx` and `.raw.kwd` or `.dat` / `.bin` files stay open in
        read-only mode as long as `model.close()` is not called. This is
        because there might be read accesses to `features_masks` (`.kwx`)
        and waveforms (`.raw.kwd` or `.dat` / `.bin`) while the dataset is
        opened.

        Parameters
        ----------

        kwik_path : str
            Path to a `.kwik` file.
        channel_group : int or None (default is None)
            The channel group (shank) index to use. This can be changed
            later after the file has been opened. By default, the first
            channel group is used.
        clustering : str or None (default is None)
            The clustering to use. This can be changed later after the file
            has been opened. By default, the `main` clustering is used. An
            error is raised if the `main` clustering doesn't exist.

        """

        if kwik_path is None:
            raise ValueError("No kwik_path specified.")

        if not kwik_path.endswith('.kwik'):
            raise ValueError("File does not end in .kwik.")

        # Open the file.
        kwik_path = op.realpath(kwik_path)
        self.kwik_path = kwik_path
        self.name = op.splitext(op.basename(kwik_path))[0]

        # Open the KWIK file.
        self._kwik = _open_h5_if_exists(kwik_path, 'kwik')
        if self._kwik is None:
            raise IOError("File `{0}` doesn't exist.".format(kwik_path))
        if not self._kwik.is_open():
            raise IOError("File `{0}` failed to open.".format(kwik_path))
        self._check_kwik_version()

        # Load the metadata.
        self._metadata = self._load_meta('spikedetekt')
        self._kk2_metadata = self._load_meta('klustakwik2')

        # This needs the metadata.
        self._create_waveform_loader()

        self._load_recordings()

        # This generates the recording offset.
        self._load_traces()

        self._load_channel_groups(channel_group)

        # Load the probe.
        self._load_probe()

        # This needs channel groups.
        self._load_clusterings(clustering)

        # This needs the recording offsets.
        # This loads channels, channel_order, spikes, probe.
        self._channel_group_changed(self._channel_group)

        # This loads spike clusters and cluster groups.
        self._clustering_changed(clustering)

        # This needs channels, channel_order, and waveform loader.
        self._update_waveform_loader()

        # No need to keep the kwik file open.
        self._kwik.close()

        logger.debug("Kwik file `%s` loaded.", self.kwik_path)

    def save(self,
             spike_clusters=None,
             cluster_groups=None,
             clustering_metadata=None,
             ):
        """Save the spike clusters and cluster groups in the Kwik file."""

        # REFACTOR: with() to open/close the file if needed
        to_close = self._open_kwik_if_needed(mode='a')

        if spike_clusters is not None:
            self._save_spike_clusters(spike_clusters)
        if cluster_groups is not None:
            self._save_cluster_groups(cluster_groups)
        if clustering_metadata is not None:
            self._save_clustering_metadata(clustering_metadata)
        logger.info("Save the Kwik file at `%s`.", self.kwik_path)

        if to_close:
            self._kwik.close()

    def describe(self):
        """Display information about the dataset."""
        def _print(name, value):
            print("{0: <24}{1}".format(name, value))
        _print("Kwik file", self.kwik_path)
        _print("Recordings", self.n_recordings)

        # List of channel groups.
        cg = ['{:d}'.format(g) + ('*' if g == self.channel_group else '')
              for g in self.channel_groups]
        _print("List of shanks", ', '.join(cg))

        # List of clusterings.
        cl = ['{:s}'.format(c) + ('*' if c == self.clustering else '')
              for c in self.clusterings]
        _print("Clusterings", ', '.join(cl))

        _print("Channels", self.n_channels)
        _print("Spikes", self.n_spikes)
        _print("Clusters", self.n_clusters)
        _print("Duration", "{:.0f}s".format(self.duration))

    # Changing channel group and clustering
    # -------------------------------------------------------------------------

    def _channel_group_changed(self, value):
        """Called when the channel group changes."""
        if value not in self.channel_groups:
            raise ValueError("The channel group {0} is invalid.".format(value))
        self._channel_group = value

        # Load data.
        _to_close = self._open_kwik_if_needed()

        if self._kwik.h5py_file:
            clusterings = _list_clusterings(self._kwik.h5py_file,
                                            self._channel_group)
        else:
            logger.warn(".kwik filepath doesn't exist.")
            clusterings = None

        if clusterings:
            if 'main' in clusterings:
                self._load_clusterings('main')
                self.clustering = 'main'
            else:
                self._load_clusterings(clusterings[0])
                self.clustering = clusterings[0]
        else:
            self._spike_clusters = None
            self._clustering = None

        self._probe.change_channel_group(value)
        self._load_channels()
        self._load_spikes()
        self._load_features_masks()

        if _to_close:
            self._kwik.close()

        # Update the list of channels for the waveform loader.
        # self._waveform_loader.channels = self._channel_order

    def _clustering_changed(self, value):
        """Called when the clustering changes."""
        if value is None:
            return
        if value not in self.clusterings:
            raise ValueError("The clustering {0} is invalid.".format(value))
        self._clustering = value

        # Load data.
        _to_close = self._open_kwik_if_needed()
        self._create_cluster_metadata()
        self._load_spike_clusters()
        self._load_cluster_groups()
        self._load_clustering_metadata()
        if _to_close:
            self._kwik.close()

    # Managing cluster groups
    # -------------------------------------------------------------------------

    def _write_cluster_group(self, group_id, name, write_color=True):
        if group_id <= 3:
            raise ValueError("Default groups cannot be changed.")

        _DEFAULT_GROUPS.append((group_id, name))

        _to_close = self._open_kwik_if_needed(mode='a')

        _create_cluster_group(self._kwik, group_id, name,
                              clustering=self._clustering,
                              channel_group=self._channel_group,
                              write_color=write_color,
                              )

        if _to_close:
            self._kwik.close()

    def add_cluster_group(self, group_id, name):
        """Add a new cluster group."""
        self._write_cluster_group(group_id, name, write_color=True)

    def rename_cluster_group(self, group_id, name):
        """Rename an existing cluster group."""
        self._write_cluster_group(group_id, name, write_color=False)

    def delete_cluster_group(self, group_id):
        if group_id <= 3:
            raise ValueError("Default groups cannot be deleted.")

        path = ('/channel_groups/{0:d}/'
                'cluster_groups/{1:s}/{2:d}').format(self._channel_group,
                                                     self._clustering,
                                                     group_id,
                                                     )

        _to_close = self._open_kwik_if_needed(mode='a')

        self._kwik.delete(path)

        if _to_close:
            self._kwik.close()

    # Managing clusterings
    # -------------------------------------------------------------------------

    def add_clustering(self, name, spike_clusters):
        """Save a new clustering to the file."""
        if name in self._clusterings:
            raise ValueError("The clustering '{0}' ".format(name) +
                             "already exists.")
        assert len(spike_clusters) == self.n_spikes

        _to_close = self._open_kwik_if_needed(mode='a')

        logger.debug("Add clustering %s.", name)
        _create_clustering(self._kwik,
                           name,
                           channel_group=self._channel_group,
                           spike_clusters=spike_clusters,
                           )

        # Update the list of clusterings.
        self._load_clusterings(self._clustering)

        if _to_close:
            self._kwik.close()

    def _move_clustering(self, old_name, new_name, copy=None):
        if not copy and old_name == self._clustering:
            raise ValueError("You cannot move the current clustering.")
        if new_name in self._clusterings:
            raise ValueError("The clustering '{0}' ".format(new_name) +
                             "already exists.")

        _to_close = self._open_kwik_if_needed(mode='a')

        if copy:
            func = self._kwik.copy
        else:
            func = self._kwik.move

        # /channel_groups/x/spikes/clusters/<name>
        p = self._spikes_path + '/clusters/'
        func(p + old_name, p + new_name)

        # /channel_groups/x/clusters/<name>
        p = self._clusters_path + '/'
        func(p + old_name, p + new_name)

        # /channel_groups/x/cluster_groups/<name>
        p = self._channel_groups_path + '/cluster_groups/'
        func(p + old_name, p + new_name)

        # Update the list of clusterings.
        self._load_clusterings(self._clustering)

        if _to_close:
            self._kwik.close()

    def rename_clustering(self, old_name, new_name):
        """Rename a clustering in the `.kwik` file."""
        logger.debug("Rename clustering %s => %s.", old_name, new_name)
        self._move_clustering(old_name, new_name, copy=False)

    def copy_clustering(self, name, new_name):
        """Copy a clustering in the `.kwik` file."""
        logger.debug("Copy clustering %s => %s.", name, new_name)
        self._move_clustering(name, new_name, copy=True)

    def delete_clustering(self, name):
        """Delete a clustering."""
        if name == self._clustering:
            raise ValueError("You cannot delete the current clustering.")
        if name not in self._clusterings:
            raise ValueError(("The clustering {0} "
                              "doesn't exist.").format(name))

            logger.debug("Delete clustering %s.", name)
        _to_close = self._open_kwik_if_needed(mode='a')

        # /channel_groups/x/spikes/clusters/<name>
        parent = self._kwik.read(self._spikes_path + '/clusters/')
        del parent[name]

        # /channel_groups/x/clusters/<name>
        parent = self._kwik.read(self._clusters_path)
        del parent[name]

        # /channel_groups/x/cluster_groups/<name>
        parent = self._kwik.read(self._channel_groups_path +
                                 '/cluster_groups/')
        del parent[name]

        # Update the list of clusterings.
        self._load_clusterings(self._clustering)

        if _to_close:
            self._kwik.close()

    # Data
    # -------------------------------------------------------------------------

    @property
    def duration(self):
        """Duration of the experiment (in seconds)."""
        if self._traces is None:
            return 0.
        return float(self._traces.shape[0]) / self.sample_rate

    @property
    def channel_group(self):
        return self._channel_group

    @channel_group.setter
    def channel_group(self, value):
        assert isinstance(value, integer_types)
        self._channel_group = value
        self._channel_group_changed(value)

    @property
    def channel_groups(self):
        """List of channel groups found in the Kwik file."""
        return self._channel_groups

    @property
    def n_features_per_channel(self):
        """Number of features per channel (generally 3)."""
        return self._metadata['n_features_per_channel']

    @property
    def channels(self):
        """List of all channels in the current channel group.

        This list comes from the /channel_groups HDF5 group in the Kwik file.

        """
        # TODO: rename to channel_ids?
        return self._channels

    @property
    def channel_order(self):
        """List of kept channels in the current channel group.

        If you want the channels used in the features, masks, and waveforms,
        this is the property you want to use, and not `model.channels`.

        The channel order is the same than the one from the PRB file.
        This order was used when generating the features and masks
        in SpikeDetekt2. The same order is used in klusta when loading the
        waveforms from the traces file(s).

        """
        return self._channel_order

    @property
    def n_channels(self):
        """Number of all channels in the current channel group."""
        return len(self._channels)

    @property
    def recordings(self):
        """List of recording indices found in the Kwik file."""
        return self._recordings

    @property
    def n_recordings(self):
        """Number of recordings found in the Kwik file."""
        return len(self._recordings)

    @property
    def clusterings(self):
        """List of clusterings found in the Kwik file.

        The first one is always `main`.

        """
        return self._clusterings

    @property
    def clustering(self):
        """The currently-active clustering.

        Default is `main`.

        """
        return self._clustering

    @clustering.setter
    def clustering(self, value):
        """Change the currently-active clustering."""
        self._clustering_changed(value)

    @property
    def clustering_metadata(self):
        """A dictionary of key-value metadata specific to the current
        clustering."""
        return self._clustering_metadata

    @property
    def metadata(self):
        """A dictionary holding metadata about the experiment.

        This information comes from the PRM file. It was used by
        SpikeDetekt2 during spike detection.

        """
        return self._metadata

    @property
    def kk2_metadata(self):
        """A dictionary holding KK2 metadata."""
        return self._kk2_metadata

    @property
    def probe(self):
        """A `Probe` instance representing the probe used for the recording.

        This object contains information about the adjacency graph and
        the channel positions.

        """
        return self._probe

    @property
    def channel_positions(self):
        return self.probe.positions

    @property
    def all_traces(self):
        """Raw traces as found in the traces file(s).

        This object is memory-mapped to the HDF5 file, or `.dat` / `.bin` file,
        or both.

        """
        return self._all_traces

    @property
    def traces(self):
        """Like all_traces, but without the dead channels."""
        return self._traces

    @property
    def spike_samples(self):
        """Spike samples from the current channel group.

        This is a NumPy array containing `int64` values (number of samples
        in unit of the sample rate).

        The spike times of all recordings are concatenated. There is no gap
        between consecutive recordings, currently.

        """
        return self._spike_samples

    @property
    def sample_rate(self):
        """Sample rate of the recording.

        This value is found in the metadata coming from the PRM file.

        """
        return float(self._metadata['sample_rate'])

    @property
    def spike_recordings(self):
        """The recording index for each spike.

        This is a NumPy array of integers with `n_spikes` elements.

        """
        return self._spike_recordings

    @property
    def n_spikes(self):
        """Number of spikes in the current channel group."""
        return (len(self._spike_samples)
                if self._spike_samples is not None else 0)

    @property
    def all_features(self):
        """Features from the current channel group.

        This is memory-mapped to the `.kwx` file.

        Note: in general, it is better to use the cluster store to access
        the features and masks of some clusters.

        """
        return self._features

    @property
    def all_masks(self):
        """Masks from the current channel group.

        This is memory-mapped to the `.kwx` file.

        Note: in general, it is better to use the cluster store to access
        the features and masks of some clusters.

        """
        return self._masks

    @property
    def all_features_masks(self):
        """Features-masks from the current channel group.

        This is memory-mapped to the `.kwx` file.

        Note: in general, it is better to use the cluster store to access
        the features and masks of some clusters.

        """
        return self._features_masks

    @property
    def all_waveforms(self):
        """High-passed filtered waveforms from the current channel group.

        This is a virtual array mapped to the traces file(s). Filtering is
        done on the fly.

        The shape is `(n_spikes, n_samples, n_channels)`.

        """
        return SpikeLoader(self._waveform_loader, self.spike_samples)

    @property
    def spike_clusters(self):
        """Spike clusters from the current channel group and clustering.

        Every element is the cluster identifier of a spike.

        The shape is `(n_spikes,)`.

        """
        return self._spike_clusters

    @property
    def spike_times(self):
        """Spike times from the current channel_group.

        This is a NumPy array containing `float64` values (in seconds).

        The spike times of all recordings are concatenated. There is no gap
        between consecutive recordings, currently.

        """
        if self._spike_times is None:
            self._spike_times = (self.spike_samples.astype(np.float64) /
                                 self.sample_rate)
        return self._spike_times

    @property
    def cluster_metadata(self):
        """Metadata about the clusters in the current channel group and
        clustering.

        `cluster_metadata.group(cluster_id)` returns the group of a given
        cluster. The default group is 'unsorted'.

        """
        return self._cluster_metadata

    @property
    def cluster_groups(self):
        """Groups of all clusters in the current channel group and clustering.

        This is a regular Python dictionary.

        """
        return {cluster: self._cluster_metadata[cluster]
                for cluster in self.cluster_ids}

    @property
    def cluster_ids(self):
        """List of cluster ids from the current channel group and clustering.

        This is a sorted list of unique cluster ids as found in the current
        `spike_clusters` array.

        """
        return _unique(self._spike_clusters)

    @property
    def spike_ids(self):
        """List of spike ids."""
        return np.arange(self.n_spikes, dtype=np.int32)

    @property
    def n_clusters(self):
        """Number of clusters in the current channel group and clustering."""
        return len(self.cluster_ids)

    # Close
    # -------------------------------------------------------------------------

    def close(self):
        """Close the `.kwik` and `.kwx` files if they are open, and cleanup
        handles to all raw data files"""

        logger.debug("Closing files")
        del self._features_masks
        for f in self._opened_files:
            # upside-down if statement to avoid false positive lint error
            if not (isinstance(f, np.ndarray)):
                f.close()
            else:
                del f
        self._kwik.close()
