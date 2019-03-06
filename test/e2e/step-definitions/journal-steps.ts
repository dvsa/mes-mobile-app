import { browser, ExpectedConditions, element, by } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import { loggedInAs, logout, logInToApplication, loadApplication, getElement, clickElement } from './generic-steps';

const {
  Given,
  Then,
  When,
} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

Given('I am on the journal page as {string}', (username) => {
    // If we are not already logged in do so now and then load the application
  loggedInAs(TEST_CONFIG.users[username].employeeId).then((response) => {
    if (!response) {
        // If not logged in as the right user logout and log in as the correct user
      logout();
      logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
    }
  });

  loadApplication().then(() => {
      // Small wait to make sure the action has initiated
    browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
  });

    // If the journal page is loaded we should have a refresh button
  browser.wait(ExpectedConditions.presenceOf(element(by.xpath('//button/span/span/span[text() = "Refresh"]'))));
});

When('I view candidate details for {string}', (candidateName) => {
  const buttonElement = getElement(by.xpath(`//h3[text()[normalize-space(.) = "${candidateName}"]]`));
  return clickElement(buttonElement);
});

When('I start the test for {string}', (candidateName) => {
  const buttonElement = getElement(by.xpath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  return clickElement(buttonElement);
});

Then('I have a special needs slot for {string}', (candidateName) => {
  const exclamationIndicator = getElement(by.xpath(`//indicators/div/img[@class = "exclamation-indicator"]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

Then('I have a welsh slot for {string}', (candidateName) => {
  const exclamationIndicator = getElement(by.xpath(`//ion-grid/ion-row/language/div[@class = "welsh-language-indicator"]
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

When('I refresh the journal', () => {
  const refreshButton = getElement(by.xpath('//button/span/span/span[text() = "Refresh"]'));
  return clickElement(refreshButton);
});
