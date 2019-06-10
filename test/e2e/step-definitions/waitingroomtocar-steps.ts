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
  completeWaitingRoomPage(false, true);
});

When('I complete the waiting room to car page with a tell me driver fault', () => {
  completeWaitingRoomPage(true, true);
});

When('I complete the waiting room to car page with automatic transmission', () => {
  completeWaitingRoomPage(false, false);
});

When('I fail the eye sight test', () => {
  const eyesightFailRadio = getElement(by.id('eyesight-fail'));
  clickElement(eyesightFailRadio);
  const eyesightConfirmation = getElement(by.id('eyesight-failure-confirmation'));
  expect(eyesightConfirmation.isPresent()).to.eventually.be.true;
  const eyesightFailConfirmButton = getElement(by.id('confirm-eyesight-failure'));
  clickElement(eyesightFailConfirmButton);
});

const completeWaitingRoomPage = (withDriverFault: boolean, manualTransmission: boolean) => {
  const eyesightPassRadio = getElement(by.id('eyesight-pass'));
  clickElement(eyesightPassRadio);
  const tellMeSelector = getElement(by.id('tell-me-selector'));
  clickElement(tellMeSelector);
  const tellMeT7 = getElement(by.id('alert-input-0-6'));
  clickElement(tellMeT7);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);

  const tellMeRadioSelector = (withDriverFault) ? 'tellme-fault' : 'tellme-correct';
  const tellMeRadio = getElement(by.id(tellMeRadioSelector));
  clickElement(tellMeRadio);
  const transmissionSelector = (manualTransmission) ? 'transmission-manual' : 'transmission-automatic';
  const transmissionRadio = getElement(by.id(transmissionSelector));
  clickElement(transmissionRadio);

  const registrationField = element(by.id('registration'));
  enterTextIndirect(registrationField, 'ABC');

  const submitWRTC = getElement(by.xpath('//button[span[h3[text()="Continue to test report"]]]'));
  clickElement(submitWRTC);
};
