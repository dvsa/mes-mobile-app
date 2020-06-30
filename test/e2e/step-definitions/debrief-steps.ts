import { Then, When, Before } from 'cucumber';
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

When('I end the debrief', () => {
  DebriefPage.clickEndDebriefButton();
});

When('I end the welsh debrief', () => {
  DebriefPage.clickEndDebriefButtonWelsh();
});

When('I complete the pass details', () => {
  DebriefPage.completePassdetails(this.testCategory);
  if(this.testCategory !== 'home-test'){
    DebriefPage.selectTransmission('manual');
  }
  DebriefPage.continuePassFinalisation(this.testCategory);
});

When('I select the code 78 no option', () => {
  DebriefPage.clickCode78NotReceived();
});

When('I select the code 78 yes option', () => {
  DebriefPage.clickCode78Received();
});

When('I complete the pass details with an automatic transmission', () => {
  DebriefPage.completePassdetails(this.testCategory);
  DebriefPage.selectTransmission('automatic');
  DebriefPage.continuePassFinalisation(this.testCategory);
});

When('I complete the fail details', () => {
  if (this.testCategory === 'c' || this.testCategory === 'c1' || this.testCategory === 'd') {
    DebriefPage.selectTransmission('manual');
  }
  DebriefPage.clickD255No();
  DebriefPage.clickDebriefWitnessedYes();
  // TODO: There seem to be 2 continue buttons...are they on different pages?
  DebriefPage.clickContinueButton2();
  // const submitButton = TempPage.getElement(by.id('continue-button'));
  // TempPage.clickElement(submitButton);
});

When('I try to confirm the pass certificate details', () => {
  DebriefPage.continuePassFinalisation(this.testCategory);
});

Then('I should see the Debrief page with outcome {string}', (outcome) => {
  const testOutcome = DebriefPage.getTestOutcome(this.testCategory);
  return expect(testOutcome.getText()).to.eventually.equal(outcome);
});

Then('I see a {string} fault for {string}', (faultSeverity, faultDescription) => {
  const faultElement = DebriefPage.getFaultElement(faultSeverity, faultDescription);
  return expect(faultElement.isPresent()).to.eventually.be.true;
});

Then('I see a {string} questions for {string}', (faultSeverity, faultDescription) => {
  const faultElement = DebriefPage.getQuestionsElement(faultSeverity, faultDescription);
  return expect(faultElement.isPresent()).to.eventually.be.true;
});

Then('I see a vehicle check fault for {string}', (faultDescription) => {
  const faultElement = DebriefPage.getVehicleCheckElement(faultDescription);
  return expect(faultElement.isPresent()).to.eventually.be.true;
});

Then('I should see the application reference {string}', (applicationRef) => {
  const applicationRefField = DebriefPage.getApplicationRefField();
  return expect(applicationRefField.getText()).to.eventually.equal(applicationRef);
});
