# Copyright 2015 NEC Corporation.  All rights reserved.
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

import argparse
import json
import time
import yaml

from zunclient.common import cliutils as utils
from zunclient.common import utils as zun_utils
from zunclient.common.websocketclient import exceptions
from zunclient.common.websocketclient import websocketclient
from zunclient import exceptions as exc


def _show_container(container):
    _format_container_addresses(container)
    utils.print_dict(container._info)


def _format_container_addresses(container):
    addresses = getattr(container, 'addresses', {})
    output = []
    try:
        for _, address_list in addresses.items():
            for a in address_list:
                output.append(a['addr'])
    except Exception:
        pass

    setattr(container, 'addresses', ', '.join(output))
    container._info['addresses'] = ', '.join(output)


def _websocket_attach(url, container, escape, close_wait):
    if url.startswith("ws://"):
        try:
            wscls = websocketclient.WebSocketClient(host_url=url,
                                                    id=container,
                                                    escape=escape,
                                                    close_wait=close_wait)
            wscls.init_httpclient()
            wscls.connect()
            wscls.handle_resize()
            wscls.start_loop()
        except exceptions.ContainerWebSocketException as e:
            print("%(e)s:%(container)s" %
                  {'e': e, 'container': container})
    else:
        raise exceptions.InvalidWebSocketLink(container)


def _list_containers(containers):
    for c in containers:
        _format_container_addresses(c)
    columns = ('uuid', 'name', 'image', 'status', 'task_state', 'addresses',
               'ports')
    utils.print_list(containers, columns,
                     {'versions': zun_utils.print_list_field('versions')},
                     sortby_index=None)


@utils.arg('-n', '--name',
           metavar='<name>',
           help='name of the container')
@utils.arg('-c', '--command',
           metavar='<command>',
           help='Send command to the container')
@utils.arg('--cpu',
           metavar='<cpu>',
           help='The number of virtual cpus.')
@utils.arg('-m', '--memory',
           metavar='<memory>',
           help='The container memory size in MiB')
@utils.arg('-e', '--environment',
           metavar='<KEY=VALUE>',
           action='append', default=[],
           help='The environment variables')
@utils.arg('--workdir',
           metavar='<workdir>',
           help='The working directory for commands to run in')
@utils.arg('--label',
           metavar='<KEY=VALUE>',
           action='append', default=[],
           help='Adds a map of labels to a container. '
                'May be used multiple times.')
@utils.arg('--image-pull-policy',
           dest='image_pull_policy',
           metavar='<policy>',
           choices=['never', 'always', 'ifnotpresent'],
           help='The policy which determines if the image should '
                'be pulled prior to starting the container. '
                'It can have following values: '
                '"ifnotpresent": only pull the image if it does not '
                'already exist on the node. '
                '"always": Always pull the image from repositery.'
                '"never": never pull the image')
@utils.arg('image', metavar='<image>', help='name or ID of the image')
@utils.arg('--restart',
           metavar='<restart>',
           help='Restart policy to apply when a container exits'
                '(no, on-failure[:max-retry], always, unless-stopped)')
@utils.arg('-t', '--tty',
           dest='tty',
           action='store_true',
           default=False,
           help='Allocate a pseudo-TTY')
@utils.arg('-i', '--interactive',
           dest='stdin_open',
           action='store_true',
           default=False,
           help='Keep STDIN open even if not attached')
@utils.arg('--image-driver',
           metavar='<image_driver>',
           help='The image driver to use to pull container image. '
                'It can have following values: '
                '"docker": pull the image from Docker Hub. '
                '"glance": pull the image from Glance. ')
