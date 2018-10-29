#!/usr/bin/env node
// Updates Cordova config.xml with a semver compatible version.
// The new version takes the format <existing-major>.<existing-minor>.<unix-timestamp>

var fs = require('fs');
var xml2js = require('xml2js');

const configFile = 'config.xml';

// Read config.xml
fs.readFile(configFile, 'utf8', (err, xml) => {
  if (err) {
    return console.console.error(err);
  }

  // Parse XML to JS Obj
  xml2js.parseString(xml, (err, obj) => {
    if (err) {
      return console.error(err);
    }

    const currentVersion = obj.widget['$'].version;
    const newVersion = `${currentVersion.slice(0, currentVersion.lastIndexOf('.'))}.${Math.floor(
      Date.now() / 1000
    )}`;
    obj.widget['$'].version = newVersion;

    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);

    fs.writeFile(configFile, xml, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Build number successfully incremented to ${newVersion}`);
    });
  });
});
