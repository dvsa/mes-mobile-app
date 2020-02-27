import { Then, When, Before } from 'cucumber';
import { getElement } from './generic-steps';
import { by } from 'protractor';
import { textFieldInputViaNativeMode } from '../../helpers/helpers';
import TempPage from '../pages/tempPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

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

When('I end the debrief', () => {
  const endDebriefButton = getElement(by.xpath('//button[span[h3[text()="End debrief"]]]'));
  TempPage.clickElement(endDebriefButton);
});

When('I end the welsh debrief', () => {
  const endDebriefButton = getElement(by.xpath('//button[span[h3[text()="Diwedd ôl-drafodaeth"]]]'));
  TempPage.clickElement(endDebriefButton);
});

When('I complete the pass details', () => {
  completePassdetails();
  selectTransmission('manual');
  continuePassFinalisation();
});

When('I select the code 78 option', () => {
  code78onLicence(false);
});

When('I complete the pass details with an automatic transmission', () => {
  completePassdetails();
  selectTransmission('automatic');
  continuePassFinalisation();
});

When('I complete the fail details', () => {
  if (this.testCategory === 'c' || this.testCategory === 'c1') {
    selectTransmission('manual');
  }
  const d255NoRadio = getElement(by.id('d255-no'));
  TempPage.clickElement(d255NoRadio);
  const debriefWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  TempPage.clickElement(debriefWitnessedRadio);
  const submitButton = getElement(by.id('continue-button'));
  TempPage.clickElement(submitButton);
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
  TempPage.clickElement(continueButton);
};

const completePassdetails = () => {
  textFieldInputViaNativeMode('//XCUIElementTypeOther[XCUIElementTypeOther[@name="Pass certificate number"]]/'
  + 'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', 'A123456X');
  const licenceRecievedRadio = getElement(by.id('license-received'));
  TempPage.clickElement(licenceRecievedRadio);
  const d255YesRadio = getElement(by.id('d255-yes'));
  TempPage.clickElement(d255YesRadio);
  const debreifWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  TempPage.clickElement(debreifWitnessedRadio);
};

const code78onLicence = (result: boolean) => {
  const radio = result ? 'code-78-received' : 'code-78-not-received';
  const code78Radio = getElement(by.id(`${radio}`));
  TempPage.clickElement(code78Radio);
};

const selectTransmission = (transmissionType: string) => {
  const transmissionRadio = getElement(by.id(`transmission-${transmissionType}`));
  TempPage.clickElement(transmissionRadio);
};
