#!/usr/bin/env python
# coding: utf-8

from __future__ import (
    absolute_import,
    unicode_literals,
)


__author__ = "althonos"
__author_email__ = "martin.larralde@ens-cachan.fr"
__version__ = "0.7.1"


try:
    from .__main__ import main
    from .core import InstaLooter
except ImportError:
    pass
