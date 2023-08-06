from __future__ import unicode_literals

from celery import chain

from nodeconductor.core import executors as core_executors, tasks as core_tasks, utils as core_utils
from nodeconductor_openstack.openstack import tasks as openstack_tasks

from . import tasks, models


class VolumeCreateExecutor(core_executors.CreateExecutor):

    @classmethod
    def get_task_signature(cls, volume, serialized_volume, **kwargs):
        return chain(
            tasks.ThrottleProvisionTask().si(
                serialized_volume,
                'create_volume',
                state_transition='begin_creating'
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='available',
                erred_state='error',
            ).set(countdown=30)
        )


class VolumeUpdateExecutor(core_executors.UpdateExecutor):

    @classmethod
    def get_task_signature(cls, volume, serialized_volume, **kwargs):
        updated_fields = kwargs['updated_fields']
        if 'name' in updated_fields or 'description' in updated_fields:
            return core_tasks.BackendMethodTask().si(
                serialized_volume, 'update_volume', state_transition='begin_updating')
        else:
            return core_tasks.StateTransitionTask().si(serialized_volume, state_transition='begin_updating')


class VolumeDeleteExecutor(core_executors.DeleteExecutor):

    @classmethod
    def get_task_signature(cls, volume, serialized_volume, **kwargs):
        if volume.backend_id:
            return chain(
                core_tasks.BackendMethodTask().si(
                    serialized_volume, 'delete_volume', state_transition='begin_deleting'),
                openstack_tasks.PollBackendCheckTask().si(serialized_volume, 'is_volume_deleted'),
            )
        else:
            return core_tasks.StateTransitionTask().si(serialized_volume, state_transition='begin_deleting')


class VolumePullExecutor(core_executors.ActionExecutor):
    action = 'Pull'

    @classmethod
    def get_task_signature(cls, volume, serialized_volume, **kwargs):
        return core_tasks.BackendMethodTask().si(
            serialized_volume, 'pull_volume',
            state_transition='begin_updating')


class VolumeExtendExecutor(core_executors.ActionExecutor):
    action = 'Extend'

    @classmethod
    def get_action_details(cls, volume, **kwargs):
        return {
            'message': 'Extend volume from %s MB to %s MB' % (kwargs.get('old_size'), volume.size),
            'old_size': kwargs.get('old_size'),
            'new_size': volume.size,
        }

    @classmethod
    def pre_apply(cls, volume, **kwargs):
        super(VolumeExtendExecutor, cls).pre_apply(volume, **kwargs)
        if volume.instance is not None:
            volume.instance.action = 'Extend volume'
            volume.instance.schedule_updating()
            volume.instance.save()

    @classmethod
    def get_task_signature(cls, volume, serialized_volume, **kwargs):
        if volume.instance is None:
            return chain(
                core_tasks.BackendMethodTask().si(
                    serialized_volume,
                    backend_method='extend_volume',
                    state_transition='begin_updating',
                ),
                tasks.PollRuntimeStateTask().si(
                    serialized_volume,
                    backend_pull_method='pull_volume_runtime_state',
                    success_state='available',
                    erred_state='error'
                )
            )

        return chain(
            core_tasks.StateTransitionTask().si(
                core_utils.serialize_instance(volume.instance),
                state_transition='begin_updating'
            ),
            core_tasks.BackendMethodTask().si(
                serialized_volume,
                backend_method='detach_volume',
                state_transition='begin_updating'
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='available',
                erred_state='error'
            ),
            core_tasks.BackendMethodTask().si(
                serialized_volume,
                backend_method='extend_volume',
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='available',
                erred_state='error'
            ),
            core_tasks.BackendMethodTask().si(
                serialized_volume,
                instance_uuid=volume.instance.uuid.hex,
                device=volume.device,
                backend_method='attach_volume',
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='in-use',
                erred_state='error'
            ),
        )

    @classmethod
    def get_success_signature(cls, volume, serialized_volume, **kwargs):
        if volume.instance is None:
            return super(VolumeExtendExecutor, cls).get_success_signature(volume, serialized_volume, **kwargs)
        else:
            instance = volume.instance
            serialized_instance = core_utils.serialize_instance(instance)
            return chain(
                super(VolumeExtendExecutor, cls).get_success_signature(volume, serialized_volume, **kwargs),
                super(VolumeExtendExecutor, cls).get_success_signature(instance, serialized_instance, **kwargs),
            )

    @classmethod
    def get_failure_signature(cls, volume, serialized_volume, **kwargs):
        return tasks.VolumeExtendErredTask().s(serialized_volume)


