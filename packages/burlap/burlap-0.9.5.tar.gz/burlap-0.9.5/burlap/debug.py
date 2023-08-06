"""
Various debug tasks.

Note, this is a special module, in that all tasks defined here are auto-imported
into the top-level namespace. That means you access them by calling them directly,
not through "debug."
"""
from __future__ import print_function

import re
from pprint import pprint

from fabric.api import (
    env,
    settings,
    runs_once,
    local as _local,
    run as _run,
    sudo as _sudo,
)

from burlap.common import (
    run_or_dryrun,
    sudo_or_dryrun,
    local_or_dryrun,
)
from burlap.decorators import task_or_dryrun

env.shell_load_dj = True

@task_or_dryrun
def list_settings(name):
    from burlap import load_yaml_settings
    load_yaml_settings(name=name, verbose=1)


@task_or_dryrun
def list_env(key=None):
    """
    Displays a list of environment key/value pairs.
    """
    for k, v in sorted(env.iteritems(), key=lambda o: o[0]):
        if key and k != key:
            continue
        print('%s ' % (k,))
        pprint(v, indent=4)


@task_or_dryrun
def list_sites(site='all', *args, **kwargs):
    from burlap.common import iter_sites
    kwargs['site'] = site
    for site, data in iter_sites(*args, **kwargs):
        print(site)


def list_to_str_or_unknown(lst):
    if len(lst):
        return ', '.join(map(str, lst))
    return 'unknown'


@task_or_dryrun
def list_server_specs(cpu=1, memory=1, hdd=1):
    """
    Displays a list of common servers characteristics, like number
    of CPU cores, amount of memory and hard drive capacity.
    """
    
    cpu = int(cpu)
    memory = int(memory)
    hdd = int(hdd)
    
    # CPU
    if cpu:
        cmd = 'cat /proc/cpuinfo | grep -i "model name"'
        ret = run_or_dryrun(cmd)
        matches = map(str.strip, re.findall(r'model name\s+:\s*([^\n]+)', ret, re.DOTALL|re.I))
        cores = {}
        for match in matches:
            cores.setdefault(match, 0)
            cores[match] += 1
    
    # Memory
    if memory:
        cmd = 'dmidecode --type 17'
        ret = sudo_or_dryrun(cmd)
        #print repr(ret)
        matches = re.findall(r'Memory\s+Device\r\n(.*?)(?:\r\n\r\n|$)', ret, flags=re.DOTALL|re.I)
        #print len(matches)
        #print matches[0]
        memory_slot_dicts = []
        for match in matches:
            attrs = dict([(_a.strip(), _b.strip()) for _a, _b in re.findall(r'^([^:]+):\s+(.*)$', match, flags=re.MULTILINE)])
            #print attrs
            memory_slot_dicts.append(attrs)
        total_memory_gb = 0
        total_slots_filled = 0
        total_slots = len(memory_slot_dicts)
        memory_types = set()
        memory_forms = set()
        memory_speeds = set()
        for memory_dict in memory_slot_dicts:
            try:
                size = int(round(float(re.findall(r'([0-9]+)\s+MB', memory_dict['Size'])[0])/1024.))
                #print size
                total_memory_gb += size
                total_slots_filled += 1
            except IndexError:
                pass
            _v = memory_dict['Type']
            if _v != 'Unknown':
                memory_types.add(_v)
            _v = memory_dict['Form Factor']
            if _v != 'Unknown':
                memory_forms.add(_v)
            _v = memory_dict['Speed']
            if _v != 'Unknown':
                memory_speeds.add(_v)
    
    # Storage
    if hdd:
        #cmd = 'ls /dev/*d* | grep "/dev/[a-z]+d[a-z]$"'
        cmd = 'find /dev -maxdepth 1 | grep -E "/dev/[a-z]+d[a-z]$"'
        devices = map(str.strip, run_or_dryrun(cmd).split('\n'))
        total_drives = len(devices)
        total_physical_storage_gb = 0
        total_logical_storage_gb = 0
        drive_transports = set()
        for device in devices:
            cmd = 'udisks --show-info %s |grep -i "  size:"' % (device)
            ret = run_or_dryrun(cmd)
            size_bytes = float(re.findall(r'size:\s*([0-9]+)', ret)[0].strip())
            size_gb = int(round(size_bytes/1024/1024/1024))
            #print device, size_gb
            total_physical_storage_gb += size_gb
            
            with settings(warn_only=True):
                cmd = 'hdparm -I %s|grep -i "Transport:"' % device
                ret = sudo_or_dryrun(cmd)
                if ret and not ret.return_code:
                    drive_transports.add(ret.split('Transport:')[-1].strip())
                
        cmd = "df | grep '^/dev/[mhs]d*' | awk '{s+=$2} END {print s/1048576}'"
        ret = run_or_dryrun(cmd)
        total_logical_storage_gb = float(ret)
    
    if cpu:
        print('-'*80)
        print('CPU')
        print('-'*80)
        type_str = ', '.join(['%s x %i' % (_type, _count) for _type, _count in cores.items()])
        print('Cores: %i' % sum(cores.values()))
        print('Types: %s' % type_str)
    
    if memory:
        print('-'*80)
        print('MEMORY')
        print('-'*80)
        print('Total: %s GB' % total_memory_gb)
        print('Type: %s' % list_to_str_or_unknown(memory_types))
        print('Form: %s' % list_to_str_or_unknown(memory_forms))
        print('Speed: %s' % list_to_str_or_unknown(memory_speeds))
        print('Slots: %i (%i filled, %i empty)' % (total_slots, total_slots_filled, total_slots - total_slots_filled))
    
    if hdd:
        print('-'*80)
        print('STORAGE')
        print('-'*80)
        print('Total physical drives: %i' % total_drives)
        print('Total physical storage: %s GB' % total_physical_storage_gb)
        print('Total logical storage: %s GB' % total_logical_storage_gb)
        print('Types: %s' % list_to_str_or_unknown(drive_transports))


