#!/bin/bash

source ./otcclient/tests/VER

echo "$TEST $VER TEST $VER" >"$TEST-$VER.txt"

for i in `ls -v otcclient/tests/[0-9]*.sh`; do /bin/bash ./$i; done

echo "$TEST-$VER.txt"

 