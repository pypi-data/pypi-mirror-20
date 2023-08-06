"""
Copyright (c) 2014 Maciej Nabozny

This file is part of CloudOver project.

CloudOver is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""

import pycore.extensions.vpn.models.vpn
from pycore.utils import request, calc_hash

class Api():
    def __init__(self, parent_model):
        self.parent_model = parent_model

    def network_by_id(self, id):
        vm = request(self.oc_address, '/api/vpn/get_by_id/', {'token': self.token,
                                                              'network_id': id}, self.debug)
        return pycore.extensions.vpn.models.vpn.VPN(self.oc_address, self.token, vm, self.debug)


    def get_list(self):
        resp = request(self.parent_model.oc_address, '/api/vpn/get_list/', {'token': self.parent_model.token})
        return [pycore.extensions.vpn.models.vpn.VPN(self.parent_model.oc_address, self.parent_model.token, vpn) for vpn in resp]


    def create(self, name):
        resp = request(self.parent_model.oc_address, '/api/vpn/create/', {'token': self.parent_model.token,
                                                                          'name': name})
        return pycore.extensions.vpn.models.vpn.VPN(self.parent_model.oc_address, self.parent_model.token, resp)