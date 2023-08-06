import os
import sys
import struct
import humanfriendly
import tempfile
import io

from faststart.exceptions import AlreadyMoved, FileIsCorrupt, \
                                 FileIsUnsupported, FastStartError


REQUIRED_ATOMS = {b'moov', b'mdat'}
ATOMS = {b'ftyp', b'moov', b'moof', b'mdat', b'free', b'fourcc', b'mfra'}
CHILD_ANCESTORS = {b"trak", b"mdia", b"minf", b"stbl"}
DESIRED_CHILDREN = {b"stco", b"co64"}
ATOM_WHITELIST = {b'ftyp'}
ATOM_BLACKLIST = {b"ftyp", b"moov", b"free"}


cdef class File:

    def __cinit__(self, stream):
        self.stream = stream
        if hasattr(self.stream, 'seek') and hasattr(self.stream, 'tell'):
            self._tmp = None
            self.has_tmp = False
        else:
            self._tmp = tempfile.TemporaryFile()
            self.has_tmp = True

    def __enter__(self):
        pass

    def __exit__(self, type, value, traceback):
        if self.has_tmp is True:
            self._tmp.close()

    cpdef void write(self, bytes data):
        if self.has_tmp is False:
            return
        self._tmp.write(data)

    cpdef bytes read(self, long length):
        return self._tmp.read(length) if self.has_tmp is True else\
               self.stream.read(length)

    cpdef void seek(self, long pos):
        self._tmp.seek(pos) if self.has_tmp is True else self.stream.seek(pos)

    cpdef long tell(self):
        return self._tmp.tell() if self.has_tmp is True else self.stream.tell()

    cpdef void close(self):
        if self.has_tmp:
            self.tmp.close()


