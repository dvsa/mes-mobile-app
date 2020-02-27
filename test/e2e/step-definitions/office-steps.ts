import { Then, When, Before } from 'cucumber';
import { getElement } from './generic-steps';
import { by } from 'protractor';
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
  enterRouteNumber('2');
  if (this.testCategory === 'be' || this.testCategory === 'c' || this.testCategory === 'c1' || this.testCategory === 'ce') {
    enterIndependentDriving('diagram');
  } else {
    enterIndependentDriving('satnav');
    enterShowMe('S5 - Horn');
  }
  enterCandidateDescription();
  enterWeatherConditions();
});

When('I complete the office write up with Not applicable to independent driving and show me question', () => {
  enterRouteNumber('4');
  enterIndependentDriving('na');
  enterCandidateDescription();
  enterShowMe('N/A - Not applicable');
  enterWeatherConditions();
});

When('I upload the test', () => {
  uploadTest();
});

When('I try to upload the test', () => {
  clickUploadButton();
});

When('I enter a candidate description', () => {
  enterCandidateDescription();
});

When('I complete the weather conditions', () => {
  enterWeatherConditions();
});

When('I enter a comment for {string} fault {string}', (faultSeverity, faultLabel) => {
  const commentsField = getElement(by.xpath(`//fault-comment-card[@faulttype='${faultSeverity}']
  //ion-row[ion-col/label[text() = '${faultLabel}']]//textarea`));

  commentsField.sendKeys(`Comment for ${faultSeverity} fault: ${faultLabel}`);
});

Then('the office activity code should be {string}', (activityCode) => {
  const activityCodeField = getElement(by.xpath(`//div[contains(@class, "office-cat-${this.testCategory}-page")]`
    + `//ion-select[@id = "activity-code-selector"]/div[@class = "select-text"]`));
  return expect(activityCodeField.getText()).to.eventually.equal(activityCode);
});

Then('I have a {string} fault for {string} requiring a comment', (faultSeverity, faultLabel) => {
  const commentsValidationText = getElement(by.xpath(`//fault-comment-card[@faulttype='${faultSeverity}'
  and //label[@class = 'fault-label' and text() = '${faultLabel}']]//div[@class='validation-text ng-invalid']`));

  expect(commentsValidationText.getText()).to.eventually.equal('Provide a comment');

  return expect(commentsValidationText.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('the tell me question should be {string}', (tellMeQuestion : string) => {
  const tellMeQuestionField = getElement(by.id('tell-me-question-text'));
  return expect(tellMeQuestionField.getText()).to.eventually.equal(tellMeQuestion);
});

Then('the office page test outcome is {string}', (testOutcome : string) => {
  const testOutcomeField = getElement(by.xpath('//div[@id="test-outcome-text"]/span'));
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then(/^there (?:is|are) \"(.+)\" driver faults? listed for \"(.+)\"$/, (faultCount : string, faultTest : string) => {
  const driverFault = getElement(by.xpath(`//ion-row[@id = 'driving-fault-commentary-label']
  [descendant::span[@class='count' and text() = '${faultCount}'] and descendant::label[@class='fault-label'
  and text() = '${faultTest}']]`));

  return expect(driverFault.isPresent()).to.eventually.be.true;
});

When('I complete the rekey', () => {
  completeRekey();
});

Then('the rekey is successfully uploaded', () => {
  const uploadRekeyMessage = getElement(by.className('modal-alert-header'));
  return expect(uploadRekeyMessage.getText()).to.eventually.equal('Rekeyed test uploaded successfully');
});

When('I return to the journal', () => {
  const returnToJournalButton = getElement(by.xpath('//button/span/h3[text() = "Return to journal"]'));
  TempPage.clickElement(returnToJournalButton);
});

const clickUploadButton = () => {
  const submitTestButton = getElement(by.xpath('//button[span[h3[text() = "Upload"]]]'));
  TempPage.clickElement(submitTestButton);
};

const uploadTest = () => {
  clickUploadButton();

  const uploadConfirmationButton = getElement(by.xpath('//ion-alert//button/span[text() = "Upload"]'));
  TempPage.clickElement(uploadConfirmationButton);
};

const completeRekey = () => {
  const continueButton = getElement(
    by.xpath(`//div[contains(@class, "office-cat-${this.testCategory}-page")]//button//h3[text()="Continue"]`));
    TempPage.clickElement(continueButton);

  const iPadIssueCheckbox = getElement(by.id('ipadIssueSelected'));
  TempPage.clickElement(iPadIssueCheckbox);

  const ipadIssueTechnicalFault = getElement(by.id('ipadIssueTechnicalFault'));
  TempPage.clickElement(ipadIssueTechnicalFault);

  const uploadButton = getElement(by.xpath('//button/span/h3[text() = "Upload rekeyed test"]'));
  TempPage.clickElement(uploadButton);

  const uploadConfirmationButton = getElement(by.xpath('//button/span[text() = "Upload"]'));
  TempPage.clickElement(uploadConfirmationButton);
};

const enterCandidateDescription = () => {
  const physicalDescriptionField = getElement(by.id('physical-description'));
  physicalDescriptionField.sendKeys('Tall, slim build with dark brown hair.');
};

const enterRouteNumber = (routeNumber) => {
  const routeField = getElement(by.id('route'));
  routeField.sendKeys(routeNumber);
};

const enterIndependentDriving = (type) => {
  const satnavRadio = getElement(by.id(`independent-driving-${type}`));
  TempPage.clickElement(satnavRadio);
};

const enterShowMe = (value) => {
  const showMeSelector = getElement(by.id('show-me-selector'));
  TempPage.clickElement(showMeSelector);
  const showMeItem = getElement(by.xpath(`//button/span/div[normalize-space(text()) = '${value}']`));
  TempPage.clickElement(showMeItem);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  TempPage.clickElement(submitDialog);
};

const enterWeatherConditions = () => {
  const weatherSelector = getElement(by.xpath('//ion-select[@formcontrolname="weatherConditions"]'));
  TempPage.clickElement(weatherSelector);
  const weatherItem1 = getElement(by.xpath('//button/span/div[normalize-space(text()) = "2 - Bright / wet roads"]'));
  TempPage.clickElement(weatherItem1);
  const weatherItem2 = getElement(by.xpath('//button/span/div[normalize-space(text()) = "4 - Showers"]'));
  TempPage.clickElement(weatherItem2);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  TempPage.clickElement(submitDialog);
};
