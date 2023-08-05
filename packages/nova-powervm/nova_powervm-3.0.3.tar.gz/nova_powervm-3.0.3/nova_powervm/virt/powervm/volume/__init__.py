# Copyright 2015, 2016 IBM Corp.
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

from oslo_concurrency import lockutils
from pypowervm.tasks import hdisk
from pypowervm.tasks import partition
from pypowervm.wrappers import virtual_io_server as pvm_vios

# Defines the various volume connectors that can be used.
from nova_powervm import conf as cfg

CONF = cfg.CONF

FC_STRATEGY_MAPPING = {
    'npiv': CONF.powervm.fc_npiv_adapter_api,
    'vscsi': CONF.powervm.fc_vscsi_adapter_api
}
NETWORK_STRATEGY_MAPPING = {
    'iscsi': 'nova_powervm.virt.powervm.volume.iscsi.IscsiVolumeAdapter'
}

_ISCSI_INITIATOR = None
_ISCSI_LOOKUP_COMPLETE = False


@lockutils.synchronized("PowerVM_iSCSI_Initiator_Lookup")
def get_iscsi_initiator(adapter):
    """Gets the iSCSI initiator.

    This is looked up once at process start up.  Stored in memory thereafter.

    :param adapter: The pypowervm adapter.
    :return: The initiator name.  If the NovaLink is not capable of supporting
             iSCSI, None will be returned.
    """
    global _ISCSI_INITIATOR, _ISCSI_LOOKUP_COMPLETE
    if not _ISCSI_LOOKUP_COMPLETE:
        mgmt_w = partition.get_mgmt_partition(adapter)
        if isinstance(mgmt_w, pvm_vios.VIOS):
            _ISCSI_INITIATOR = hdisk.discover_iscsi_initiator(
                adapter, mgmt_w.uuid)

    _ISCSI_LOOKUP_COMPLETE = True
    return _ISCSI_INITIATOR