cdef class FastStart:
    """ Usage
        ~~~~~
        from faststart import FastStart

        fs = FastStart(buffer_size=50 * 1024 * 1024)

        with open('some-output-file.mp4', 'w') as out:
          for chunk in fs.from_file('some-input-file.mp4'):
            out.write(chunk)
    """
    def __cinit__(self, long buffer_size=50 * 1024 * 1024):
        """ @buffer_size: (#int) size of each stream chunk in bytes, defaults
                to 50M. The buffer size also must be a multiple of 16.
        """
        self.reset()
        self.BUFFER_SIZE = buffer_size
        if buffer_size < 16 or \
           float(buffer_size / 16) != float(buffer_size // 16):
            raise FastStartError('Buffer size must be at least 16 bytes and '
                                 'must be a multiple of 16. The recommended '
                                 'size is at least 10M.')

    def __repr__(self):
        return '<FastStart: -buffer_size=%s>' % \
               humanfriendly.format_size(self.BUFFER_SIZE)

    def reset(self, stream=None):
        self.stream = stream
        self._stream_pos = 0
        self._file = File(self.stream)

    cdef list get_indexes(self, stream):
        cdef long CHUNK_SIZE = -1
        cdef long SKIP_TO = 0
        cdef set top_level_atoms = set()
        cdef long chunk_skip_to
        cdef bytes chk
        cdef list indexes = []
        add_index = indexes.append

        while CHUNK_SIZE:
            # Read the chunk from the stream
            if SKIP_TO and self._file.has_tmp is False:
                self._stream_pos = SKIP_TO
                self._file.seek(SKIP_TO)
                chk = self._file.read(self.BUFFER_SIZE)
            else:
                chk = self.stream.read(self.BUFFER_SIZE)
                # Write the chunk to cached data, necessary for seeking outside
                # of the stream (which may or may not be seekable)
                self._file.write(chk)

            # Skip bytes we don't need to process because we know they are part
            # of existing atoms
            chunk_skip_to = 0
            if self._file.tell() < SKIP_TO:
                self._stream_pos = self._file.tell()
                continue
            else:
                chunk_skip_to = SKIP_TO - self._stream_pos

            # Write chunk to io.BytesIO object so it is guaranteed to be
            # seekable
            CHUNK_SIZE = len(chk)
            CHUNK = io.BytesIO(chk)
            # Patch bytes in order to make sure we have at least 16 to pass to
            # the index finder
            if 0 < chunk_skip_to < 16:
                chk = self.stream.read(16 - chunk_skip_to)
                CHUNK.seek(0, os.SEEK_END)
                CHUNK.write(chk)
                CHUNK_SIZE += len(chk)
                self._file.write(chk)
            # Seek the chunk to its proper starting point, that is, where the
            # next atom is supposed to begin
            CHUNK.seek(chunk_skip_to)

            # Find the indexes within this chunk
            for atom in self._get_indexes_from_chunk(CHUNK, CHUNK_SIZE):
                add_index(atom)
                SKIP_TO = atom['position'] + atom['size']

            self._stream_pos = self._file.tell()
            # Quit searching if we've already found the indexes that we care
            # about.
            top_level_atoms = set(atom['name'] for atom in indexes)

            if REQUIRED_ATOMS.issuperset(top_level_atoms) or \
               top_level_atoms.issuperset(REQUIRED_ATOMS):
                break
            elif not bool(ATOMS & top_level_atoms) and \
                 self._stream_pos >= 5 * 1024 * 1024:
                raise FileIsUnsupported('This file does not appear to be '
                                        'atom-based.')

        if not REQUIRED_ATOMS.issubset(top_level_atoms):
            raise FileIsCorrupt("A required atom was not found.")

        return indexes

    cdef list _get_indexes_from_chunk(self, chunk, long chunk_size):
        """ Yields an index of top level atoms, their absolute byte-position in
            the file and their size
        """
        cdef Atom atom
        cdef long skip_to
        cdef long chunk_end
        cdef bytes stream
        cdef list atoms = []
        add_atom = atoms.append

        while(chunk):
            try:
                # Reads the next atom in the chunk
                atom = self.read_atom(chunk, self._stream_pos)
            except struct.error as e:
                break

            if atom.size == 0:
                if atom.name == b"mdat":
                    # Some files may end in mdat with no size set, which
                    # generally means to seek to the end of the file
                    break
                else:
                    # Not necessarily malformed nor signaling anything,
                    # so just continue
                    continue
            # The next top-level atom will be found immediately after the end
            # of this atom, so that's where we will skip to
            skip_to = atom.position + atom.size
            chunk_end = self._stream_pos + chunk_size
            # Yield the newly discovered atom
            add_atom(atom)

            # If the next atom position is available within this chunk,
            # find it, otherwise break the loop and move on to the next chunk
            if skip_to < chunk_end:
                # We need at least 16 available bytes to unpack properly
                # so we fetch any extras we need from the stream
                if chunk_end - skip_to < 16:
                    # Read the required bytes from the stream
                    stream = self.stream.read(chunk_end - skip_to)
                    # Write the new bytes to the chunk AND the cached data
                    chunk.seek(0, os.SEEK_END)
                    chunk.write(stream)
                    self._file.write(stream)
                # Seek the chunk to the next atom location
                chunk.seek(skip_to - self._stream_pos)
            else:
                break

        return atoms

    cdef Atom read_atom(self, chunk, long padding=0):
        """ Read an atom and return a tuple of (size, type) where size is the
            size in bytes (including the 8 bytes already read) and type is a
            "fourcc" like "ftyp" or "moov".
        """
        pos = chunk.tell()
        read = chunk.read(8)

        cdef long atom_size
        cdef bytes atom_type

        atom_size, atom_type = struct.unpack(">L4s", read)

        cdef Atom atom
        atom.name = atom_type
        atom.position = padding + pos
        atom.size = atom_size

        if atom.size == 1:
            atom.size = struct.unpack(">Q", chunk.read(8))[0]

        return atom

    cdef void _check_compressed(self, object moov_atom):
        cdef bint is_compressed = self._moov_is_compressed(moov_atom)
        if is_compressed:
            raise FileIsUnsupported("Files with compressed headers are not "
                                    "supported")

    cdef bint _moov_is_compressed(self, object moov_atom):
        """ Scan the atoms under the moov atom and detect whether or not the
            atom data is compressed.
        """
        # Seek to the beginning of the moov atom contents (8 skips the atom
        # type identifier)
        self._file.seek(moov_atom['position'] + 8)

        # Step through the moov atom children to see if a cmov atom is
        # among them
        cdef long stop = moov_atom['position'] + moov_atom['size']
        cdef Atom child_atom

        while self._file.tell() < stop:
            child_atom = self.read_atom(self._file)
            self._file.seek(self._file.tell() + child_atom.size - 8)
            # cmov means there is a compressed moov header
            if child_atom.name == b'cmov':
                return True

        return False

    cdef _patch_moov(self, object atom, long offset):
        # Seek to the beginning of the moov atom within the cache
        self._file.seek(atom['position'])
        # Wrap the moov in BytesIO for independent seeking
        moov = io.BytesIO(self._file.read(atom['size']))

        # reload the atom from the fixed stream
        atom = self.read_atom(moov)

        cdef str ctype
        cdef long csize
        cdef long entry_count
        cdef str struct_fmt
        cdef tuple entries
        cdef list offset_entries
        cdef long entries_pos

        for atom in self._find_atoms_ex(atom, moov):
            # Read either 32-bit or 64-bit offsets
            ctype, csize = ('L', 4) if atom['name'] == b'stco' else ('Q', 8)

            # Get number of entries
            version, entry_count = struct.unpack(">2L", moov.read(8))
            entries_pos = moov.tell()
            struct_fmt = ">%s%s" % (entry_count, ctype)

            # Read entries
            entries = struct.unpack(struct_fmt, moov.read(csize * entry_count))

            # Patch and write entries
            offset_entries = []
            add_entry = offset_entries.append

            for entry in entries:
              add_entry(entry + offset)
            # offset_entries = map(lambda entry: entry + offset, entries)
            moov.seek(entries_pos)
            moov.write(struct.pack(struct_fmt, *offset_entries))

        return moov

    def _find_atoms_ex(self, parent_atom, datastream):
        """Yield either "stco" or "co64" Atoms from datastream.
            datastream will be 8 bytes into the stco or co64 atom when the value
            is yielded.

            It is assumed that datastream will be at the end of the atom after
            the value has been yielded and processed.

            parent_atom is the parent atom, a 'moov' or other ancestor of CO
            atoms in the datastream.
        """
        cdef long stop = parent_atom['position'] + parent_atom['size']

        while datastream.tell() < stop:
            try:
                atom = self.read_atom(datastream)
            except:
                raise FileIsCorrupt("Error reading next atom!")

            if atom.name in CHILD_ANCESTORS:
                # Known ancestor atom of stco or co64, search within it
                for res in self._find_atoms_ex(atom, datastream):
                    yield res
            elif atom.name in DESIRED_CHILDREN:
                yield atom
            else:
                # Ignore this atom, seek to the end of it.
                datastream.seek(atom.position + atom.size)

    def iter_stream(self):
        cdef long CHUNK_SIZE = -1
        cdef bytes chk

        while CHUNK_SIZE:
            chk = self.stream.read(self.BUFFER_SIZE)
            CHUNK_SIZE = len(chk)

            if CHUNK_SIZE:
                yield chk

    def iter_atom_data(self, indexes, blacklist=None, whitelist=None):
        blacklist = set(blacklist or {})
        whitelist = set(whitelist or {})

        if len(blacklist):
            filter_ = lambda x: x['name'] not in blacklist
        else:
            filter_ = lambda x: x['name'] in whitelist

        cdef long chunk_size
        cdef bytes chunk

        for atom in filter(filter_, indexes):
            self._file.seek(atom['position'])
            chunk_size = atom['size'] if atom['size'] < self.BUFFER_SIZE else\
                         self.BUFFER_SIZE

            while(chunk_size):
                chunk = self._file.read(chunk_size)
                chunk_size = len(chunk)
                yield chunk

    def from_file(self, input_file):
        """ @input_file: (#str) the input filename relative to the current
                working directory

            -> (#bytes) yields new file data
        """
        with open(humanfriendly.parse_path(input_file), 'rb') as f:
            for output in self.from_stream(f):
                yield output

    def from_stream(self, stream):
        """ @stream: An object with a 'read' attribute which returns a
                bytes-like object, 'seek' is NOT required

            -> (#bytes) yields new file data
        """
        # TODO: Only cache files which aren't seekable in a TemporaryFile
        self.reset(stream)
        indexes = self.get_indexes(stream)

        cdef long mdat_pos = -1
        cdef long free_size = 0
        cdef object moov_atom

        for atom in indexes:
            if atom['name'] == b"moov":
                moov_atom = atom
                # If we haven't read the full atom yet, do so
                if atom['size'] + atom['position'] > self._stream_pos:
                    stream = self.stream.read(atom['size'] + atom['position'] -
                                              self._stream_pos)
                    self._file.write(stream)
                    self._stream_pos = self._file.tell()
            elif atom['name'] == b"mdat":
                mdat_pos = atom['position']
            elif atom['name'] == b"free" and \
                 (mdat_pos == -1 or atom['position'] < mdat_pos):
                # This free atom is before the mdat!
                free_size += atom['size']
            elif atom['name'] == b"\x00\x00\x00\x00" and \
                 atom['position'] < mdat_pos:
                # This is some strange zero atom with incorrect size
                free_size += 8

        # Offset to shift positions
        cdef long offset =- free_size

        if moov_atom['position'] > mdat_pos:
            # moov is in the wrong place, shift by moov size
            offset += moov_atom['size']

        if offset <= 0:
            # No free atoms to process and moov is correct, we are done so
            # just yield the file contents
            self._file.seek(0)
            yield self._file.read()
            # Yield the rest of the stream
            for data in self.iter_stream():
                yield data
        else:
            # Check for compressed moov atom
            self._check_compressed(moov_atom)

            # Yield ftype
            for data in self.iter_atom_data(indexes, whitelist=ATOM_WHITELIST):
                yield data

            # Read and fix moov
            moov = self._patch_moov(moov_atom, offset)

            # Yield the moov
            yield moov.getvalue()

            # Yield the rest of the atoms
            for data in self.iter_atom_data(indexes, blacklist=ATOM_BLACKLIST):
                yield data

            # Yield the rest of the stream
            for data in self.iter_stream():
                yield data

        self._file.close()
