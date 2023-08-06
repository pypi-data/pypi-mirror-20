from . import tabio
from .cnary import CopyNumArray as _CNA
from .commands import *
from .diagram import create_diagram as do_diagram
from ._version import __version__

def read(fname):
    """Parse a file as a copy number or copy ratio table (.cnn, .cnr)."""
    return tabio.read(fname, into=_CNA)
