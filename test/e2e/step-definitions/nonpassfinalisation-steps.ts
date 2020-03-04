import { Then, When, Before } from 'cucumber';
import DebriefPage from '../pages/debriefPage';
import NonPassFinalisationPage from '../pages/nonPassFinalisationPage';

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
  DebriefPage.clickD255Yes();
  DebriefPage.clickDebriefWitnessedYes();
  DebriefPage.clickContinueToNonPassFinalisationButton(this.testCategory);
});

When('I click continue to proceed to the back to office page', () => {
  DebriefPage.clickContinueToNonPassFinalisationButton(this.testCategory);
});

When('I complete d255', () => {
  DebriefPage.clickD255Yes();
});

When('I complete debrief witnessed', () => {
  DebriefPage.clickDebriefWitnessedYes();
});

When('I select activity code {string}', (activityCodeDesc) => {
  NonPassFinalisationPage.selectActivityCode(activityCodeDesc);
});

When('the D255 Radio is pre-selected to yes', () => {
  const d255PreselectedToYes = DebriefPage.getD255Yes();
  expect(d255PreselectedToYes.isSelected()).to.eventually.be.true;
});

Then('the activity code should be {string}', (activityCode) => {
  const activityCodeField = NonPassFinalisationPage.getActivityCodeSelector();
  return expect(activityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('the nonpassfinalisation page test outcome is {string}', (testOutcome : string) => {
  const testOutcomeField = NonPassFinalisationPage.getTestOutcome();
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then('the transmission is selected', () => {
  NonPassFinalisationPage.selectManualTransmission();
});
