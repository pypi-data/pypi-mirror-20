r"""Genetic-related tools for Limix..

.. moduleauthor:: Danilo Horta <horta@ebi.ac.uk>

"""

from __future__ import absolute_import as _
from __future__ import unicode_literals as _

from pkg_resources import get_distribution as _get_distribution
from pkg_resources import DistributionNotFound as _DistributionNotFound

try:
    __version__ = _get_distribution('limix_genetics').version
except _DistributionNotFound:
    __version__ = 'unknown'

from ._core import maf
from ._qqplot import qqplot
from ._powerplot import hitsplot
from ._mvnorm import mvn_ecdf
from ._mvnorm import mvn_eicdf

def test():
    r"""Tests this packages."""
    import os
    p = __import__('limix_genetics').__path__[0]
    src_path = os.path.abspath(p)
    old_path = os.getcwd()
    os.chdir(src_path)

    try:
        return_code = __import__('pytest').main(['-q'])
    finally:
        os.chdir(old_path)

    if return_code == 0:
        print("Congratulations. All tests have passed!")

    return return_code

__all__ = ['__version__', 'maf', 'qqplot', 'hitsplot']
