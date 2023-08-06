#!/bin/bash
# Launch script for local shell jobs


# Executes everything from the base directory (Launchgen.out, set as $BASE).
#
# When starting, $STDOUT, $STDERR, $DONE and $FAIL are removed, and the last two
# are re-created as empty files. If CMD executes successfully, $FAIL is removed.
#
# The script exits at the first failing command.


##################################################
# Environment preparation

# Early fail
set -e

# Absolute path to base directory
# (LAUNCHER cannot be outside BASE)
BASE=`readlink -f $0`
BASE=${BASE%@LAUNCHER@}
# Start at base directory
cd $BASE

# Create output directories
mkdir -p `dirname @STDOUT@`
mkdir -p `dirname @STDERR@`
mkdir -p `dirname @DONE@`
mkdir -p `dirname @FAIL@`

# Absolute paths to important directories / files
STDOUT=`readlink -f @STDOUT@`
STDERR=`readlink -f @STDERR@`
FAIL=`readlink -f @FAIL@`
DONE=`readlink -f @DONE@`

# Start with a clean slate
rm -Rf $STDOUT
rm -Rf $STDERR
rm -Rf $FAIL && touch $FAIL
rm -Rf $DONE && touch $DONE


##################################################
# Run user-specified commands

# Create a separate script with the user's commands; needed to run it with
# 'stdbuf', which unbuffers stdout/stderr to see CMD's output in its original
# order.
CMDFILE=`mktemp`
function cmdcleanup() {
    rm -f $CMDFILE
}
trap cmdcleanup EXIT
cat >$CMDFILE <<'__EOF_CMDFILE__'
stdbuf -o0 -e0 echo -n
# Early fail
set -e
# Early abort on first error (including inside a chain of pipes)
set -o pipefail;
@CMD@
__EOF_CMDFILE__

# Export relevant variables
export BASE STDOUT STDERR DONE FAIL

# Copy stdout/stderr to STDOUT/STDERR (but do not completely redirect them)
stdbuf -o0 -e0 bash $CMDFILE 1> >(tee -a $STDOUT) 2> >(tee -a $STDERR >&2)


##################################################
# Error checking

# Ensure the job will be detected as done, and not as failed
touch $DONE
rm -Rf $FAIL
