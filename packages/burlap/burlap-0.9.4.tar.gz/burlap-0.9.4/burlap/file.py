"""
Various tools for manipulating files.
"""
from __future__ import print_function

import os
import warnings
from datetime import date
    
from fabric.api import env

from burlap.common import (
    run_or_dryrun,
    put_or_dryrun,
    sudo_or_dryrun,
)
from burlap.decorators import task_or_dryrun

env.file_sync_sets = []
env.file_default_user = 'www-data'
env.file_default_group = 'www-data'

@task_or_dryrun
def sync():
    """
    Uploads sets of files to the host.
    """
    
    for data in env.file_sync_sets:
        env.file_src = src = data['src']
        assert os.path.isfile(src), 'File %s does not exist.' % (src,)
        env.file_dst = dst = data['dst']
        
        env.file_dst_dir, env.file_dst_file = os.path.split(dst)
        cmd = 'mkdir -p %(file_dst_dir)s' % env
        sudo_or_dryrun(cmd)
        
        put_or_dryrun(local_path=src, remote_path=dst, use_sudo=True)
        
        env.file_user = data.get('user', env.file_default_user)
        env.file_group = data.get('group', env.file_default_group)
        cmd = 'chown %(file_user)s:%(file_group)s %(file_dst)s' % env
        sudo_or_dryrun(cmd)

#DEPRECATED, use files.append instead
@task_or_dryrun
def appendline(fqfn, line, use_sudo=0, verbose=1, commands_only=0):
    """
    Appends the given line to the given file only if the line does not already
    exist in the file.
    """
    warnings.warn('Use Satchel.append() instead.', DeprecationWarning, stacklevel=2)
    verbose = int(verbose)
    commands_only = int(commands_only)
    
    use_sudo = int(use_sudo)
    kwargs = dict(fqfn=fqfn, line=line)
    cmd = 'grep -qF "{line}" {fqfn} || echo "{line}" >> {fqfn}'.format(**kwargs)
    if verbose:
        print(cmd)
    if not commands_only:
        if use_sudo:
            sudo_or_dryrun(cmd)
        else:
            run_or_dryrun(cmd)
    return [cmd]

@task_or_dryrun
def backup(fn, ext='bak'):
    """
    Makes a timestamped copy of a file in the same directory.
    """
    today = date.today()
    fn_bak = '%s.%04i%02i%02i.%s' % (fn, today.year, today.month, today.day, ext)
    sudo_or_dryrun('cp "%s" "%s"' % (fn, fn_bak))
    return fn_bak
    