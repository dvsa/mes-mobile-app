import { Then, When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I end the debrief', () => {
  const endDebriefButton = getElement(by.xpath('//button[span[h3[text()="End debrief"]]]'));
  clickElement(endDebriefButton);
});

When('I complete the pass details', () => {
  const passCertificateNumberField = getElement(by.id('pass-certificate-number'));
  passCertificateNumberField.sendKeys('123456789');
  const licenceRecievedRadio = getElement(by.id('license-received'));
  clickElement(licenceRecievedRadio);
  const continueButton = getElement(by.xpath('//page-pass-finalisation//button[span[h3[text() = "Continue"]]]'));
  clickElement(continueButton);
});

Then('I should see the Debrief page with outcome {string}', (outcome) => {
  const testOutcome = getElement(by.xpath('//page-debrief//div[@id = "test-outcome-background"]/div/h1'));
  return expect(testOutcome.getText()).to.eventually.equal(outcome);
});
