# -*- coding: utf-8 -*-
"""
Provide first level access to the application.

>>> anchorman.annotate(...) instead of anchorman.main.annotate(...)
"""
from anchorman.main import (annotate, clean)
from anchorman.settings import get_config

__all__ = [
    'annotate',
    'clean',
    'get_config'
]