class VolumeAttachExecutor(core_executors.ActionExecutor):
    action = 'Attach'

    @classmethod
    def get_action_details(cls, volume, **kwargs):
        return {'message': 'Attach volume to instance %s' % volume.instance.name}

    @classmethod
    def get_task_signature(cls, volume, serialized_volume, **kwargs):
        return chain(
            core_tasks.BackendMethodTask().si(
                serialized_volume,
                instance_uuid=volume.instance.uuid.hex,
                device=volume.device,
                backend_method='attach_volume',
                state_transition='begin_updating'
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='in-use',
                erred_state='error',
            ),
            # additional pull to populate field "device".
            core_tasks.BackendMethodTask().si(serialized_volume, backend_method='pull_volume'),
        )


class VolumeDetachExecutor(core_executors.ActionExecutor):
    action = 'Detach'

    @classmethod
    def get_action_details(cls, volume, **kwargs):
        return {'message': 'Detach volume from instance %s' % volume.instance.name}

    @classmethod
    def get_task_signature(cls, volume, serialized_volume, **kwargs):
        return chain(
            core_tasks.BackendMethodTask().si(
                serialized_volume, backend_method='detach_volume', state_transition='begin_updating'),
            tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='available',
                erred_state='error',
            )
        )


class SnapshotCreateExecutor(core_executors.CreateExecutor):

    @classmethod
    def get_task_signature(cls, snapshot, serialized_snapshot, **kwargs):
        return chain(
            tasks.ThrottleProvisionTask().si(
                serialized_snapshot,
                'create_snapshot',
                state_transition='begin_creating'
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_snapshot,
                backend_pull_method='pull_snapshot_runtime_state',
                success_state='available',
                erred_state='error',
            ).set(countdown=10)
        )


class SnapshotUpdateExecutor(core_executors.UpdateExecutor):

    @classmethod
    def get_task_signature(cls, snapshot, serialized_snapshot, **kwargs):
        updated_fields = kwargs['updated_fields']
        # TODO: call separate task on metadata update
        if 'name' in updated_fields or 'description' in updated_fields:
            return core_tasks.BackendMethodTask().si(
                serialized_snapshot, 'update_snapshot', state_transition='begin_updating')
        else:
            return core_tasks.StateTransitionTask().si(serialized_snapshot, state_transition='begin_updating')


class SnapshotDeleteExecutor(core_executors.DeleteExecutor):

    @classmethod
    def get_task_signature(cls, snapshot, serialized_snapshot, **kwargs):
        if snapshot.backend_id:
            return chain(
                core_tasks.BackendMethodTask().si(
                    serialized_snapshot, 'delete_snapshot', state_transition='begin_deleting'),
                openstack_tasks.PollBackendCheckTask().si(serialized_snapshot, 'is_snapshot_deleted'),
            )
        else:
            return core_tasks.StateTransitionTask().si(serialized_snapshot, state_transition='begin_deleting')


class SnapshotPullExecutor(core_executors.ActionExecutor):
    action = 'Pull'

    @classmethod
    def get_task_signature(cls, snapshot, serialized_snapshot, **kwargs):
        return core_tasks.BackendMethodTask().si(
            serialized_snapshot, 'pull_snapshot',
            state_transition='begin_updating')