def do_create(cs, args):
    """Create a container."""
    opts = {}
    opts['name'] = args.name
    opts['image'] = args.image
    opts['command'] = args.command
    opts['memory'] = args.memory
    opts['cpu'] = args.cpu
    opts['environment'] = zun_utils.format_args(args.environment)
    opts['workdir'] = args.workdir
    opts['labels'] = zun_utils.format_args(args.label)
    opts['image_pull_policy'] = args.image_pull_policy
    opts['image_driver'] = args.image_driver
    if args.restart:
        opts['restart_policy'] = zun_utils.check_restart_policy(args.restart)
    if args.tty:
        opts['tty'] = True
    if args.stdin_open:
        opts['stdin_open'] = True
    opts = zun_utils.remove_null_parms(**opts)
    _show_container(cs.containers.create(**opts))


@utils.arg('--marker',
           metavar='<marker>',
           default=None,
           help='The last container UUID of the previous page; '
                'displays list of containers after "marker".')
@utils.arg('--limit',
           metavar='<limit>',
           type=int,
           help='Maximum number of containers to return')
@utils.arg('--sort-key',
           metavar='<sort-key>',
           help='Column to sort results by')
@utils.arg('--sort-dir',
           metavar='<sort-dir>',
           choices=['desc', 'asc'],
           help='Direction to sort. "asc" or "desc".')
def do_list(cs, args):
    """Print a list of available containers."""
    opts = {}
    opts['marker'] = args.marker
    opts['limit'] = args.limit
    opts['sort_key'] = args.sort_key
    opts['sort_dir'] = args.sort_dir
    opts = zun_utils.remove_null_parms(**opts)
    containers = cs.containers.list(**opts)
    _list_containers(containers)


@utils.arg('containers',
           metavar='<container>',
           nargs='+',
           help='ID or name of the (container)s to delete.')
@utils.arg('-f', '--force',
           action='store_true',
           help='Force delete the container.')
def do_delete(cs, args):
    """Delete specified containers."""
    for container in args.containers:
        try:
            cs.containers.delete(container, args.force)
            print("Request to delete container %s has been accepted." %
                  container)
        except Exception as e:
            print("Delete for container %(container)s failed: %(e)s" %
                  {'container': container, 'e': e})


@utils.arg('container',
           metavar='<container>',
           help='ID or name of the container to show.')
@utils.arg('-f', '--format',
           metavar='<format>',
           action='store',
           choices=['json', 'yaml', 'table'],
           default='table',
           help='Print representation of the container.'
                'The choices of the output format is json,table,yaml.'
                'Defaults to table.')
def do_show(cs, args):
    """Show details of a container."""
    container = cs.containers.get(args.container)
    if args.format == 'json':
        print(json.dumps(container._info, indent=4, sort_keys=True))
    elif args.format == 'yaml':
        print(yaml.safe_dump(container._info, default_flow_style=False))
    elif args.format == 'table':
        _show_container(container)


@utils.arg('containers',
           metavar='<container>',
           nargs='+',
           help='ID or name of the (container)s to reboot.')
@utils.arg('-t', '--timeout',
           metavar='<timeout>',
           default=10,
           help='Seconds to wait for stop before rebooting (container)s')
def do_reboot(cs, args):
    """Reboot specified containers."""
    for container in args.containers:
        try:
            cs.containers.reboot(container, args.timeout)
            print("Request to reboot container %s has been accepted." %
                  container)
        except Exception as e:
            print("Reboot for container %(container)s failed: %(e)s" %
                  {'container': container, 'e': e})


@utils.arg('containers',
           metavar='<container>',
           nargs='+',
           help='ID or name of the (container)s to stop.')
@utils.arg('-t', '--timeout',
           metavar='<timeout>',
           default=10,
           help='Seconds to wait for stop before killing (container)s')
def do_stop(cs, args):
    """Stop specified containers."""
    for container in args.containers:
        try:
            cs.containers.stop(container, args.timeout)
            print("Request to stop container %s has been accepted." %
                  container)
        except Exception as e:
            print("Stop for container %(container)s failed: %(e)s" %
                  {'container': container, 'e': e})


@utils.arg('containers',
           metavar='<container>',
           nargs='+',
           help='ID of the (container)s to start.')
