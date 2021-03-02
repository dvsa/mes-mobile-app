import { Before, Then, When } from 'cucumber';
import { DebriefPage } from '../helper/debriefPage/debriefPage';
import { debriefPageObject } from '../helper/debriefPage/debriefPage.po';

const debriefPage: DebriefPage = new DebriefPage();
const debriefPageElement: debriefPageObject = new debriefPageObject();

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

When('I end the debrief', async () => {
  await debriefPage.clickEndDebriefButton();
});

When('I end the welsh debrief', async () => {
  await debriefPage.clickEndDebriefButtonWelsh();
});

When('I complete the pass details', async () => {
  await debriefPage.completePassdetails(this.testCategory);
  if (this.testCategory !== 'home-test' && this.testCategory !== 'adi-part2' && this.testCategory !== 'cpc') {
    await debriefPage.selectTransmission('manual');
  }
  await debriefPage.continuePassFinalisation(this.testCategory);
});

When('I select the code 78 no option', async () => {
  await debriefPage.clickCode78NotReceived();
});

When('I select the code 78 yes option', async () => {
  await debriefPage.clickCode78Received();
});

When('I complete the pass details with an automatic transmission', async () => {
  await debriefPage.completePassdetails(this.testCategory);
  await debriefPage.selectTransmission('automatic');
  await debriefPage.continuePassFinalisation(this.testCategory);
});

When('I complete the fail details', async () => {
  if (this.testCategory === 'c' || this.testCategory === 'c1' || this.testCategory === 'd') {
    await debriefPage.selectTransmission('manual');
  }
  if (this.testCategory !== 'adi-part2') {
    await debriefPage.clickD255No();
  }
  await debriefPage.clickDebriefWitnessedYes();
  // TODO: There seem to be 2 continue buttons...are they on different pages?
  await debriefPage.clickContinueButton2();
  // const submitButton = TempPage.getElement(by.id('continue-button'));
  // TempPage.clickElement(submitButton);
});

When('I try to confirm the pass certificate details', async () => {
  await debriefPage.continuePassFinalisation(this.testCategory);
});

Then('I should see the Debrief page with outcome {string}', async (outcome) => {
  const testOutcome = await debriefPageElement.getTestOutcome(this.testCategory);
  return expect(await testOutcome.getText()).to.eventually.equal(outcome);
});

Then('I see a {string} fault for {string}', async (faultSeverity, faultDescription) => {
  const faultElement = await debriefPageElement.getFaultElement(faultSeverity, faultDescription);
  return expect(await faultElement.isPresent()).to.eventually.be.true;
});

Then('I see a {string} questions for {string}', async (faultSeverity, faultDescription) => {
  const faultElement = await debriefPageElement.getQuestionsElement(faultSeverity, faultDescription);
  return expect(await faultElement.isPresent()).to.eventually.be.true;
});

Then('I see a vehicle check fault for {string}', async (faultDescription) => {
  const faultElement = await debriefPageElement.getVehicleCheckElement(faultDescription);
  return expect(await faultElement.isPresent()).to.eventually.be.true;
});

Then('I should see the application reference {string}', async (applicationRef) => {
  // @ts-ignore
  const applicationRefField = await debriefPageElement.ApplicationRefField();
  return expect(await applicationRefField.getText()).to.eventually.equal(applicationRef);
});
