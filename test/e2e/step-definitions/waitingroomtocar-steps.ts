import { When } from 'cucumber';
import { getElement, clickElement, enterTextIndirect } from './generic-steps';
import { element, by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

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

When('I fail the eye sight test', () => {
  const eyesightFailRadio = getElement(by.id('eyesight-fail'));
  clickElement(eyesightFailRadio);
  const eyesightConfirmation = getElement(by.id('eyesight-failure-confirmation'));
  expect(eyesightConfirmation.isPresent()).to.eventually.be.true;
  const eyesightFailConfirmButton = getElement(by.id('confirm-eyesight-failure'));
  clickElement(eyesightFailConfirmButton);
});
