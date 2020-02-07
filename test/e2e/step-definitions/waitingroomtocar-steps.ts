import { When, Before } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by, element, browser } from 'protractor';
import { textFieldInputViaNativeMode } from '../../helpers/helpers'; 

import { threadId } from 'worker_threads';
import { boolean, number } from '@hapi/joi';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// Set default category to be cat b
this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  // This hook will be executed before scenarios tagged with @catbe
  this.testCategory = 'be';
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
  const eyesightConfirmation = getElement(by.id('eyesight-failure-confirmation'));
  expect(eyesightConfirmation.isPresent()).to.eventually.be.true;
  const eyesightFailConfirmButton = getElement(by.id('confirm-eyesight-failure'));
  clickElement(eyesightFailConfirmButton);
});

When('I complete the waiting room to car page with the following vehicle checks', function (table) {
  completeWaitingRoomPage(table.raw()[1], true);
});

const completeWaitingRoomPage = (questionResult, manualTransmission: boolean, tellMeQuestion?: string) => {
  if (this.testCategory === 'be') {
    eyeSightResult(true);
    multiShowAndTell(UI_TEST_DATA.testData.be, questionResult);
  } else if (this.testCategory === 'c') {
    multiShowAndTell(UI_TEST_DATA.testData.c, questionResult);
  } else {
    eyeSightResult(true);
    standardUserJourney(questionResult, manualTransmission, tellMeQuestion);
  }
  textFieldInputViaNativeMode('//XCUIElementTypeOther[XCUIElementTypeOther[@name="Vehicle registration number"]]/' +
  'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', 'AB12CDE');
  const submitWRTC = getElement(by.xpath('//button[span[h3[text()="Continue to test report"]]]'));
  clickElement(submitWRTC);
};

const beCategory = (questionResult) => {
  beCategoryOpenSelectQuestionsOverlay();
  showMeQuestions(questionResult);
  const submitVehicleChecksButton = getElement(by.id('submit-vehicle-checks'));
  clickElement(submitVehicleChecksButton);
};

const beCategoryOpenSelectQuestionsOverlay = () => {
  const selectQuestionsButton = getElement(by.css('input[value="Select questions"]'));
  expect(selectQuestionsButton.isPresent()).to.eventually.be.true;
  clickElement(selectQuestionsButton);
};

const standardUserJourney = (withDriverFault: boolean, manualTransmission: boolean, tellMeQuestion: string) => {
  selectTellMeQuestion(tellMeQuestion);
  const tellMeRadioSelector = (withDriverFault) ? 'tellme-fault' : 'tellme-correct';
  const tellMeRadio = getElement(by.id(tellMeRadioSelector));
  clickElement(tellMeRadio);
  const transmissionSelector = (manualTransmission) ? 'transmission-manual' : 'transmission-automatic';
  const transmissionRadio = getElement(by.id(transmissionSelector));
  clickElement(transmissionRadio);
};

const showMeQuestions = (questionResult) => {
 const showMeQuestionsArray = [['S01 - Direction indicators', 'S02 - Doors secure', 'S03 - Horn', 'T01 - Brakes', 'T02 - Safety factors while loading'], questionResult];
 const elements = element.all(by.id('vehicle-checks-question-selector'));
      elements.each((element, index) => {
        clickElement(element)
        const vehicleCheck = getElement(by.xpath(`//button//div[normalize-space(text()) =  "${showMeQuestionsArray[0][index]}"]`));
        clickElement(vehicleCheck);
        const submitDialog = getElement(by.xpath('//ion-alert//button[span[text() =  "Submit"]]'));
        clickElement(submitDialog);     
        const resultFromQuestions = (showMeQuestionsArray[1][index] === "true") ? 'vehicleChecksFault' : 'vehicleChecksCorrect';
        const vehicleCheckAnswer = getElement(by.id(`${resultFromQuestions}_${index + 1}`));
        clickElement(vehicleCheckAnswer)
      });
};

const selectTellMeQuestion = (tellMeQuestion: string) => {
  const tellMeSelector = getElement(by.id('tell-me-selector'));
  clickElement(tellMeSelector);
  const tellMe = getElement(by.xpath(`//button/span/div[normalize-space(text()) = "${tellMeQuestion}"]`));
  clickElement(tellMe);
  const submitDialog = getElement(by.xpath('//button[span[text() = "Submit"]]'));
  clickElement(submitDialog);
};

const eyeSightResult = (result: boolean) => {
  const eyeSight = result ? 'eyesight-pass' : 'eyesight-fail';
  const eyesightRadio = getElement(by.id(`${eyeSight}`));
  clickElement(eyesightRadio);
};
