#!/usr/bin/env python
"""
_Startup_

Runtime environment startup script
"""
from __future__ import print_function

import os
import time
import WMCore.WMRuntime.Bootstrap as Bootstrap

if __name__ == '__main__':
    print("Startup.py : %s : loading job definition" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    job = Bootstrap.loadJobDefinition()
    print("Startup.py : %s : loading task" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    task = Bootstrap.loadTask(job)
    print("Startup.py : %s : setting up monitoring" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    logLocation = "Report.%i.pkl" % job['retry_count']
    Bootstrap.createInitialReport(job=job, logLocation=logLocation)
    monitor = Bootstrap.setupMonitoring(logPath=logLocation)

    print("Startup.py : %s : setting up logging" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    Bootstrap.setupLogging(os.getcwd())

    print("Startup.py : %s : building task" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    task.build(os.getcwd())
    print("Startup.py : %s : executing task" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    task.execute(job)
    print("Startup.py : %s : completing task" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    task.completeTask(jobLocation=os.getcwd(),
                      logLocation=logLocation)
    print("Startup.py : %s : shutting down monitor" % time.strftime("%Y-%m-%dT%H:%M:%S"))
    os.fchmod(1, 0o664)
    os.fchmod(2, 0o664)
    if monitor.isAlive():
        monitor.shutdown()
