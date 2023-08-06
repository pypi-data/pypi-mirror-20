# Implements a few sources for

import csv
from json import JSONDecoder
from functools import partial

import apache_beam as beam
from apache_beam import coders
from apache_beam.io import fileio

__all__ = ['JsonLinesFileSource', 'CsvFileSource']


class JsonLinesFileSource(beam.io.filebasedsource.FileBasedSource):

  DEFAULT_READ_BUFFER_SIZE = 8192

  def __init__(self, file_pattern,
               compression_type=fileio.CompressionTypes.AUTO,
               coder=coders.StrUtf8Coder(),
               validate=True, buffer_size=DEFAULT_READ_BUFFER_SIZE):
    """ Initialize a JsonLinesFileSource.
    """

    super(self.__class__, self).__init__(file_pattern, min_bundle_size=0,
                                         compression_type=compression_type,
                                         validate=validate,
                                         splittable=False)

    self._coder = coder
    self._buffer_size = buffer_size

  def read_records(self, file_name, range_tracker):
    self._file = self.open_file(file_name)

    for rec in self._json_parse(self._file):
      yield rec

  # Routine from:
  # stackoverflow/questions/21708192/how-do-i-use-the-json-module-to-read-in-one-json-object-at-a-time/
  def _json_parse(self, fileobj, decoder=JSONDecoder()):
    buffer = None
    for chunk in iter(partial(fileobj.read, self._buffer_size), ''):
      chunk = self._coder.decode(chunk)
      buffer = buffer + chunk if buffer else chunk
      while buffer:
        try:
          result, index = decoder.raw_decode(buffer)
          buffer = buffer[index:].lstrip() # Stripping new lines
          yield result
        except ValueError:
          # Not enough data to decode, read more
          break


class CsvFileSource(beam.io.filebasedsource.FileBasedSource):
  """ A source for a GCS or local comma-separated-file

  Parses a text file assuming newline-delimited lines,
  and comma-delimited fields. Assumes UTF-8 encoding.
  """

  def __init__(self, *args, **kwargs):
    """ Initialize a CSVFileSource.

    Args:
      delimiter: The delimiter character in the CSV file.
      header: Whether the input file has a header or not.
        Default: True
      dictionary_output: The kind of records that the CsvFileSource should output.
        If True, then it will output dict()'s, if False it will output list()'s.
        Default: True

    Raises:
      ValueError: If the input arguments are not consistent.
    """
    self.delimiter = kwargs.pop('delimiter',',')
    self.header = kwargs.pop('header',True)
    self.dictionary_output = kwargs.pop('dictionary_output', True)
    # Can't just split anywhere
    kwargs['splittable'] = False
    super(self.__class__, self).__init__(*args, **kwargs)

    if not self.header and dictionary_output:
      raise ValueError(
          'a header is required for the CSV reader to provide dictionary output')

  def read_records(self, file_name, range_tracker):
    # If a multi-file pattern was specified as a source then make sure the
    # start/end offsets use the default values for reading the entire file.
    headers = None
    self._file = self.open_file(file_name)

    reader = csv.reader(self._file)

    for i, rec in enumerate(reader):
      if (self.header or self.dictionary_output) and i == 0:
        headers = rec
        continue

      if self.dictionary_output:
        res = {header:val for header, val in zip(headers,rec)}
      else:
        res = rec
      yield res