class InstanceCreateExecutor(core_executors.CreateExecutor):
    """ First - create instance volumes in parallel, after - create instance based on created volumes """

    @classmethod
    def get_task_signature(cls, instance, serialized_instance,
                           ssh_key=None, flavor=None, floating_ip=None, allocate_floating_ip=False):
        """ Create all instance volumes in parallel and wait for them to provision """
        serialized_volumes = [core_utils.serialize_instance(volume) for volume in instance.volumes.all()]

        _tasks = [tasks.ThrottleProvisionStateTask().si(serialized_instance, state_transition='begin_creating')]
        # Create volumes
        for serialized_volume in serialized_volumes:
            _tasks.append(tasks.ThrottleProvisionTask().si(
                serialized_volume, 'create_volume', state_transition='begin_creating'))
        for index, serialized_volume in enumerate(serialized_volumes):
            # Wait for volume creation
            _tasks.append(tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='available',
                erred_state='error',
            ).set(countdown=30 if index == 0 else 0))
            # Pull volume to sure that it is bootable
            _tasks.append(core_tasks.BackendMethodTask().si(serialized_volume, 'pull_volume'))
            # Mark volume as OK
            _tasks.append(core_tasks.StateTransitionTask().si(serialized_volume, state_transition='set_ok'))
        # Create instance based on volumes
        kwargs = {
            'backend_flavor_id': flavor.backend_id,
            'allocate_floating_ip': allocate_floating_ip,
        }
        if ssh_key is not None:
            kwargs['public_key'] = ssh_key.public_key
        if floating_ip is not None:
            kwargs['floating_ip_uuid'] = floating_ip.uuid.hex
        # Wait 10 seconds after volume creation due to OpenStack restrictions.
        _tasks.append(core_tasks.BackendMethodTask().si(
            serialized_instance, 'create_instance', **kwargs).set(countdown=10))

        # Update volumes runtime state and device name
        for serialized_volume in serialized_volumes:
            _tasks.append(core_tasks.BackendMethodTask().si(
                serialized_volume,
                backend_method='pull_volume',
                update_fields=['runtime_state', 'device']
            ))

        return chain(*_tasks)

    @classmethod
    def get_failure_signature(cls, instance, serialized_instance, **kwargs):
        return tasks.SetInstanceErredTask().s(serialized_instance)


class InstanceUpdateExecutor(core_executors.UpdateExecutor):

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, **kwargs):
        updated_fields = kwargs['updated_fields']
        if 'name' in updated_fields:
            return core_tasks.BackendMethodTask().si(
                serialized_instance, 'update_instance', state_transition='begin_updating')
        else:
            return core_tasks.StateTransitionTask().si(serialized_instance, state_transition='begin_updating')


class InstanceUpdateSecurityGroupsExecutor(core_executors.ActionExecutor):
    action = 'Update security groups'

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, **kwargs):
        return core_tasks.BackendMethodTask().si(
            serialized_instance,
            backend_method='push_instance_security_groups',
            state_transition='begin_updating',
        )


