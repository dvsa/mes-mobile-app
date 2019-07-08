import { When } from 'cucumber';
import { getElement, clickElement, getParentContext } from './generic-steps';
import { element, by, browser } from 'protractor';
import { TEST_CONFIG } from '../test.config';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I select a tell me question', () => {
  selectTellMeQuestion('T2 - Tyre pressures');
});

When('I complete the waiting room to car page', () => {
  completeWaitingRoomPage(false, true, 'T5 - Headlights & tail lights');
});

When('I complete the waiting room to car page with a tell me driver fault', () => {
  completeWaitingRoomPage(true, true, 'T6 - Antilock braking system');
});

When('I complete the waiting room to car page with automatic transmission', () => {
  completeWaitingRoomPage(false, false, 'T1 - Brakes');
});

When('I fail the eye sight test', () => {
  const eyesightFailRadio = getElement(by.id('eyesight-fail'));
  clickElement(eyesightFailRadio);
  const eyesightConfirmation = getElement(by.id('eyesight-failure-confirmation'));
  expect(eyesightConfirmation.isPresent()).to.eventually.be.true;
  const eyesightFailConfirmButton = getElement(by.id('confirm-eyesight-failure'));
  clickElement(eyesightFailConfirmButton);
});

const completeWaitingRoomPage = (withDriverFault: boolean, manualTransmission: boolean, tellMeQuestion: string) => {
  const eyesightPassRadio = getElement(by.id('eyesight-pass'));
  clickElement(eyesightPassRadio);
  selectTellMeQuestion(tellMeQuestion);

  const tellMeRadioSelector = (withDriverFault) ? 'tellme-fault' : 'tellme-correct';
  const tellMeRadio = getElement(by.id(tellMeRadioSelector));
  clickElement(tellMeRadio);
  const transmissionSelector = (manualTransmission) ? 'transmission-manual' : 'transmission-automatic';
  const transmissionRadio = getElement(by.id(transmissionSelector));
  clickElement(transmissionRadio);

  // Because registration number field is uppercaseAlphanumOnly we have to go native to get round this
  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      // Get the registration number field
      const registrationField = element(by.xpath(`//XCUIElementTypeOther[XCUIElementTypeOther[
        @name="Vehicle registration number"]]/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField`));
      registrationField.sendKeys('AB12CDE');

      // Switch back to WEBVIEW context
      browser.driver.selectContext(getParentContext(webviewContext)).then(() => {
        browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
      });
    });
  });

  const submitWRTC = getElement(by.xpath('//button[span[h3[text()="Continue to test report"]]]'));
  clickElement(submitWRTC);
};

const selectTellMeQuestion = (tellMeQuestion) => {
  const tellMeSelector = getElement(by.id('tell-me-selector'));
  clickElement(tellMeSelector);
  const tellMe = getElement(by.xpath(`//button/span/div[normalize-space(text()) = "${tellMeQuestion}"]`));
  clickElement(tellMe);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);
};
