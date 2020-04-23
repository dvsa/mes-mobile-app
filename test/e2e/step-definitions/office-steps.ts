import { Then, When, Before } from 'cucumber';
import OfficePage from '../pages/OfficePage';
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
  this.testCategory = 'ce';
});

Before({ tags: '@cata' }, () => {
  this.testCategory = 'a-mod1';
});

Before({ tags: '@catd' }, () => {
  this.testCategory = 'd';
});

When('I complete the office write up', () => {
  if (!(this.testCategory === 'a-mod1')) {
    OfficePage.enterRouteNumber('2');
    if (this.testCategory === 'be' || this.testCategory === 'c' || this.testCategory === 'c1' || this.testCategory === 'ce') {
      OfficePage.enterIndependentDriving('diagram');
    } else {
      OfficePage.enterIndependentDriving('satnav');
      OfficePage.enterShowMe('S5 - Horn');
    }
  } else {
    OfficePage.clickCircuit('left');
  }
  OfficePage.enterCandidateDescription();
  OfficePage.enterWeatherConditions();
});

When('I complete the office write up with Not applicable to independent driving and show me question', () => {
  OfficePage.enterRouteNumber('4');
  OfficePage.enterIndependentDriving('na');
  OfficePage.enterCandidateDescription();
  OfficePage.enterShowMe('N/A - Not applicable');
  OfficePage.enterWeatherConditions();
});

When('I upload the test', () => {
  OfficePage.uploadTest();
});

When('I try to upload the test', () => {
  OfficePage.clickUploadButton();
});

When('I enter a candidate description', () => {
  OfficePage.enterCandidateDescription();
});

When('I complete the weather conditions', () => {
  OfficePage.enterWeatherConditions();
});

When('I complete the {string} circuit', (circuitType) => {
  OfficePage.clickCircuit(circuitType);
});
When('I enter a comment for {string} fault {string}', (faultSeverity, faultLabel) => {
  const commentsField = OfficePage.getCommentsField(faultSeverity, faultLabel);
  commentsField.sendKeys(`Comment for ${faultSeverity} fault: ${faultLabel}`);
});

Then('the office activity code should be {string}', (activityCode) => {
  const activityCodeField = OfficePage.getActivityCodeField(this.testCategory);
  return expect(activityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('I have a {string} fault for {string} requiring a comment', (faultSeverity, faultLabel) => {
  const commentsValidationText = OfficePage.getCommentsValidationText(faultSeverity, faultLabel);
  expect(commentsValidationText.getText()).to.eventually.equal('Provide a comment');
  return expect(commentsValidationText.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('the tell me question should be {string}', (tellMeQuestion : string) => {
  const tellMeQuestionField = OfficePage.getTellMeQuestionField();
  return expect(tellMeQuestionField.getText()).to.eventually.equal(tellMeQuestion);
});

Then('the office page test outcome is {string}', (testOutcome : string) => {
  const testOutcomeField = OfficePage.getTestOutcomeField();
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then(/^there (?:is|are) \"(.+)\" driver faults? listed for \"(.+)\"$/, (faultCount : string, faultTest : string) => {
  const driverFault = OfficePage.getDriverFault(faultCount, faultTest);
  return expect(driverFault.isPresent()).to.eventually.be.true;
});

When('I complete the rekey', () => {
  OfficePage.completeRekey(this.testCategory);
});

Then('the rekey is successfully uploaded', () => {
  const uploadRekeyMessage = OfficePage.getUploadRekeyMessage();
  return expect(uploadRekeyMessage.getText()).to.eventually.equal('Rekeyed test uploaded successfully');
});

When('I return to the journal', () => {
  OfficePage.clickReturnToJournalButton();
});