def do_start(cs, args):
    """Start specified containers."""
    for container in args.containers:
        try:
            cs.containers.start(container)
            print("Request to start container %s has been accepted." %
                  container)
        except Exception as e:
            print("Start for container %(container)s failed: %(e)s" %
                  {'container': container, 'e': e})


@utils.arg('containers',
           metavar='<container>',
           nargs='+',
           help='ID or name of the (container)s to pause.')
def do_pause(cs, args):
    """Pause specified containers."""
    for container in args.containers:
        try:
            cs.containers.pause(container)
            print("Request to pause container %s has been accepted." %
                  container)
        except Exception as e:
            print("Pause for container %(container)s failed: %(e)s" %
                  {'container': container, 'e': e})


@utils.arg('containers',
           metavar='<container>',
           nargs='+',
           help='ID or name of the (container)s to unpause.')
def do_unpause(cs, args):
    """Unpause specified containers."""
    for container in args.containers:
        try:
            cs.containers.unpause(container)
            print("Request to unpause container %s has been accepted." %
                  container)
        except Exception as e:
            print("Unpause for container %(container)s failed: %(e)s" %
                  {'container': container, 'e': e})


@utils.arg('container',
           metavar='<container>',
           help='ID or name of the container to get logs for.')
@utils.arg('--stdout',
           action='store_true',
           help='Only stdout logs of container.')
@utils.arg('--stderr',
           action='store_true',
           help='Only stderr logs of container.')
def do_logs(cs, args):
    """Get logs of a container."""
    logs = cs.containers.logs(args.container, args.stdout, args.stderr)
    print(logs)


@utils.arg('container',
           metavar='<container>',
           help='ID or name of the container to execute command in.')
@utils.arg('command',
           metavar='<command>',
           nargs=argparse.REMAINDER,
           help='The command to execute in a container')
def do_exec(cs, args):
    """Execute command in a container."""
    output = cs.containers.execute(args.container, ' '.join(args.command))
    print(output)


@utils.arg('containers',
           metavar='<container>',
           nargs='+',
           help='ID or name of the (container)s to kill signal to.')
@utils.arg('-s', '--signal',
           metavar='<signal>',
           default=None,
           help='The signal to kill')
def do_kill(cs, args):
    """kill signal to containers."""
    for container in args.containers:
        opts = {}
        opts['id'] = container
        opts['signal'] = args.signal
        opts = zun_utils.remove_null_parms(**opts)
        try:
            cs.containers.kill(**opts)
            print(
                "Request to kill signal to container %s has been accepted." %
                container)
        except Exception as e:
            print(
                "kill signal for container %(container)s failed: %(e)s" %
                {'container': container, 'e': e})


@utils.arg('-n', '--name',
           metavar='<name>',
           help='name of the container')
@utils.arg('-c', '--command',
           metavar='<command>',
           help='Send command to the container')
@utils.arg('--cpu',
           metavar='<cpu>',
           help='The number of virtual cpus.')
@utils.arg('-m', '--memory',
           metavar='<memory>',
           help='The container memory size in MiB')
@utils.arg('-e', '--environment',
           metavar='<KEY=VALUE>',
           action='append', default=[],
           help='The environment variables')
@utils.arg('--workdir',
           metavar='<workdir>',
           help='The working directory for commands to run in')
@utils.arg('--label',
           metavar='<KEY=VALUE>',
           action='append', default=[],
           help='Adds a map of labels to a container. '
                'May be used multiple times.')
@utils.arg('--image-pull-policy',
           dest='image_pull_policy',
           metavar='<policy>',
           choices=['never', 'always', 'ifnotpresent'],
           help='The policy which determines if the image should '
                'be pulled prior to starting the container. '
                'It can have following values: '
                '"ifnotpresent": only pull the image if it does not '
                'already exist on the node. '
                '"always": Always pull the image from repositery.'
                '"never": never pull the image')
