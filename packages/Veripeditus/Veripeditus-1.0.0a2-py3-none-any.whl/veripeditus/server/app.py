"""
Flask application code for the Veripeditus server

This module contains everything to set up the Flask application.
"""

# veripeditus-server - Server component for the Veripeditus game framework
# Copyright (C) 2016  Dominik George <nik@naturalnet.de>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version, with the Game Cartridge Exception.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

# pragma pylint: disable=wrong-import-position
# pragma pylint: disable=unused-import

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from osmalchemy import OSMAlchemy

# Get a basic Flask application
APP = Flask(__name__)

# Default configuration
# FIXME allow modification after module import
APP.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
APP.config['PASSWORD_SCHEMES'] = ['pbkdf2_sha512', 'md5_crypt']
APP.config['BASIC_REALM'] = "Veripeditus"
APP.config['OSMALCHEMY_ONLINE'] = True
APP.config['ENABLE_CODE_EDITOR'] = False
APP.config['CODE_EDITOR_PATH'] = '/var/lib/veripeditus/editor'

# Load configuration from a list of text files
CFGLIST = ['/var/lib/veripeditus/dbconfig.cfg', '/etc/veripeditus/server.cfg']
for cfg in CFGLIST:
    APP.config.from_pyfile(cfg, silent=True)
