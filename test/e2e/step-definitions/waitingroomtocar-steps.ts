import { When, Before } from 'cucumber';
import { by, element, browser } from 'protractor';
import { UI_TEST_DATA } from '../../test_data/ui_test_data';
import TempPage from '../pages/tempPage';

import { threadId } from 'worker_threads';
import { boolean, number } from '@hapi/joi';

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

Before({ tags: '@catce' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'ce';
});

When('I select a tell me question', () => {
  selectTellMeQuestion('T2 - Tyre pressures');
});

When('I complete the waiting room to car page', () => {
  completeWaitingRoomPage(false, true, 'T5 - Headlights & tail lights');
});

When('I complete the waiting room to car page with a tell me driver fault', () => {
  completeWaitingRoomPage(true, true, 'T1 - Brakes');
});

When('I complete the waiting room to car page with automatic transmission', () => {
  completeWaitingRoomPage(false, false, 'T1 - Brakes');
});

When('I fail the eye sight test', () => {
  eyeSightResult(false);
  const eyesightConfirmation = TempPage.getElement(by.id('eyesight-failure-confirmation'));
  expect(eyesightConfirmation.isPresent()).to.eventually.be.true;
  const eyesightFailConfirmButton = TempPage.getElement(by.id('confirm-eyesight-failure'));
  TempPage.clickElement(eyesightFailConfirmButton);
});

When('I complete the waiting room to car page with the following vehicle checks', function (table) {
  completeWaitingRoomPage(table.raw()[1], true);
});

const completeWaitingRoomPage = (questionResult, manualTransmission: boolean, tellMeQuestion?: string) => {
  if (this.testCategory === 'be') {
    eyeSightResult(true);
    multiShowAndTell(UI_TEST_DATA.testData.be, questionResult);
  } else if (this.testCategory === 'c' || this.testCategory === 'c1') {
    multiShowAndTell(UI_TEST_DATA.testData.c, questionResult);
  } else if (this.testCategory === 'ce') {
    multiShowAndTell(UI_TEST_DATA.testData.ce, questionResult);
  } else {
    eyeSightResult(true);
    standardUserJourney(questionResult, manualTransmission, tellMeQuestion);
  }
  TempPage.textFieldInputViaNativeMode('//XCUIElementTypeOther[XCUIElementTypeOther[@name="Vehicle registration number"]]/' +
  'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', 'AB12CDE');
  const submitWRTC = TempPage.getElement(by.xpath('//button[span[h3[text()="Continue to test report"]]]'));
  TempPage.clickElement(submitWRTC);
};

const multiShowAndTell = (questions, questionResult) => {
  openSelectQuestionsOverlay();
  showMeQuestions(questions, questionResult);
  const submitVehicleChecksButton = TempPage.getElement(by.id('submit-vehicle-checks'));
  TempPage.clickElement(submitVehicleChecksButton);
};

const openSelectQuestionsOverlay = () => {
  const selectQuestionsButton = TempPage.getElement(by.css('input[value="Select questions"]'));
  expect(selectQuestionsButton.isPresent()).to.eventually.be.true;
  TempPage.clickElement(selectQuestionsButton);
};

const standardUserJourney = (withDriverFault: boolean, manualTransmission: boolean, tellMeQuestion: string) => {
  selectTellMeQuestion(tellMeQuestion);
  const tellMeRadioSelector = (withDriverFault) ? 'tellme-fault' : 'tellme-correct';
  const tellMeRadio = TempPage.getElement(by.id(tellMeRadioSelector));
  TempPage.clickElement(tellMeRadio);
  const transmissionSelector = (manualTransmission) ? 'transmission-manual' : 'transmission-automatic';
  const transmissionRadio = TempPage.getElement(by.id(transmissionSelector));
  TempPage.clickElement(transmissionRadio);
};

const showMeQuestions = (questions, questionResult) => {
  const showMeQuestionsArray = [questions, questionResult];
  const elements = element.all(by.id('vehicle-checks-question-selector'));
  elements.each((element, index) => {
    TempPage.clickElement(element);
    const vehicleCheck = TempPage.getElement(by.xpath(`//button//div[normalize-space(text()) =  "${showMeQuestionsArray[0][index]}"]`));
    TempPage.clickElement(vehicleCheck);
    const submitDialog = TempPage.getElement(by.xpath('//ion-alert//button[span[text() =  "Submit"]]'));
    TempPage.clickElement(submitDialog);
    const resultFromQuestions = (showMeQuestionsArray[1][index] === "true") ? 'vehicleChecksFault' : 'vehicleChecksCorrect';
    const vehicleCheckAnswer = TempPage.getElement(by.id(`${resultFromQuestions}_${index + 1}`));
    TempPage.clickElement(vehicleCheckAnswer);
  });
};

const selectTellMeQuestion = (tellMeQuestion: string) => {
  const tellMeSelector = TempPage.getElement(by.id('tell-me-selector'));
  TempPage.clickElement(tellMeSelector);
  const tellMe = TempPage.getElement(by.xpath(`//button/span/div[normalize-space(text()) = "${tellMeQuestion}"]`));
  TempPage.clickElement(tellMe);
  const submitDialog = TempPage.getElement(by.xpath('//button[span[text() = "Submit"]]'));
  TempPage.clickElement(submitDialog);
};

const eyeSightResult = (result: boolean) => {
  const eyeSight = result ? 'eyesight-pass' : 'eyesight-fail';
  const eyesightRadio = TempPage.getElement(by.id(`${eyeSight}`));
  TempPage.clickElement(eyesightRadio);
};
