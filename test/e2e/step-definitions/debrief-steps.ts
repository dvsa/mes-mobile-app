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
  passCertificateNumberField.sendKeys('A123456&');
  const licenceReceivedRadio = getElement(by.id('license-received'));
  clickElement(licenceReceivedRadio);
  const d255YesRadio = getElement(by.id('d255-yes'));
  clickElement(d255YesRadio);
  const englishPrefRadio = getElement(by.id('lang-pref-english'));
  clickElement(englishPrefRadio);
  const debreifWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  clickElement(debreifWitnessedRadio);
  continuePassFinalisation();
});

When('I try to confirm the pass certificate details', () => {
  continuePassFinalisation();
});

Then('I should see {string} transmission is selected', (transmissionType) => {
  const transmissionRadio = getElement(
    by.xpath(`//page-pass-finalisation-cat-b-page//input[@id='transmission-${transmissionType}']`));
  return expect(transmissionRadio.isSelected()).to.eventually.be.true;
});

Then('I should see the Debrief page with outcome {string}', (outcome) => {
  const testOutcome = getElement(by.xpath('//debrief-cat-b-page//div[@id = "test-outcome-background"]/div/h1'));
  return expect(testOutcome.getText()).to.eventually.equal(outcome);
});

Then('I see a {string} fault for {string}', (faultSeverity, faultDescription) => {
  const faultElement = getElement(by.xpath(`//ion-card[@id = '${faultSeverity}-fault']
  //div[text() = '${faultDescription}']`));
  return expect(faultElement.isPresent()).to.eventually.be.true;
});

Then('I should see the application reference {string}', (applicationRef) => {
  const applicationRefField = getElement(by.xpath('//ion-row[@id="application-reference-card"]/ion-col/span'));
  return expect(applicationRefField.getText()).to.eventually.equal(applicationRef);
});

const continuePassFinalisation = () => {
  const continueButton = getElement(
    by.xpath('//page-pass-finalisation-cat-b-page//button[span[h3[text() = "Continue"]]]'));
  clickElement(continueButton);
};