class InstanceDeleteExecutor(core_executors.DeleteExecutor):

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, force=False, **kwargs):
        delete_volumes = kwargs.pop('delete_volumes', True)
        delete_instance = cls.get_delete_instance_tasks(serialized_instance)

        # Case 1. Instance does not exist at backend
        if not instance.backend_id:
            return core_tasks.StateTransitionTask().si(
                serialized_instance,
                state_transition='begin_deleting'
            )

        # Case 2. Instance exists at backend.
        # Data volumes are deleted by OpenStack because delete_on_termination=True
        elif delete_volumes:
            return chain(delete_instance)

        # Case 3. Instance exists at backend.
        # Data volumes are detached and not deleted.
        else:
            detach_volumes = cls.get_detach_data_volumes_tasks(instance, serialized_instance)
            return chain(detach_volumes + delete_instance)

    @classmethod
    def get_delete_instance_tasks(cls, serialized_instance):
        return [
            core_tasks.BackendMethodTask().si(
                serialized_instance,
                backend_method='delete_instance',
                state_transition='begin_deleting',
            ),
            openstack_tasks.PollBackendCheckTask().si(
                serialized_instance,
                backend_check_method='is_instance_deleted'
            ),
            core_tasks.BackendMethodTask().si(
                serialized_instance,
                backend_method='pull_instance_volumes'
            )
        ]

    @classmethod
    def get_detach_data_volumes_tasks(cls, instance, serialized_instance):
        data_volumes = instance.volumes.all().filter(bootable=False)
        detach_volumes = [
            core_tasks.BackendMethodTask().si(
                core_utils.serialize_instance(volume),
                backend_method='detach_volume',
            )
            for volume in data_volumes
        ]
        check_volumes = [
            tasks.PollRuntimeStateTask().si(
                core_utils.serialize_instance(volume),
                backend_pull_method='pull_volume_runtime_state',
                success_state='available',
                erred_state='error'
            )
            for volume in data_volumes
        ]
        return detach_volumes + check_volumes


class InstanceFlavorChangeExecutor(core_executors.ActionExecutor):
    action = 'Change flavor'

    @classmethod
    def get_action_details(cls, instance, **kwargs):
        old_flavor_name = kwargs.get('old_flavor_name')
        new_flavor_name = kwargs.get('flavor').name
        return {
            'message': 'Change flavor from %s to %s' % (old_flavor_name, new_flavor_name),
            'old_flavor_name': old_flavor_name,
            'new_flavor_name': new_flavor_name,
        }

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, **kwargs):
        flavor = kwargs.pop('flavor')
        return chain(
            core_tasks.BackendMethodTask().si(
                serialized_instance,
                backend_method='resize_instance',
                state_transition='begin_updating',
                flavor_id=flavor.backend_id
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_instance,
                backend_pull_method='pull_instance_runtime_state',
                success_state='VERIFY_RESIZE',
                erred_state='ERRED'
            ),
            core_tasks.BackendMethodTask().si(
                serialized_instance,
                backend_method='confirm_instance_resize'
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_instance,
                backend_pull_method='pull_instance_runtime_state',
                success_state='SHUTOFF',
                erred_state='ERRED'
            ),
        )


class InstancePullExecutor(core_executors.ActionExecutor):
    action = 'Pull'

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, **kwargs):
        return core_tasks.BackendMethodTask().si(
            serialized_instance, 'pull_instance',
            state_transition='begin_updating')


class InstanceAssignFloatingIpExecutor(core_executors.ActionExecutor):
    action = 'Assign floating IP'

    @classmethod
    def get_action_details(cls, instance, floating_ip_uuid=None, **kwargs):
        if floating_ip_uuid is None:
            return {'message': 'Allocate new floating IP and assign it to instance'}
        floating_ip_address = models.FloatingIP.objects.get(uuid=floating_ip_uuid).address
        return {
            'message': 'Assign floating IP %s' % floating_ip_address,
            'floating_ip_address': floating_ip_address,
        }

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, floating_ip_uuid=None, **kwargs):
        if floating_ip_uuid is not None:
            return core_tasks.BackendMethodTask().si(
                serialized_instance, 'assign_floating_ip_to_instance',
                floating_ip_uuid=floating_ip_uuid,
                state_transition='begin_updating',
            )
        else:
            return core_tasks.BackendMethodTask().si(
                serialized_instance, 'allocate_and_assign_floating_ip_to_instance',
                state_transition='begin_updating',
            )


class InstanceUnassignFloatingIpExecutor(core_executors.ActionExecutor):
    action = 'Unassign floating IP'

    @classmethod
    def get_task_signature(cls, instance, serializer_instance=None, floating_ip=None, **kwargs):
        _tasks = [core_tasks.BackendMethodTask().si(
            serializer_instance,
            'unassign_floating_ip',
            state_transition='begin_updating'
        ), tasks.PollRuntimeStateTask().si(
            core_utils.serialize_instance(floating_ip),
            backend_pull_method='pull_floating_ip_runtime_state',
            success_state='DOWN',
            erred_state='ACTIVE',
        ).set(countdown=30)]

        return chain(*_tasks)


