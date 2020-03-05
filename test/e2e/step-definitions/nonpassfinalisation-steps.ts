import { Then, When, Before } from 'cucumber';
import { by } from 'protractor';
import TempPage from '../pages/tempPage';
import NonPassFinalisationPage from '../pages/nonPassFinalisationPage';
import DebriefPage from '../pages/debriefPage';

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
  NonPassFinalisationPage.clickD255Yes();
  DebriefPage.clickDebriefWitnessedYes();
  NonPassFinalisationPage.clickContinueToBackOfficeButton(this.testCategory);
});

When('I click continue to proceed to the back to office page', () => {
  NonPassFinalisationPage.clickContinueToBackOfficeButton(this.testCategory);
});

When('I complete d255', () => {
  NonPassFinalisationPage.clickD255Yes();
});

When('I complete debrief witnessed', () => {
  DebriefPage.clickDebriefWitnessedYes();
});

When('I select activity code {string}', (activityCodeDesc) => {
  NonPassFinalisationPage.selectActivityCode(activityCodeDesc);
});

When('the D255 Radio is pre-selected to yes', () => {
  const d255PreselectedToYes = NonPassFinalisationPage.getD255Yes();
  expect(d255PreselectedToYes.isSelected()).to.eventually.be.true;
});

Then('the activity code should be {string}', (activityCode) => {
  const acitivityCodeField = NonPassFinalisationPage.getActivityCodeSelector();
  return expect(acitivityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('the nonpassfinalisation page test outcome is {string}', (testOutcome : string) => {
  const testOutcomeField = TempPage.getAndAwaitElement(by.id('office-page-test-outcome'));
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then('the transmission is selected', () => {
  NonPassFinalisationPage.selectManualTransmission();
});

