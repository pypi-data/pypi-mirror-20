The script attempts to detect thrashing situations and temporary stop rogue processes, 
hopefully before things get too much out of control, hopefully giving a sysadm enough time 
to investigate and handle the situation if there is a sysadm around, and if not - hopefully 
allowing boxes to become just slightly degraded instead of completely thrashed, all until the offending 
processes ends or the oom killer kicks in.

As of 2014-09, the development seems to have stagnated - for the very simple reason that 
it seems to work well enough for me.

