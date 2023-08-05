#!/bin/bash

if [ "$#" != "1" ]; then
    echo "Must pass release version!"
    exit 1
fi

version=$1
name=resultsdb_conventions
sed -i -e "s,version = \".*\",version = \"${version}\", g" setup.py
git add setup.py
git commit -m "Release ${version}"
git push -u origin master
git tag -m "Release ${version}" -a ${version}
git push origin ${version}
# FIXME: this is wrong, but hopefully works until i can find the right
# version of this damn script
git archive --format=tar --prefix=${name}-${version}/ ${version} > dist/${name}-${version}.tar
xz dist/${name}-${version}.tar
# FIXME: need scp upload for Pagure:
# https://pagure.io/pagure/issue/851
# Uploading manually via web UI for now
