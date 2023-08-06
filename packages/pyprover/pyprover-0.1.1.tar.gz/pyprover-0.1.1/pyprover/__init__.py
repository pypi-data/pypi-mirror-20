#!/usr/bin/env python
# -*- coding: utf-8 -*-
# __coconut_hash__ = 0x8e4d8d5a

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

from pyprover.logic import ForAll  # line 2
from pyprover.logic import Exists  # line 2
from pyprover.logic import FA  # line 2
from pyprover.logic import TE  # line 2
from pyprover.logic import top  # line 2
from pyprover.logic import bot  # line 2
from pyprover.logic import true  # line 2
from pyprover.logic import false  # line 3
from pyprover.tools import propositions  # line 4
from pyprover.tools import terms  # line 4
from pyprover.tools import solve  # line 4
from pyprover.tools import proves  # line 4
from pyprover.tools import iff  # line 4
from pyprover.tools import simplify  # line 4
from pyprover.tools import simplest_form  # line 4
from pyprover.tools import simplest_solution  # line 4
from pyprover.tools import sub_in  # line 13
from pyprover.atoms import LowercasePropositions  # line 14
from pyprover.atoms import UppercasePropositions  # line 14
from pyprover.atoms import LowercaseVariables  # line 14
from pyprover.atoms import UppercaseVariables  # line 14
from pyprover.atoms import StandardMath  # line 24

# Main:

StandardMath.use(globals())  # line 34
