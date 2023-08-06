from cnamedtuple import namedtuple
import io


cdef set REQUIRED_ATOMS
cdef set ATOMS
cdef set CHILD_ANCESTORS
cdef set DESIRED_CHILDREN
cdef set ATOM_WHITELIST
cdef set ATOM_BLACKLIST


# Atom storage namedtuple
cdef struct s_Atom:
    char * name
    long position
    long size

ctypedef s_Atom Atom


cdef class FastStart:
    cdef public stream
    cdef _cache
    cdef long _stream_pos
    cdef public long BUFFER_SIZE

    cdef void _check_compressed(self, object moov_atom)
    cdef bint _moov_is_compressed(self, object moov_atom)
    cpdef _patch_moov(self, object atom, long offset)
    cpdef Atom read_atom(self, chunk, int padding=*)
