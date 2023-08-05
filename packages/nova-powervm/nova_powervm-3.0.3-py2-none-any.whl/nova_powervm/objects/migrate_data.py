# Copyright 2016 IBM Corp.
#
# All Rights Reserved.
#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.


from nova.objects import base as obj_base
from nova.objects import fields
from nova.objects import migrate_data


@obj_base.NovaObjectRegistry.register
class PowerVMLiveMigrateData(migrate_data.LiveMigrateData):
    # Version 1.0: Initial version
    # Version 1.1: Added the Virtual Ethernet Adapter VLAN mappings.
    VERSION = '1.1'

    fields = {
        'host_mig_data': fields.DictOfNullableStringsField(),
        'dest_ip': fields.StringField(),
        'dest_user_id': fields.StringField(),
        'dest_sys_name': fields.StringField(),
        'public_key': fields.StringField(),
        'dest_proc_compat': fields.StringField(),
        'vol_data': fields.DictOfNullableStringsField(),
        'vea_vlan_mappings': fields.DictOfNullableStringsField(),
    }
