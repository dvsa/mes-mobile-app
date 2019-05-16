import { When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

When('I complete the office write up', () => {
  const routeField = getElement(by.id('route'));
  routeField.sendKeys('2');
  const satnavRadio = getElement(by.id('independent-driving-satnav'));
  clickElement(satnavRadio);
  const physicalDescriptionField = getElement(by.id('physical-description'));
  physicalDescriptionField.sendKeys('Tall, slim build with dark brown hair.');
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

  const submitTestButton = getElement(by.xpath('//button[span[h3[text() = "Upload"]]]'));
  clickElement(submitTestButton);

  const uploadConfirmationButton = getElement(by.xpath('//ion-alert//button/span[text() = "Upload"]'));
  clickElement(uploadConfirmationButton);
});
