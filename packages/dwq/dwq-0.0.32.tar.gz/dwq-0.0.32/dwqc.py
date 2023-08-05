#!/usr/bin/env python3

import json
import random
import os
import signal
import sys
import time
import argparse

from dwq import Job, Disque

def sigterm_handler(signal, stack_frame):
    raise SystemExit()

def nicetime(time):
    secs = round(time)
    minutes = secs/60
    hrs = minutes/60
    days = int(hrs/24)
    secs = int(secs % 60)
    minutes = int(minutes % 60)
    hrs = int(hrs % 24)
    res = ""
    if days:
        res += "%id:" % days
    if hrs:
        res += "%ih:" % hrs
    if minutes:
        if hrs and minutes < 10:
            res += "0"
        res += "%im:" % minutes
    if minutes and secs < 10:
            res += "0"
    res += "%is" % secs
    return res

def parse_args():
    parser = argparse.ArgumentParser(prog='dwqc', description='dwq: disque-based work queue')

    parser.add_argument('-q', '--queue', type=str,
            help='queue name for jobs (default: \"default\")',
            default=os.environ.get("DWQ_QUEUE") or "default")


    parser.add_argument('-r', "--repo", help='git repository to work on', type=str,
            required="DWQ_REPO" not in os.environ, default=os.environ.get("DWQ_REPO"))

    parser.add_argument('-c', "--commit", help='git commit to work on', type=str,
            required="DWQ_COMMIT" not in os.environ, default=os.environ.get("DWQ_COMMIT"))

    parser.add_argument('-e', "--exclusive-jobdir", help='don\'t share jobdirs between jobs', action="store_true")

    parser.add_argument('-P', "--progress", help='enable progress output', action="store_true" )
    parser.add_argument('-v', "--verbose", help='enable status output', action="store_true" )
    parser.add_argument('-Q', "--quiet", help='don\'t print command output', action="store_true" )
    parser.add_argument('-s', "--stdin", help='read from stdin', action="store_true" )
    parser.add_argument('-o', "--outfile", help='write job results to file', type=argparse.FileType('w'))
    parser.add_argument('-b', "--batch", help='send all jobs together', action="store_true")
    parser.add_argument('-E', "--env", help='export environment variable to client', type=str, action="append", default=[])
    parser.add_argument('-S', "--subjob", help='pass job(s) to master instance, don\'t wait for completion', action="store_true")

    parser.add_argument('--version', action='version', version='%(prog)s 0.1')

    parser.add_argument('command', type=str, nargs='?')

    return parser.parse_args()

def get_env(env):
    result = {}
    for var in env:
        var = var.split("=", maxsplit=1)
        if len(var) == 1:
            val = os.environ.get(var[0])
            if val:
                var.append(val)
            else:
                continue
        result[var[0]] = var[1]

    return result

def create_body(args, command, options=None, parent_id=None):
    body = { "repo" : args.repo, "commit" : args.commit, "command" : command }
    if options:
        body["options"] = options

    if parent_id:
        body["parent"] = parent_id

    if args.env:
        body["env"] = get_env(args.env)

    return body

def queue_job(jobs_set, queue, body, control_queues):
    job_id = Job.add(queue, body, control_queues)

    parent = body.get('parent')
    if parent:
        body = { 'parent' : parent, 'subjob' : job_id, 'unique' : os.environ.get("DWQ_JOB_UNIQUE") }
        Job.add(control_queues[0], body, None)

    else:
        jobs_set.add(job_id)

    return job_id

def vprint(*args, **kwargs):
    global verbose
    if verbose:
        print(*args, **kwargs)

verbose = False

def dict_addset(_dict, key, data):
    try:
        _dict[key].add(data)
    except KeyError:
        _dict[key] = {data}

def dict_dictadd(_dict, key):
    try:
        return _dict[key]
    except KeyError:
        _tmp = {}
        _dict[key] = _tmp
        return _tmp

