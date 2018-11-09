import { browser, WebDriver, element, by } from 'protractor';

const { Given, Then, When, setDefaultTimeout, After, Status } = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const basePage = require('../pages/page.js');

setDefaultTimeout(10 * 1000);

// Page contains text anywhere on the screen
Then('The page contains {string}', function(stringValue) {
  return expect(basePage.contains(stringValue)).to.eventually.equal(true);
});

// After hook to take screenshots of page on failure
After(function(testCase) {
  var world = this;
  //if (testCase.result.status === Status.FAILED) {
  return browser.takeScreenshot().then(function(screenShot) {
    // screenShot is a base-64 encoded PNG
    world.attach(screenShot, 'image/png');
  });
  //}
});
