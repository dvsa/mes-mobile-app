import { Then, When, Before } from 'cucumber';
import { by } from 'protractor';
import { getElement } from '../../helpers/interactionHelpers';
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

When('I continue to the back to office page', () => {
  enterD255();
  enterDebriefWitnessed();
  clickContinue();
});

When('I click continue to proceed to the back to office page', () => {
  clickContinue();
});

When('I complete d255', () => {
  enterD255();
});

When('I complete debrief witnessed', () => {
  enterDebriefWitnessed();
});

When('I select activity code {string}', (activityCodeDesc) => {
  selectActivityCode(activityCodeDesc);
});

When('the D255 Radio is pre-selected to yes', () => {
  const d255PreselectedToYes = TempPage.getAndAwaitElement(by.id('d255-yes'));
  expect(d255PreselectedToYes.isSelected()).to.eventually.be.true;
});

Then('the activity code should be {string}', (activityCode) => {
  const acitivityCodeField = TempPage.getAndAwaitElement(by.id('activity-code-selector'));
  return expect(acitivityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('the nonpassfinalisation page test outcome is {string}', (testOutcome : string) => {
  const testOutcomeField = TempPage.getAndAwaitElement(by.id('office-page-test-outcome'));
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then('the transmission is selected', () => {
  selectTransmission(true);
});

const clickContinue = () => {
  const continueToBackToOfficeButton = TempPage.getAndAwaitElement(by.xpath(
    `//div[contains(@class, "non-pass-finalisation-cat-${this.testCategory}-page")]//button[@id = "continue-button"]`));
  TempPage.clickElement(continueToBackToOfficeButton);
};

const selectTransmission = (transmission: boolean) => {
  const transmissionSelector = (transmission) ? 'transmission-manual' : 'transmission-automatic';
  const transmissionRadio = TempPage.getAndAwaitElement(by.id(transmissionSelector));
  TempPage.clickElement(transmissionRadio);
};

const selectActivityCode = (activityCodeDesc) => {
  const activitySelector = TempPage.getAndAwaitElement(by.id('activity-code-selector'));
  TempPage.clickElement(activitySelector);
  const activityItem = TempPage.getAndAwaitElement(by.xpath(`//button/span/div[@class='alert-radio-label']
  [normalize-space(text()) = '${activityCodeDesc}']`));
  TempPage.clickElement(activityItem);
  const submitDialog = TempPage.getAndAwaitElement(by.xpath('//button[span[text() = "Submit"]]'));
  TempPage.clickElement(submitDialog);
};

const enterD255 = () => {
  const d255Radio = TempPage.getAndAwaitElement(by.id('d255-yes'));
  TempPage.clickElement(d255Radio);
};

const enterDebriefWitnessed = () => {
  const debriefWitnessedRadio = TempPage.getAndAwaitElement(by.id('debrief-witnessed-yes'));
  TempPage.clickElement(debriefWitnessedRadio);
};