def main():
    global verbose
    args = parse_args()

    signal.signal(signal.SIGTERM, sigterm_handler)

    job_queue = args.queue

    Disque.connect(["localhost:7711"])

    if args.subjob:
        try:
            control_queue = os.environ["DWQ_CONTROL_QUEUE"]
        except KeyError:
            print("dwqc: error: --subjob specified, but DWQ_CONTROL_QUEUE unset.")
            sys.exit(1)

        try:
            parent_jobid = os.environ["DWQ_JOBID"]
        except KeyError:
            print("dwqc: error: --subjob specified, but DWQ_JOBID unset.")
            sys.exit(1)

    else:
        control_queue = "control::%s" % random.random()
        parent_jobid = None

    verbose = args.verbose

    if args.progress:
        start_time = time.time()

    result_list = []
    try:
        jobs = set()
        batch = []
        if args.command and not args.stdin:
            options = {}
            if args.exclusive_jobdir:
                options.update({ "jobdir" : "exclusive" })
            queue_job(jobs, job_queue, create_body(args, args.command, options, parent_jobid), [control_queue])
        else:
            jobs_read = 0
            vprint("dwqc: reading jobs from stdin")
            for line in sys.stdin:
                line = line.rstrip()
                if args.stdin:
                    cmdargs = line.split(" ")
                    command = args.command
                    for i in range(0, len(cmdargs)):
                        command = command.replace("${%i}" % (i+1), cmdargs[i])
                else:
                    command = line

                tmp = command.split("###")
                command = tmp[0]
                options = {}
                if len(tmp) > 1:
                    options = json.loads(tmp[1])

                if args.exclusive_jobdir:
                    options.update({ "jobdir" : "exclusive" })

                if args.batch:
                    batch.append((job_queue, create_body(args, command, options, parent_jobid), [control_queue]))
                else:
                    job_id = queue_job(jobs, job_queue, create_body(args, command, options, parent_jobid), [control_queue])
                    vprint("dwqc: job %s command=\"%s\" sent." % (job_id, command))
                    if args.progress:
                        print("")

                if args.progress:
                    jobs_read += 1
                    elapsed = time.time() - start_time
                    print("\033[F\033[K[%s] %s jobs read" \
                            % (nicetime(elapsed), jobs_read), end="\r")

        _time = ""
        if args.batch and args.stdin:
            before = time.time()
            vprint("dwqc: sending jobs")
            for _tuple in batch:
                queue_job(jobs, *_tuple)
            _time = "(took %s)" % nicetime(time.time() - before)

        if args.stdin:
            vprint("dwqc: all jobs sent.", _time)

        if args.subjob:
            return

        if args.progress:
            vprint("")

        unexpected = {}
        early_subjobs = []
        total = len(jobs)
        done = 0
        failed = 0
        passed = 0
        subjobs = {}
        while jobs:
            _early_subjobs = early_subjobs or None
            early_subjobs = []

            for job in _early_subjobs or Job.wait(control_queue, count=128):
                #print(json.dumps(job, sort_keys=True, indent=4))
                subjob = job.get("subjob")
                if subjob:
                    parent = job.get("parent")
                    unique = job.get("unique")

                    _dict = dict_dictadd(subjobs, parent)
                    dict_addset(_dict, unique, subjob)

                else:
                    try:
                        job_id = job["job_id"]
                        jobs.remove(job_id)
                        done += 1
                        #if args.progress:
                        #    vprint("\033[F\033[K", end="")
                        #vprint("dwqc: job %s done. result=%s" % (job["job_id"], job["result"]["status"]))
                        if not args.quiet:
                            print(job["result"]["output"], end="")
                        if job["result"]["status"] in { 0, "0", "pass" }:
                            passed += 1
                        else:
                            failed += 1
                        if args.outfile:
                            result_list.append(job)

                        # collect subjobs started by this job instance, add to waitlist
                        unique = job["result"]["unique"]
                        _subjobs = subjobs.get(job_id, {}).get(unique, [])
                        for subjob_id in _subjobs:
                            try:
                                early_subjobs.append(unexpected.pop(subjob_id))
                            except KeyError:
                                pass
                            finally:
                                jobs.add(subjob_id)

                        total += len(_subjobs)

                    except KeyError:
                        unexpected[job_id] = job
                    finally:
                        if args.progress:
                            print("")

                if args.progress:
                    elapsed = time.time() - start_time
                    per_job = elapsed / done
                    eta = (total - done) * per_job

                    print("\033[F\033[K[%s] %s/%s jobs done (%s passed, %s failed.) " \
                            "ETA:" % (nicetime(elapsed), done, total, passed, failed), nicetime(eta), end="\r")

        if args.outfile:
            args.outfile.write(json.dumps(result_list))

        if args.progress:
            print("")

    except (KeyboardInterrupt, SystemExit):
        print("dwqc: cancelling...")
        Job.cancel_all(jobs)
        sys.exit(1)

    if failed > 0:
        sys.exit(1)
