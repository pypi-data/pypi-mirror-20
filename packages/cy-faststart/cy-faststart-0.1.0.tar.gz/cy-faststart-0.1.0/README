# cy-faststart
## A faststart implementation written in Cython for re-indexing the MOOV atom from the end of MPEG-4 movie files to the beginning


### Usage from a file
```python
from faststart import FastStart

fs = FastStart(buffer_size=50 * 1024 * 1024)

with open('some-output-file.mp4', 'w') as out:
  for chunk in fs.from_file('some-input-file.mp4'):
    out.write(chunk)
```


### Usage from a byte-stream
```python
from faststart import FastStart

fs = FastStart(buffer_size=50 * 1024 * 1024)

with open('some-input-file', 'rb') as f:
  with open('some-output-file.mp4', 'w') as out:
    for chunk in fs.from_stream(f):
      out.write(chunk)
```
