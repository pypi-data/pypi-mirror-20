import cython
import numpy as np
cimport numpy as np
from mpi4py import MPI

from libc.stdlib cimport malloc, free
from libcpp cimport bool as cbool
from cpython cimport bool as pybool

from libc.stdint cimport uint32_t, uint64_t, int32_t, int64_t

cdef class PyParallelKDTree:
    r"""Object for constructing a KDTree in parallel.

    """
    cdef int rank
    cdef int size
    cdef cbool *_periodic
    cdef ParallelKDTree *_tree
    cdef object _idx

    def __cinit__(self, np.ndarray[double, ndim=2] pts = None,
                  np.ndarray[double, ndim=1] left_edge = None,
                  np.ndarray[double, ndim=1] right_edge = None,
                  object periodic = False, int leafsize = 10000,
                  int nleaves = 0):
        cdef object comm = MPI.COMM_WORLD
        self.size = comm.Get_size()
        self.rank = comm.Get_rank()
        cdef np.uint32_t ndim = 0
        cdef np.uint64_t npts = 0
        cdef double *ptr_pts = NULL
        cdef double *ptr_le = NULL
        cdef double *ptr_re = NULL
        cdef cbool *ptr_periodic = NULL
        cdef uint32_t i
        if self.rank == 0:
            ndim = pts.shape[1]
            npts = pts.shape[0]
            ptr_pts = &pts[0,0]
            if nleaves > 0:
                nleaves = <int>(2**np.ceil(np.log2(<float>nleaves)))
                leafsize = npts/nleaves + 1
            if (leafsize < 2):
                # This is here to prevent segfault. The cpp code needs modified
                # to support leafsize = 1
                raise ValueError("'leafsize' cannot be smaller than 2.")
            if left_edge is None:
                left_edge = np.min(pts, axis=0)
            if right_edge is None:
                right_edge = np.max(pts, axis=0)
            assert(left_edge.size == ndim)
            assert(right_edge.size == ndim)
            ptr_le = &left_edge[0]
            ptr_re = &right_edge[0]
            ptr_periodic = <cbool *>malloc(ndim*sizeof(cbool));
            if isinstance(periodic, pybool):
                for i in range(ndim):
                    ptr_periodic[i] = <cbool>periodic
            else:
                for i in range(ndim):
                    ptr_periodic[i] = <cbool>periodic[i]
        else:
            assert(pts == None)
        cdef np.ndarray[np.uint64_t] idx = np.arange(npts).astype('uint64')
        with nogil, cython.boundscheck(False), cython.wraparound(False):
            self._tree = new ParallelKDTree(ptr_pts, &idx[0], npts, ndim,
                                            leafsize, ptr_le, ptr_re,
                                            ptr_periodic)
        self._periodic = ptr_periodic
        self._idx = idx

    def __dealloc__(self):
        if self.rank == 0:
            free(self._periodic)
        free(self._tree)

    def build(self, pybool include_self = False):
        cdef cbool c_is = <cbool>include_self
        with nogil, cython.boundscheck(False), cython.wraparound(False):
            self._tree.build(c_is)
