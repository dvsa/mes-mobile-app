import { Then, When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

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

const selectActivityCode = (activityCodeDesc) => {
  const activitySelector = getElement(by.id('activity-code-selector'));
  clickElement(activitySelector);
  const activityItem = getElement(by.xpath(`//button/span/div[@class='alert-radio-label']
  [normalize-space(text()) = '${activityCodeDesc}']`));
  clickElement(activityItem);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);
};

const enterD255 = () => {
  const d255Radio = getElement(by.id('d255-yes'));
  clickElement(d255Radio);
};

const enterDebriefWitnessed = () => {
  const debriefWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  clickElement(debriefWitnessedRadio);
};

Then('the activity code should be {string}', (activityCode) => {
  const acitivityCodeField = getElement(by.id('activity-code-selector'));
  return expect(acitivityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('the nonpassfinalisation page test outcome is {string}', (testOutcome : string) => {
  const testOutcomeField = getElement(by.id('office-page-test-outcome'));
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

const clickContinue = () => {
  const continueToBackToOfficeButton = getElement(
    by.xpath('//div[contains(@class, "non-pass-finalisation-cat-b-page")]//button[@id = "continue-button"]'));
  clickElement(continueToBackToOfficeButton);
};
