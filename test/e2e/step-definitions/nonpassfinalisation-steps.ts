import { Then, When, Before } from 'cucumber';
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

Before({ tags: '@cata' }, () => {
  this.testCategory = 'a-mod1';
});

Before({ tags: '@catm2' }, () => {
  this.testCategory = 'a-mod2';
});

Before({ tags: '@catd' }, () => {
  this.testCategory = 'd';
});

Before({ tags: '@catHome' }, () => {
  this.testCategory = 'home-test';
});

Before({ tags: '@catADI2' }, () => {
  this.testCategory = 'adi-part2';
});

Before({ tags: '@catcpc' }, () => {
  this.testCategory = 'cpc';
});

When(/^I continue to the back to office page( from a eyesight fail)?/, (eyesightStatus) => {
  if (eyesightStatus === ' from a eyesight fail') {
    DebriefPage.clickDebriefWitnessedYes();
  }
  if (eyesightStatus !== ' from a eyesight fail') {
    if (this.testCategory !== 'cpc') {
      NonPassFinalisationPage.clickD255Yes();
    }
    DebriefPage.clickDebriefWitnessedYes();
  }
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

Then('the transmission is selected', () => {
  NonPassFinalisationPage.selectManualTransmission();
});
