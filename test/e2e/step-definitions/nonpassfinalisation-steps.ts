import { Before, Then, When } from 'cucumber';
import { DebriefPage } from '../helper/debriefPage/debriefPage';
import { NonPassFinalisationPage } from '../helper/nonPassFinalisationPage/nonPassFinalisationPage';
import { NonPassFinalisationPageObject } from '../helper/nonPassFinalisationPage/nonPassFinalisationPage.po';

const debriefPage : DebriefPage = new DebriefPage();
const nonPassFinalisationPage : NonPassFinalisationPage = new NonPassFinalisationPage();
const nonPassFinalisationElement : NonPassFinalisationPageObject = new NonPassFinalisationPageObject();

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

When('I continue to the back to office page', async () => {
  if (this.testCategory !== 'cpc') {
    await nonPassFinalisationPage.clickD255Yes();
  }
  await debriefPage.clickDebriefWitnessedYes();
  await nonPassFinalisationPage.clickContinueToBackOfficeButton(this.testCategory);
});

When('I click continue to proceed to the back to office page', async () => {
  await nonPassFinalisationPage.clickContinueToBackOfficeButton(this.testCategory);
});

When('I complete d255', async () => {
  await nonPassFinalisationPage.clickD255Yes();
});

When('I complete debrief witnessed', async () => {
  await debriefPage.clickDebriefWitnessedYes();
});

When('I select activity code {string}', async (activityCodeDesc) => {
  await nonPassFinalisationPage.selectActivityCode(activityCodeDesc);
});

When('the D255 Radio is pre-selected to yes', () => {
  const d255PreselectedToYes = nonPassFinalisationElement.d255Yes;
  expect(d255PreselectedToYes.isSelected()).to.eventually.be.true;
});

Then('the activity code should be {string}', (activityCode) => {
  const acitivityCodeField = nonPassFinalisationElement.activityCodeSelector;
  return expect(acitivityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('the transmission is selected', async () => {
  await nonPassFinalisationPage.selectManualTransmission();
});
