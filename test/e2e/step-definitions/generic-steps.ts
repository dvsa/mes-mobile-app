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

Then("I should see the login screen", function() {
  return expect(
    element
      .all(by.css("ion-navbar:first-child"))
      .first()
      .getText()
  ).to.eventually.equal("DVSA");
});

Given("I am on the login page", function() {
  return browser.get("");
});

When("I click the {string} button", function(buttonName) {
  var buttonElement = element(
    by.xpath('//button[span[text()="' + buttonName + '"]]')
  );
  return buttonElement.click();
});

Then("I successfully log in and see the journal page", function() {
  return expect(
    element
      .all(by.css("span.mes-header-md"))
      .first()
      .getText()
  ).to.eventually.equal("Your Journal");
});

Given("I am logged in and on the journal page", function() {
  var loginButton = element(by.xpath('//button[span[text()="Ok"]]'));
  browser.get("");
  return loginButton.click();
});

Then("I have a slot at {string} for {string}", function(time, candidate) {
  return expect(
    element
      .all(
        by.xpath(
          '//ion-row[ion-col[div[@class="slot__time" and text()="' +
            time +
            '"]] and ion-col[div[@class="slot__candidate" and div[span[@class="mes-journal-candidate-name" and text()="' +
            candidate +
            '"]]]]]'
        )
      )
      .isPresent()
  ).to.eventually.equal(true);
});

// After hook to take screenshots of page on failure
After(function(testCase) {
  var world = this;
  if (testCase.result.status === Status.FAILED) {
    return browser.takeScreenshot().then(function(screenShot) {
      // screenShot is a base-64 encoded PNG
      world.attach(screenShot, "image/png");
    });
  }
});
