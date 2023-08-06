from __future__ import unicode_literals

import os
import re
import subprocess
from subprocess import Popen

from ._path import make_sure_path_exists
from ._string import make_sure_unicode
from .config import stdoe_folder

_max_nfiles = 1000


def killall(force=False):
    if force:
        subprocess.call("bkill -r -u horta 0", shell=True)
    else:
        subprocess.call("bkill -u horta 0", shell=True)


def get_output_files(i, runid):
    pr = str(int(i / _max_nfiles))
    base = os.path.join(stdoe_folder(), runid, pr)
    make_sure_path_exists(base)
    ofile = os.path.join(base, 'out_%d.txt' % i)
    efile = os.path.join(base, 'err_%d.txt' % i)
    return (ofile, efile)


def get_jobs_stat():

    if get_jobs_stat.stats is None:

        stats = dict()
        cmd = 'bjobs -a -o "JOBID STAT" -noheader'
        r = subprocess.check_output(
            cmd, shell=True, stderr=subprocess.STDOUT, universal_newlines=True)
        r = make_sure_unicode(r)
        r = r.strip()
        if r != 'No job found':
            stats = {
                int(row.split(' ')[0]): row.split(' ')[1]
                for row in r.split('\n')
            }

        get_jobs_stat.stats = stats

    return get_jobs_stat.stats


get_jobs_stat.stats = None


def group_jobids(grp):
    procs = Popen(
        "bjobs -g %s -w | awk '{print $1}'" % grp,
        shell=True,
        stdout=subprocess.PIPE,
        universal_newlines=True).stdout.read()
    procs = procs.split('\n')
    procs = procs[1:-1]
    return [int(p) for p in procs]


def kill_group(grp, block=True):
    jobids = group_jobids(grp)
    procs = []
    for jobid in jobids:
        p = Popen(
            "bkill %d &> /dev/null" % jobid,
            shell=True,
            universal_newlines=True)
        procs.append(p)

    if block:
        for p in procs:
            p.wait()


def _try_clean_runid(runid):
    c = re.compile(r'^.*(\d\d\d\d-\d\d-\d\d-\d\d-\d\d-\d\d).*$')
    m = c.match(runid)
    if m is None:
        return runid
    return m.group(1)


def proper_runid(what):
    m = re.match(r'^last(\^*)$', what)
    if m is None:
        return _try_clean_runid(what)
    n = len(m.group(1)) + 1
    runids = get_runids()
    runids.sort()
    return runids[max(-len(runids), -n)]


def get_runids():
    c = re.compile(r'^\d\d\d\d-\d\d-\d\d-\d\d-\d\d-\d\d$')
    files = os.listdir(stdoe_folder())
    runids = [f for f in files if c.match(f)]
    return runids
