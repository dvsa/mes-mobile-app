import { Then, When, Before } from 'cucumber';
import { by } from 'protractor';
import OfficePage from '../pages/OfficePage';
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
  this.testCategory = 'ce';
});

When('I complete the office write up', () => {
  OfficePage.enterRouteNumber('2');
  if (this.testCategory === 'be' || this.testCategory === 'c' || this.testCategory === 'c1' || this.testCategory === 'ce') {
    OfficePage.enterIndependentDriving('diagram');
  } else {
    OfficePage.enterIndependentDriving('satnav');
    OfficePage.enterShowMe('S5 - Horn');
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

When('I enter a comment for {string} fault {string}', (faultSeverity, faultLabel) => {
  const commentsField = TempPage.getAndAwaitElement(by.xpath(`//fault-comment-card[@faulttype='${faultSeverity}']
  //ion-row[ion-col/label[text() = '${faultLabel}']]//textarea`));

  commentsField.sendKeys(`Comment for ${faultSeverity} fault: ${faultLabel}`);
});

Then('the office activity code should be {string}', (activityCode) => {
  const activityCodeField = TempPage.getAndAwaitElement(by.xpath(`//div[contains(@class, "office-cat-${this.testCategory}-page")]`
    + `//ion-select[@id = "activity-code-selector"]/div[@class = "select-text"]`));
  return expect(activityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('I have a {string} fault for {string} requiring a comment', (faultSeverity, faultLabel) => {
  const commentsValidationText = TempPage.getAndAwaitElement(by.xpath(`//fault-comment-card[@faulttype='${faultSeverity}'
  and //label[@class = 'fault-label' and text() = '${faultLabel}']]//div[@class='validation-text ng-invalid']`));

  expect(commentsValidationText.getText()).to.eventually.equal('Provide a comment');

  return expect(commentsValidationText.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('the tell me question should be {string}', (tellMeQuestion : string) => {
  const tellMeQuestionField = TempPage.getAndAwaitElement(by.id('tell-me-question-text'));
  return expect(tellMeQuestionField.getText()).to.eventually.equal(tellMeQuestion);
});

Then('the office page test outcome is {string}', (testOutcome : string) => {
  const testOutcomeField = TempPage.getAndAwaitElement(by.xpath('//div[@id="test-outcome-text"]/span'));
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then(/^there (?:is|are) \"(.+)\" driver faults? listed for \"(.+)\"$/, (faultCount : string, faultTest : string) => {
  const driverFault = TempPage.getAndAwaitElement(by.xpath(`//ion-row[@id = 'driving-fault-commentary-label']
  [descendant::span[@class='count' and text() = '${faultCount}'] and descendant::label[@class='fault-label'
  and text() = '${faultTest}']]`));

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
