#!/bin/sh
rm -rf platforms/ plugins/
cordova platform rm ios
cordova platform add ios
ionic cordova build ios
