import { browser, WebDriver, element, by } from "protractor";

const {
  Given,
  Then,
  When,
  setDefaultTimeout,
  After,
  Status
} = require("cucumber");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

setDefaultTimeout(10 * 1000);

Given("I am a mobile app user", function() {
  // Some sort of authentication setup
});

When("I launch the mobile app", function() {
  return browser.get("");
});

Then("I should see the {string} page", function(pageTitle) {
  return expect(element.all(by.className('toolbar-title')).last().getText()).to.eventually.equal(pageTitle);
});

Given("I am on the login page", function() {
  return browser.get("");
});

When("I log in to the application", function() {
  var buttonElement = element(by.xpath('//button/span[text() = "Journal"]'));
  return buttonElement.click();
});

// After hook to take screenshots of page on failure
After(function(testCase) {
  var world = this;
  //if (testCase.result.status === Status.FAILED) {
    return browser.takeScreenshot().then(function(screenShot) {
      // screenShot is a base-64 encoded PNG
      world.attach(screenShot, "image/png");
    });
  //}
});
