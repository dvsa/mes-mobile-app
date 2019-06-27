import { Then, When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I complete the office write up', () => {
  enterRouteNumber('2');
  enterIndependentDriving('satnav');
  enterCandidateDescription();
  enterDebriefWitnessed();
  enterShowMe('S5 - Horn');
  enterWeatherConditions();
  enterD255();
});

When('I complete the office write up with Not applicable to independent driving and show me question', () => {
  enterRouteNumber('4');
  enterIndependentDriving('na');
  enterCandidateDescription();
  enterDebriefWitnessed();
  enterShowMe('N/A - Not applicable');
  enterWeatherConditions();
  enterD255();
});

When('I select activity code {string}', (activityCodeDesc) => {
  const activitySelector = getElement(by.id('activity-code-selector'));
  clickElement(activitySelector);
  const activityItem = getElement(by.xpath(`//button/span/div[@class='alert-radio-label']
  [normalize-space(text()) = '${activityCodeDesc}']`));
  clickElement(activityItem);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);
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

When('I complete the debrief witnessed', () => {
  enterDebriefWitnessed();
});

When('I complete the weather conditions', () => {
  enterWeatherConditions();
});

When('I enter a comment for {string} fault {string}', (faultSeverity, faultLabel) => {
  const commentsField = getElement(by.xpath(`//fault-comment-card[@faulttype='${faultSeverity}']
  //ion-row[ion-col/label[text() = '${faultLabel}']]/ion-col/ion-row/div/textarea`));

  commentsField.sendKeys(`Comment for ${faultSeverity} fault: ${faultLabel}`);
});

Then('the activity code should be {string}', (activityCode) => {
  const acitivityCodeField = getElement(by.id('activity-code-selector'));
  return expect(acitivityCodeField.getText()).to.eventually.equal(activityCode);
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
  const testOutcomeField = getElement(by.id('office-page-test-outcome'));
  return expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then(/^there (?:is|are) \"(.+)\" driver faults? listed for \"(.+)\"$/, (faultCount : string, faultTest : string) => {
  const driverFault = getElement(by.xpath(`//ion-row[@id = 'driving-fault-commentary-label']
  [descendant::span[@class='count' and text() = '${faultCount}'] and descendant::label[@class='fault-label'
  and text() = '${faultTest}']]`));

  return expect(driverFault.isPresent()).to.eventually.be.true;
});

const clickUploadButton = () => {
  const submitTestButton = getElement(by.xpath('//button[span[h3[text() = "Upload"]]]'));
  clickElement(submitTestButton);
};

const uploadTest = () => {
  clickUploadButton();

  const uploadConfirmationButton = getElement(by.xpath('//ion-alert//button/span[text() = "Upload"]'));
  clickElement(uploadConfirmationButton);
};

const enterCandidateDescription = () => {
  const physicalDescriptionField = getElement(by.id('physical-description'));
  physicalDescriptionField.sendKeys('Tall, slim build with dark brown hair.');
};

const enterRouteNumber = (routeNumber) => {
  const routeField = getElement(by.id('route'));
  routeField.sendKeys(routeNumber);
};

const enterDebriefWitnessed = () => {
  const debriefWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  clickElement(debriefWitnessedRadio);
};

const enterIndependentDriving = (type) => {
  const satnavRadio = getElement(by.id(`independent-driving-${type}`));
  clickElement(satnavRadio);
};

const enterShowMe = (value) => {
  const showMeSelector = getElement(by.id('show-me-selector'));
  clickElement(showMeSelector);
  const showMeItem = getElement(by.xpath(`//button/span/div[normalize-space(text()) = '${value}']`));
  clickElement(showMeItem);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);
};

const enterWeatherConditions = () => {
  const weatherSelector = getElement(by.xpath('//ion-select[@formcontrolname="weatherConditions"]'));
  clickElement(weatherSelector);
  const weatherItem1 = getElement(by.xpath('//button/span/div[normalize-space(text()) = "2 - Bright / wet roads"]'));
  clickElement(weatherItem1);
  const weatherItem2 = getElement(by.xpath('//button/span/div[normalize-space(text()) = "4 - Showers"]'));
  clickElement(weatherItem2);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);
};

const enterD255 = () => {
  const d255Radio = getElement(by.id('d255-yes'));
  clickElement(d255Radio);
};
