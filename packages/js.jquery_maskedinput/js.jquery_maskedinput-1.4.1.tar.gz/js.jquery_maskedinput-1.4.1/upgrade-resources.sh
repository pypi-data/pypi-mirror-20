#!/usr/bin/env sh

if [ -d node_modules ]; then
  rm -rf node_modules
fi

npm install jquery.maskedinput

rm -rf js/jquery_maskedinput/resources/*
mv /Users/disko/.virtualenvs/fanstatic/js.jquery_maskedinput/node_modules/jquery.maskedinput/src/jquery.maskedinput.js js/jquery_maskedinput/resources/
rm -rf node_modules