class InstanceStopExecutor(core_executors.ActionExecutor):
    action = 'Stop'

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, **kwargs):
        return chain(
            core_tasks.BackendMethodTask().si(
                serialized_instance, 'stop_instance', state_transition='begin_updating',
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_instance,
                backend_pull_method='pull_instance_runtime_state',
                success_state='SHUTOFF',
                erred_state='ERRED'
            ),
        )


class InstanceStartExecutor(core_executors.ActionExecutor):
    action = 'Start'

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, **kwargs):
        return chain(
            core_tasks.BackendMethodTask().si(
                serialized_instance, 'start_instance', state_transition='begin_updating',
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_instance,
                backend_pull_method='pull_instance_runtime_state',
                success_state='ACTIVE',
                erred_state='ERRED'
            ),
        )


class InstanceRestartExecutor(core_executors.ActionExecutor):
    action = 'Restart'

    @classmethod
    def get_task_signature(cls, instance, serialized_instance, **kwargs):
        return chain(
            core_tasks.BackendMethodTask().si(
                serialized_instance, 'restart_instance', state_transition='begin_updating',
            ),
            tasks.PollRuntimeStateTask().si(
                serialized_instance,
                backend_pull_method='pull_instance_runtime_state',
                success_state='ACTIVE',
                erred_state='ERRED'
            ),
        )


class BackupCreateExecutor(core_executors.CreateExecutor):

    @classmethod
    def get_task_signature(cls, backup, serialized_backup, **kwargs):
        serialized_snapshots = [core_utils.serialize_instance(snapshot) for snapshot in backup.snapshots.all()]

        _tasks = [core_tasks.StateTransitionTask().si(serialized_backup, state_transition='begin_creating')]
        for serialized_snapshot in serialized_snapshots:
            _tasks.append(tasks.ThrottleProvisionTask().si(
                serialized_snapshot, 'create_snapshot', force=True, state_transition='begin_creating'))
        for index, serialized_snapshot in enumerate(serialized_snapshots):
            _tasks.append(tasks.PollRuntimeStateTask().si(
                serialized_snapshot,
                backend_pull_method='pull_snapshot_runtime_state',
                success_state='available',
                erred_state='error',
            ).set(countdown=10 if index == 0 else 0))
            _tasks.append(core_tasks.StateTransitionTask().si(serialized_snapshot, state_transition='set_ok'))

        return chain(*_tasks)

    @classmethod
    def get_failure_signature(cls, backup, serialized_backup, **kwargs):
        return tasks.SetBackupErredTask().s(serialized_backup)


class BackupDeleteExecutor(core_executors.DeleteExecutor):

    @classmethod
    def pre_apply(cls, backup, **kwargs):
        for snapshot in backup.snapshots.all():
            snapshot.schedule_deleting()
            snapshot.save(update_fields=['state'])
        core_executors.DeleteExecutor.pre_apply(backup)

    @classmethod
    def get_task_signature(cls, backup, serialized_backup, force=False, **kwargs):
        serialized_snapshots = [core_utils.serialize_instance(snapshot) for snapshot in backup.snapshots.all()]

        _tasks = [core_tasks.StateTransitionTask().si(serialized_backup, state_transition='begin_deleting')]
        for serialized_snapshot in serialized_snapshots:
            _tasks.append(core_tasks.BackendMethodTask().si(
                serialized_snapshot, 'delete_snapshot', state_transition='begin_deleting'))
        for serialized_snapshot in serialized_snapshots:
            _tasks.append(openstack_tasks.PollBackendCheckTask().si(serialized_snapshot, 'is_snapshot_deleted'))
            _tasks.append(core_tasks.DeletionTask().si(serialized_snapshot))

        return chain(*_tasks)

    @classmethod
    def get_failure_signature(cls, backup, serialized_backup, force=False, **kwargs):
        if not force:
            return tasks.SetBackupErredTask().s(serialized_backup)
        else:
            return tasks.ForceDeleteBackupTask().si(serialized_backup)


