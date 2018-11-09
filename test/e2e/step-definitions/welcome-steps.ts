import { browser, WebDriver, element, by } from 'protractor';

const { Given, Then, When, setDefaultTimeout, After, Status } = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

setDefaultTimeout(10 * 1000);

const welcomePage = require('../pages/welcome-page.js');

////////////////////////////////// Login Page //////////////////////////////////
Given('I am a mobile app user', function() {
  // Some sort of authentication setup
});

When('I launch the mobile app', function() {
  return launchApplication();
});

Then('I should see the login screen', function() {
  return validateWelcomePage();
});

Given('I am on the login page', function() {
  launchApplication();
  return validateWelcomePage();
});

When('I click the Ok button', function() {
  return welcomePage.clickOk();
});

function launchApplication() {
  return welcomePage.open();
}

function validateWelcomePage() {
  return expect(welcomePage.getPageTitle()).to.eventually.equal('Welcome');
}
