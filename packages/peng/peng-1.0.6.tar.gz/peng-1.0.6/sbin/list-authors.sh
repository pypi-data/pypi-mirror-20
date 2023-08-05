#!/bin/bash
# list-authors.sh
# Copyright (c) 2013-2017 Pablo Acosta-Serafini
# See LICENSE for details

echo "Project committers:"
echo "-------------------"
git log --format='%aN <%aE>' | sort -u
