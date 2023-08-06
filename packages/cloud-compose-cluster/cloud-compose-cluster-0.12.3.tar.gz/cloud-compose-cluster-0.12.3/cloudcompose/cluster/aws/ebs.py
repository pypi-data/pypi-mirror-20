import boto3
import botocore
from cloudcompose.exceptions import CloudComposeException

from retrying import retry
class EBSController:
    def __init__(self, ec2, cluster_name, silent=False):
        self.ec2 = ec2
        self.silent = silent
        self.cluster_name = cluster_name

    def block_device_map(self, volumes, default_device, use_snapshots):
        block_device_map = []
        for volume in volumes:
            file_system = volume.get('file_system')
            if file_system and file_system.lower() in ['nfs', 'nfs4']:
                continue
            block_device_map.append(self._create_volume_config(volume, default_device, use_snapshots))

        return block_device_map

    def find_latest_snapshot(self, device):
        snapshot_names = []
        snapshot_ids = {}
        for snapshot in self._ec2_describe_snapshots(Filters=[{"Name": "status",
                                                               "Values": ["completed"]},
                                                              {"Name": "tag:ClusterName",
                                                               "Values": [self.cluster_name]},
                                                              {"Name": "tag:DeviceName",
                                                               "Values": [device]}]):
            for tag in snapshot["Tags"]:
                if "Name" in tag["Key"]:
                    snapshot_names.append(tag["Value"])
                    snapshot_ids[tag["Value"]] = snapshot["SnapshotId"]

        if len(snapshot_names) == 0:
            return None
        snapshot_names.sort()
        last_snapshot_name = snapshot_names.pop()
        return snapshot_ids[last_snapshot_name]

    def _is_retryable_exception(exception):
        return not isinstance(exception, botocore.exceptions.ClientError)

    @retry(retry_on_exception=_is_retryable_exception, stop_max_delay=10000, wait_exponential_multiplier=500, wait_exponential_max=2000)
    def _ec2_describe_snapshots(self, **kwargs):
        response = self.ec2.describe_snapshots(**kwargs)
        return response.get('Snapshots', [])

    def _create_volume_config(self, volume, default_device, use_snapshots):
        if volume.get('ephemeral', False):
            return self._create_ephemeral_volume_config(volume)
        else:
            return self._create_ebs_volume_config(volume, default_device, use_snapshots)

    def _create_ephemeral_volume_config(self, volume):
        return {
            "DeviceName": volume['block'],
            "VirtualName": volume['name']
        }

    def _create_ebs_volume_config(self, volume, default_device, use_snapshots):
        device = volume.get('block', default_device)
        volume_config = {
            "DeviceName": device,
            "Ebs": {
                "VolumeSize": self._format_size(volume.get("size", "10G")),
                "DeleteOnTermination": volume.get("delete_on_termination", True),
                "VolumeType": volume.get("volume_type", "gp2")
            }
        }

        if volume_config['Ebs']['VolumeType'] == 'io1':
            max_iops = volume_config['Ebs']['VolumeSize']*30
            iops = volume.get("iops", 100)

            if iops > max_iops:
                raise CloudComposeException('Cluster not created\nSpecified IOPS (%s) is greater than the max (%s) with a volume size of %sG' % (iops, max_iops, volume_config['Ebs']['VolumeSize']))

            volume_config['Ebs']['Iops'] = iops

        if use_snapshots:
            self._add_snapshot_id(volume_config, volume, device)

        return volume_config

    def _add_snapshot_id(self, volume_config, volume, device):
        snapshot_id = volume.get('snapshot', None)
        if not snapshot_id:
            snapshot_id = self.find_latest_snapshot(device)
        if snapshot_id:
            volume_config["Ebs"]["SnapshotId"] = snapshot_id
            if 'snapshot' not in volume:
                volume['snapshot'] = snapshot_id
            if not self.silent:
                print "starting cluster from snapshot %s" % snapshot_id

    def _format_size(self, size):
        size_in_gb = 0
        units = size[-1]
        quantity = int(size[0:len(size)-1])

        if units.lower() == 't':
            return quantity * 1000
        elif units.lower() == 'g':
            return quantity
        elif units.lower() == 'm':
            return quantity / 1000

