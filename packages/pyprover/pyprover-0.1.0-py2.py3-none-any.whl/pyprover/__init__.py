#!/usr/bin/env python
# -*- coding: utf-8 -*-
# __coconut_hash__ = 0xec24cbdd

# Compiled with Coconut version 1.2.2-post_dev4 [Colonel]

# Coconut Header: --------------------------------------------------------

from __future__ import print_function, absolute_import, unicode_literals, division

import sys as _coconut_sys, os.path as _coconut_os_path
_coconut_file_path = _coconut_os_path.dirname(_coconut_os_path.abspath(__file__))
_coconut_sys.path.insert(0, _coconut_file_path)
from __coconut__ import _coconut, _coconut_MatchError, _coconut_tail_call, _coconut_tco, _coconut_igetitem, _coconut_compose, _coconut_pipe, _coconut_starpipe, _coconut_backpipe, _coconut_backstarpipe, _coconut_bool_and, _coconut_bool_or, _coconut_minus, _coconut_tee, _coconut_map, _coconut_partial
from __coconut__ import *
_coconut_sys.path.remove(_coconut_file_path)

# Compiled Coconut: ------------------------------------------------------

# Imports:

from pyprover.logic import ForAll
from pyprover.logic import Exists
from pyprover.logic import A
from pyprover.logic import E
from pyprover.logic import top
from pyprover.logic import bot
from pyprover.logic import true
from pyprover.logic import false
from pyprover.tools import propositions
from pyprover.tools import terms
from pyprover.tools import solve
from pyprover.tools import proves
from pyprover.tools import iff
from pyprover.tools import simplify
from pyprover.tools import simplest_form
from pyprover.tools import simplest_solution
from pyprover.tools import sub_in
from pyprover.atoms import LowercasePropositions
from pyprover.atoms import UppercasePropositions
from pyprover.atoms import LowercaseVariables
from pyprover.atoms import UppercaseVariables
from pyprover.atoms import StandardMath

# Main:

StandardMath.use(globals())
