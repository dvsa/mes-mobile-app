import { When } from 'cucumber';
import { getElement, clickElement, enterTextIndirect } from './generic-steps';
import { element, by, Key, browser } from 'protractor';

When('I select a tell me question', () => {
  const tellMeSelector = getElement(by.id('tell-me-selector'));
  clickElement(tellMeSelector);
  const tellMeT7 = getElement(by.id('alert-input-0-6'));
  clickElement(tellMeT7);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);
});

When('I complete the waiting room to car page', () => {
  const eyesightPassRadio = getElement(by.id('eyesight-pass'));
  clickElement(eyesightPassRadio);
  const tellMeSelector = getElement(by.id('tell-me-selector'));
  clickElement(tellMeSelector);
  const tellMeT7 = getElement(by.id('alert-input-0-6'));
  clickElement(tellMeT7);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);

  const tellMeCorrectRadio = getElement(by.id('tellme-correct'));
  clickElement(tellMeCorrectRadio);
  const transitionManualRadio = getElement(by.id('transmission-manual'));
  clickElement(transitionManualRadio);

  const registrationField = element(by.id('registration'));
  enterTextIndirect(registrationField, 'ABC');

  const submitWRTC = getElement(by.xpath('//button[span[h3[text()="Continue to test report"]]]'));
  clickElement(submitWRTC);
});
