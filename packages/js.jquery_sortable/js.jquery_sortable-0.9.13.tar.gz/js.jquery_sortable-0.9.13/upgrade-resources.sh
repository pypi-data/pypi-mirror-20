#!/usr/bin/env sh

if [ -d node_modules ]; then
  rm -rf node_modules
fi

npm install jquery-sortable

rm -rf js/jquery_sortable/resources/*
mv node_modules/jquery-sortable/source/js/jquery-sortable*.js js/jquery_sortable/resources/
rm -rf node_modules
