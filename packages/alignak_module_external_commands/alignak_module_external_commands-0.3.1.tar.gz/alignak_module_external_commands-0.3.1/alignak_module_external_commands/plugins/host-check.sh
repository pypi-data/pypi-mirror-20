#!/bin/bash

# This script will write a command to the Alignak command
# file to cause Alignak to process a passive service check
# result.  Note: This script is intended to be run on the
# same host that is running Alignak.  If you want to
# submit passive check results from a remote machine, look
# at using the nsca addon.
#
# Arguments:
#  $1 = host_name (Short name of host that the service is
#       associated with)
#  $2 = return_code (An integer that determines the state
#       of the service check, 0=OK, 1=WARNING, 2=CRITICAL,
#       3=UNKNOWN).
#  $3 = plugin_output (A text string that should be used
#       as the plugin output for the service check)
#

echocmd="/bin/echo"

CommandFile="/tmp/alignak.cmd"

# get the current date/time in seconds since UNIX epoch
datetime=`date +%s`

# create the command line to add to the command file
cmdline="[$datetime] PROCESS_HOST_CHECK_RESULT;$1;$2;$3"

# append the command to the end of the command file
`$echocmd $cmdline >> $CommandFile`