@utils.arg('image', metavar='<image>', help='name or ID of the image')
@utils.arg('--restart',
           metavar='<restart>',
           help='Restart policy to apply when a container exits'
                '(no, on-failure[:max-retry], always, unless-stopped)')
@utils.arg('-t', '--tty',
           dest='tty',
           action='store_true',
           default=False,
           help='Allocate a pseudo-TTY')
@utils.arg('-i', '--interactive',
           dest='stdin_open',
           action='store_true',
           default=False,
           help='Keep STDIN open even if not attached')
@utils.arg('--image-driver',
           metavar='<image_driver>',
           help='The image driver to use to pull container image. '
                'It can have following values: '
                '"docker": pull the image from Docker Hub. '
                '"glance": pull the image from Glance. ')
def do_run(cs, args):
    """Run a command in a new container"""
    opts = {}
    opts['name'] = args.name
    opts['image'] = args.image
    opts['command'] = args.command
    opts['memory'] = args.memory
    opts['cpu'] = args.cpu
    opts['environment'] = zun_utils.format_args(args.environment)
    opts['workdir'] = args.workdir
    opts['labels'] = zun_utils.format_args(args.label)
    opts['image_pull_policy'] = args.image_pull_policy
    opts['image_driver'] = args.image_driver
    if args.restart:
        opts['restart_policy'] = zun_utils.check_restart_policy(args.restart)
    if args.tty:
        opts['tty'] = True
    if args.stdin_open:
        opts['stdin_open'] = True
    opts = zun_utils.remove_null_parms(**opts)
    container = cs.containers.run(**opts)
    _show_container(container)
    container_uuid = getattr(container, 'uuid', None)
    if args.tty and args.stdin_open:
        ready_for_attach = False
        while True:
            container = cs.containers.get(container_uuid)
            if zun_utils.check_container_status(container, 'Running'):
                ready_for_attach = True
                break
            if zun_utils.check_container_status(container, 'Error'):
                break
            print("Waiting for container start")
            time.sleep(1)
        if ready_for_attach is True:
            response = cs.containers.attach(container_uuid)
            _websocket_attach(response, container_uuid, "~", 0.5)
        else:
            raise exceptions.InvalidWebSocketLink(container_uuid)


@utils.arg('container',
           metavar='<container>',
           help='ID or name of the container to rename.')
@utils.arg('name',
           metavar='<name>',
           help='The new name for the container')
def do_rename(cs, args):
    """Rename a container."""
    cs.containers.rename(args.container, args.name)


@utils.arg('container',
           metavar='<container>',
           help="ID or name of the container to udate.")
@utils.arg('--cpu',
           metavar='<cpu>',
           help='The number of virtual cpus.')
@utils.arg('-m', '--memory',
           metavar='<memory>',
           help='The container memory size in MiB')
def do_update(cs, args):
    """Updates one or more container attributes"""
    opts = {}
    opts['memory'] = args.memory
    opts['cpu'] = args.cpu
    opts = zun_utils.remove_null_parms(**opts)
    if not opts:
        raise exc.CommandError("You must update at least one property")
    container = cs.containers.update(args.container, **opts)
    _show_container(container)


@utils.arg('container',
           metavar='<container>',
           help='ID or name of the container to be attahed to.')
def do_attach(cs, args):
    """Attach to a container."""
    response = cs.containers.attach(args.container)
    zun_utils.websocket_attach(response, args.container, "~", 0.5)


@utils.arg('container',
           metavar='<container>',
           help='ID or name of the container to display progesses.')
@utils.arg('ps_args',
           metavar='<ps_args>',
           nargs=argparse.REMAINDER,
           help='The args of the ps command.')
def do_top(cs, args):
    """Displays the running processes inside the container."""
    output = cs.containers.top(args.container, ' '.join(args.ps_args))
    for titles in output['Titles']:
        print("%-20s") % titles,
    for process in output['Processes']:
        print("")
        for info in process:
            print("%-20s") % info,
