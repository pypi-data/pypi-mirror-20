# -*- coding: utf-8 -*-
################################################################################
#
#  Rattail -- Retail Software Framework
#  Copyright © 2010-2016 Lance Edgar
#
#  This file is part of Rattail.
#
#  Rattail is free software: you can redistribute it and/or modify it under the
#  terms of the GNU Affero General Public License as published by the Free
#  Software Foundation, either version 3 of the License, or (at your option)
#  any later version.
#
#  Rattail is distributed in the hope that it will be useful, but WITHOUT ANY
#  WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
#  FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for
#  more details.
#
#  You should have received a copy of the GNU Affero General Public License
#  along with Rattail.  If not, see <http://www.gnu.org/licenses/>.
#
################################################################################
"""
Tempmon config extension
"""

from __future__ import unicode_literals, absolute_import

from rattail.config import ConfigExtension
from rattail.db.config import get_engines
from rattail_tempmon.db import Session


class TempmonConfigExtension(ConfigExtension):
    """
    Config extension for tempmon; adds tempmon DB engine/Session etc.  Expects
    something like this in your config:

    .. code-block:: ini

       [rattail_tempmon.db]
       default.url = postgresql://localhost/tempmon

    Config object will get two new attributes:

     * ``tempmon_engines``
     * ``tempmon_engine``

    Additionally, :class:`Session` will be configured with the default engine.
    """
    key = 'tempmon'

    def configure(self, config):
        config.tempmon_engines = get_engines(config, section='rattail_tempmon.db')
        config.tempmon_engine = config.tempmon_engines.get('default')
        Session.configure(bind=config.tempmon_engine)
