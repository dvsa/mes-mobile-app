#!/bin/sh
rm -rf platforms/ plugins/
cordova rm platform ios
cordova add platform ios
ionic cordova build ios
