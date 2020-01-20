import { Then, When, Before } from 'cucumber';
import { getElement, clickElement, nativeTextEntry } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// Set default category to be cat b
this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  // This hook will be executed before scenarios tagged with @catbe
  this.testCategory = 'be';
});

When('I end the debrief', () => {
  const endDebriefButton = getElement(by.xpath('//button[span[h3[text()="End debrief"]]]'));
  clickElement(endDebriefButton);
});

When('I complete the pass details', () => {
  nativeTextEntry('Pass certificate number', 'A123456X');

  const licenceRecievedRadio = getElement(by.id('license-received'));
  clickElement(licenceRecievedRadio);
  const d255YesRadio = getElement(by.id('d255-yes'));
  clickElement(d255YesRadio);
  const englishPrefRadio = getElement(by.id('lang-pref-english'));
  clickElement(englishPrefRadio);
  const debreifWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  clickElement(debreifWitnessedRadio);
  const transmissionRadio = getElement(by.id('transmission-manual'));
  clickElement(transmissionRadio);
  continuePassFinalisation();
});

When('I complete the fail details', () => {
  const d255NoRadio = getElement(by.id('d255-no'));
  clickElement(d255NoRadio);
  const debreifWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  clickElement(debreifWitnessedRadio);
  const submitButton = getElement(by.id('continue-button'));
  clickElement(submitButton)
});

When('I try to confirm the pass certificate details', () => {
  continuePassFinalisation();
});

Then('I should see the Debrief page with outcome {string}', (outcome) => {
  const testOutcome = getElement(by.xpath(
    `//div[contains(@class, "debrief-cat-${this.testCategory}-page")]//div[@id = "test-outcome-background"]/div/h1`));
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
  const continueButton = getElement(by.xpath(
  `//div[contains(@class, "pass-finalisation-cat-${this.testCategory}-page")]//button[span[h3[text() = "Continue"]]]`));
  clickElement(continueButton);
};
