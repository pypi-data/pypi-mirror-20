# pingsweep
Lightweight Pingsweeper - quickly ping many hosts

# Description

This utility provides a simple interface allowing a user to quickly ping a large group of hosts by IPv4 address or by hostname.

============================================

 - begin enumeration on unknown networks
 - check connectivity of a list of networked devices
 - define a custom ping timeout for faster or more thorough scans
 - default output is in a list-friendly format


# Usage

pingsweep [options] ip_range

=============================

```
pingsweep -h

Usage: pingsweep [options] ip_range

Examples:
  pingsweep 10.0.0.0/24
  pingsweep 10.0.0.0-255
  pingsweep 10.0.0.0 10.0.0.255


Options:
  -h, --help                    show this help message and exit
  -d, --debug                   display all pings, failed and successful
  -l IP_FILE, --list=IP_FILE    define a text file of one IP per line to ping
  -n, --hostnames               Attempt to resolve hostnames for successful pings
  -r, --reverse                 display failed pings instead of successful pings
  -t TIMEOUT, --timeout=TIMEOUT define a ping timeout in miliseconds (default is 200)
  -v, --verbose                 include fping statistics for each ping
 ```

# Installation
pingsweep is available as an installable python module. Try running:
```
pip install pingsweep
```
Or you can download and run pingsweep.py from this repo.


