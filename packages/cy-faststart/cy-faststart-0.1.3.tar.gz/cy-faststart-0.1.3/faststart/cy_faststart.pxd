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


cdef class File:
    cdef public stream
    cdef public bint has_tmp
    cdef _tmp

    cpdef void write(self, bytes data)
    cpdef read(self, long length)
    cpdef void seek(self, long pos)
    cpdef long tell(self)
    cpdef void close(self)


cdef class FastStart:
    cdef public stream
    cdef _file
    cdef long _stream_pos
    cdef public long BUFFER_SIZE

    cdef void _check_compressed(self, object moov_atom)
    cdef bint _moov_is_compressed(self, object moov_atom)
    cdef _patch_moov(self, object atom, long offset)
    cdef list _get_indexes_from_chunk(self, chunk, long chunk_size)
    cdef list get_indexes(self, stream)
    cdef Atom read_atom(self, chunk, long padding=*)
