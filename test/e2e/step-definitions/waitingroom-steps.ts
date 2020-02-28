import { Then, When, Before } from 'cucumber';
import { getElement, clickElement, enterPasscode } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// Set default category to be cat b
this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  this.testCategory = 'be';
});

Before({ tags: '@catc' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catce' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'c';
});

When('the candidate enters a new email address', () => {
  const newEmailRadio = getElement(by.id('newEmail'));
  clickElement(newEmailRadio);
  const newEmailAddressField = getElement(by.id('newEmailInput'));
  newEmailAddressField.sendKeys('testemail@example.com');
});

When('the candidate requests to receive results by post', () => {
  const postalAddressRadio = getElement(by.id('postalAddress'));
  clickElement(postalAddressRadio);
});

When(/^the candidate confirms their (communication preference|declaration)$/, (pageName) => {
  const pageType = (pageName === 'communication preference' ? `communication-cat-${this.testCategory}-page`
  : `waiting-room-cat-${this.testCategory}-page`);

  const continueButton = getElement(
    by.xpath(`//div[contains(@class, '${pageType}')]//button[@id = 'continue-button']`));

  clickElement(continueButton);
});

When('the candidate completes the declaration page', () => {
  const declarationCheckbox = getElement(by.id('insurance-declaration-checkbox'));
  clickElement(declarationCheckbox);
  const residencyCheckbox = getElement(by.id('residency-declaration-checkbox'));
  clickElement(residencyCheckbox);
  const signatureField = getElement(by.xpath('//signature-pad/canvas'));
  clickElement(signatureField);
});

When('I proceed to the car', () => {
  // Examiner clicks continue button then enters passcode
  const continueButton = getElement(by.xpath(
    `//div[contains(@class, "communication-cat-${this.testCategory}-page")]//button[@id ="continue-button"]`));
  clickElement(continueButton);
  enterPasscode();
});

Then('the email {string} has been provided and is preselected', (emailAddress) => {
  const providedEmailRadio = getElement(by.id('providedEmail'));
  expect(providedEmailRadio.isSelected()).to.eventually.be.true;
  const providedEmailValue = getElement(by.id('providedEmailInput'));
  return expect(providedEmailValue.getText()).to.eventually.equal(emailAddress);
});