class BackupRestorationExecutor(core_executors.CreateExecutor):
    """ Restore volumes from backup snapshots, create instance based on restored volumes """

    @classmethod
    def get_task_signature(cls, backup_restoration, serialized_backup_restoration, **kwargs):
        """ Restore each volume from snapshot """
        instance = backup_restoration.instance
        serialized_instance = core_utils.serialize_instance(instance)
        serialized_volumes = [core_utils.serialize_instance(volume) for volume in instance.volumes.all()]

        _tasks = [
            tasks.ThrottleProvisionStateTask().si(
                serialized_instance,
                state_transition='begin_creating'
            )
        ]
        # Create volumes
        for serialized_volume in serialized_volumes:
            _tasks.append(tasks.ThrottleProvisionTask().si(
                serialized_volume, 'create_volume', state_transition='begin_creating'))
        for index, serialized_volume in enumerate(serialized_volumes):
            # Wait for volume creation
            _tasks.append(tasks.PollRuntimeStateTask().si(
                serialized_volume,
                backend_pull_method='pull_volume_runtime_state',
                success_state='available',
                erred_state='error',
            ).set(countdown=30 if index == 0 else 0))
            # Pull volume to sure that it is bootable
            _tasks.append(core_tasks.BackendMethodTask().si(serialized_volume, 'pull_volume'))
            # Mark volume as OK
            _tasks.append(core_tasks.StateTransitionTask().si(serialized_volume, state_transition='set_ok'))
        # Create instance. Wait 10 seconds after volumes creation due to OpenStack restrictions.
        _tasks.append(core_tasks.BackendMethodTask().si(
            serialized_instance, 'create_instance',
            allocate_floating_ip=False,
            backend_flavor_id=backup_restoration.flavor.backend_id
        ).set(countdown=10))
        return chain(*_tasks)

    @classmethod
    def get_success_signature(cls, backup_restoration, serialized_backup_restoration, **kwargs):
        serialized_instance = core_utils.serialize_instance(backup_restoration.instance)
        return core_tasks.StateTransitionTask().si(serialized_instance, state_transition='set_ok')

    @classmethod
    def get_failure_signature(cls, backup_restoration, serialized_backup_restoration, **kwargs):
        return tasks.SetBackupRestorationErredTask().s(serialized_backup_restoration)


class SnapshotRestorationExecutor(core_executors.CreateExecutor):
    """ Restores volume from snapshot instance """

    @classmethod
    def get_task_signature(cls, snapshot_restoration, serialized_snapshot_restoration, **kwargs):
        serialized_volume = core_utils.serialize_instance(snapshot_restoration.volume)

        _tasks = [
            tasks.ThrottleProvisionTask().si(
                serialized_volume, 'create_volume', state_transition='begin_creating'),
            tasks.PollRuntimeStateTask().si(
                serialized_volume, 'pull_volume_runtime_state', success_state='available', erred_state='error',
            ).set(countdown=30),
            core_tasks.BackendMethodTask().si(serialized_volume, 'pull_volume'),
        ]

        return chain(*_tasks)

    @classmethod
    def get_success_signature(cls, snapshot_restoration, serialized_snapshot_restoration, **kwargs):
        serialized_volume = core_utils.serialize_instance(snapshot_restoration.volume)
        return core_tasks.StateTransitionTask().si(serialized_volume, state_transition='set_ok')

    @classmethod
    def get_failure_signature(cls, snapshot_restoration, serialized_snapshot_restoration, **kwargs):
        serialized_volume = core_utils.serialize_instance(snapshot_restoration.volume)
        return core_tasks.StateTransitionTask().si(serialized_volume, state_transition='set_erred')
