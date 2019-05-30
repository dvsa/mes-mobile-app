import { Then, When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I complete the office write up', () => {
  enterRouteNumber('2');
  enterIndependentDriving();
  enterCandidateDescription();
  enterDebriefWitnessed();
  enterShowMe();
  enterWeatherConditions();
  enterD255();
});

When('I select termination code {string}', (terminationCodeDesc) => {
  const terminationSelector = getElement(by.id('termination-code-selector'));
  clickElement(terminationSelector);
  const terminationItem = getElement(by.xpath(`//button/span/div[@class='alert-radio-label']
  [normalize-space(text()) = '${terminationCodeDesc}']`));
  clickElement(terminationItem);
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

Then('the termination code should be {string}', (terminationCode) => {
  const terminationCodeField = getElement(by.id('termination-code-selector'));
  return expect(terminationCodeField.getText()).to.eventually.equal(terminationCode);
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

const enterIndependentDriving = () => {
  const satnavRadio = getElement(by.id('independent-driving-satnav'));
  clickElement(satnavRadio);
};

const enterShowMe = () => {
  const showMeSelector = getElement(by.id('show-me-selector'));
  clickElement(showMeSelector);
  const showMeItem = getElement(by.xpath('//button/span/div[normalize-space(text()) = "S5 - Horn"]'));
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
