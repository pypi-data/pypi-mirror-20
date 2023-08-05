#!/usr/bin/env sh

if [ -d node_modules ]; then
  rm -rf node_modules
fi

npm install jquery-maskmoney

rm -rf js/jquery_maskmoney/resources/*
mv node_modules/jquery-maskmoney/dist/* js/jquery_maskmoney/resources/
rm -rf node_modules