@task_or_dryrun
def list_hosts():
    print('hosts:', env.hosts)


@task_or_dryrun
def info():
    print('Info')
    print('\tROLE:', env.ROLE)
    print('\tSITE:', env.SITE)
    print('\tdefault_site:', env.default_site)


@task_or_dryrun
@runs_once
def shell(gui=0, command=''):
    """
    Opens an SSH connection.
    """
    from burlap.common import get_hosts_for_site
    
    try:
        from burlap.dj import render_remote_paths
        render_remote_paths()
    except Exception:
        pass
    
    _env = type(env)(env)
    
    if _env.SITE != _env.default_site:
        shell_hosts = get_hosts_for_site()
        if shell_hosts:
            _env.host_string = shell_hosts[0]
    
    #print 'env.remote_app_dir:',env.remote_app_dir
    _env.SITE = _env.SITE or _env.default_site
    _env.shell_x_opt = '-X' if int(gui) else ''
    
    #_env.host_string = _env.get('host_string') or ''
    if 'host_string' not in _env or not _env.host_string:
        if 'available_sites' in _env and _env.SITE not in _env.available_sites:
            raise Exception('No host_string set. Unknown site %s.' % _env.SITE)
        else:
            raise Exception('No host_string set.')
    
    if '@' in _env.host_string:
        _env.shell_host_string = _env.host_string
    else:
        _env.shell_host_string = '%(user)s@%(host_string)s' % _env
        
    _env.shell_check_host_key_str = '-o StrictHostKeyChecking=no'
    
    try:
        _env.shell_default_dir = _env.shell_default_dir_template % _env
    except KeyError:
        _env.shell_default_dir = '~'
    if command:
        _env.shell_interactive_shell_str = command
    else:
        _env.shell_interactive_shell_str = (_env.shell_interactive_shell or '') % _env
    
    if _env.is_local:
        cmd = '%(shell_interactive_shell_str)s' % _env
    elif _env.key_filename:
        # If host_string contains the port, then strip it off and pass separately.
        port = _env.shell_host_string.split(':')[-1]
        if port.isdigit():
            _env.shell_host_string = _env.shell_host_string.split(':')[0] + (' -p %s' % port)
        cmd = 'ssh -t %(shell_x_opt)s %(shell_check_host_key_str)s -i %(key_filename)s %(shell_host_string)s "%(shell_interactive_shell_str)s"' % _env
    elif _env.password:
        cmd = 'ssh -t %(shell_x_opt)s %(shell_check_host_key_str)s %(shell_host_string)s "%(shell_interactive_shell_str)s"' % _env
    else:
        # No explicit password or key file needed?
        cmd = 'ssh -t %(shell_x_opt)s %(shell_host_string)s "%(shell_interactive_shell_str)s"' % _env
    local_or_dryrun(cmd)


@task_or_dryrun
def run(command):
    with settings(warn_only=True):
        run_or_dryrun(command)


@task_or_dryrun
def disk():
    """
    Display percent of disk usage.
    """
    run_or_dryrun(env.disk_usage_command % env)


@task_or_dryrun
def tunnel(local_port, remote_port):
    """
    Creates an SSH tunnel.
    """
    env.tunnel_local_port = local_port
    env.tunnel_remote_port = remote_port
    local_or_dryrun(' ssh -i %(key_filename)s -L %(tunnel_local_port)s:localhost:%(tunnel_remote_port)s %(user)s@%(host_string)s -N' % env)

@task_or_dryrun
def test_local():
    _local("echo hello")

@task_or_dryrun
def test_run():
    _run("echo hello")

@task_or_dryrun
def test_sudo():
    _sudo("echo hello")
