import { When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

When('I complete the office write up', () => {
  const routeField = getElement(by.id('route'));
  routeField.sendKeys('2');
  const satnavRadio = getElement(by.id('independent-driving-satnav'));
  clickElement(satnavRadio);
  enterCandidateDescription();
  const debriefWitnessedRadio = getElement(by.id('debrief-witnessed-yes'));
  clickElement(debriefWitnessedRadio);

  const showMeSelector = getElement(by.id('show-me-selector'));
  clickElement(showMeSelector);
  const showMeItem = getElement(by.id('alert-input-1-4'));
  clickElement(showMeItem);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);

  const weatherSelector = getElement(by.xpath('//ion-select[@formcontrolname="weatherConditions"]'));
  clickElement(weatherSelector);
  const weatherItem1 = getElement(by.id('alert-input-2-1'));
  clickElement(weatherItem1);
  const weatherItem2 = getElement(by.id('alert-input-2-3'));
  clickElement(weatherItem2);
  clickElement(submitDialog);

  const d255Radio = getElement(by.id('d255-yes'));
  clickElement(d255Radio);
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

When('I enter a comment for {string} fault {string}', (faultSeverity, faultLabel) => {
  const commentsField = getElement(by.xpath(`//fault-comment-card[@faulttype='${faultSeverity}']
  //ion-row[ion-col/label[text() = '${faultLabel}']]/ion-col/ion-row/div/textarea`));

  commentsField.sendKeys(`Comment for ${faultSeverity} fault: ${faultLabel}`);
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
