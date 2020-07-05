import { When, Before } from 'cucumber';
import WaitingRoomToCarPage from '../pages/waitingRoomToCarPage';

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
  this.testCategory = 'ce';
});

Before({ tags: '@catc1' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'ce';
});

Before({ tags: '@cata' }, () => {
  this.testCategory = 'a-mod1';
});

Before({ tags: '@catm2' }, () => {
  this.testCategory = 'a-mod2';
});

Before({ tags: '@catd' }, () => {
  this.testCategory = 'd';
});

Before({ tags: '@catHome' }, () => {
  this.testCategory = 'home-test';
});

Before({ tags: '@catADI2' }, () => {
  this.testCategory = 'adi-part2';
});

When('I select a tell me question', () => {
  WaitingRoomToCarPage.selectTellMeQuestion('T2 - Tyre pressures');
});

When('I complete the waiting room to car page', () => {
  WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, true, true, 'T5 - Headlights & tail lights');
});

When('I complete the waiting room to car page with a tell me driver fault', () => {
  WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, false, true, 'T1 - Brakes');
});

When('I complete the waiting room to car page with automatic transmission', () => {
  WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, false, false, 'T1 - Brakes');
});

When('I fail the eye sight test', () => {
  WaitingRoomToCarPage.eyeSightResultFail();
  const eyesightConfirmation = WaitingRoomToCarPage.getEyesightFailureConfirmation();
  expect(eyesightConfirmation.isPresent()).to.eventually.be.true;
  WaitingRoomToCarPage.clickEyesightFailureConfirmButton();
});

When('I complete the waiting room to car page with the following vehicle checks', (table) => {
  WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, table.raw()[1], true);
});

When('I complete the waiting room to bike page with confirmed cat type {string}', (catType) => {
  WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, true, true, catType);
});

When('I complete the waiting room to car page with a Safety And Balance Question faults and cat type {string}',
  (catType) => {
    WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, false, true, catType);
  });

When('I select the test category {string}', (catType) => {
  WaitingRoomToCarPage.modCatConfirmation(catType);
});

When('I select the Transmission Type {string}', (transmissionType) => {
  WaitingRoomToCarPage.selectTransmissionType(transmissionType);
});

When('I select the Eyesight test result {string}', (result) => {
  WaitingRoomToCarPage.selectEyeSight(result);
});

When('I select the ordit trainer outcome {string}', (result) => {
  WaitingRoomToCarPage.selectOrditTrainerOutcome(result);
});

When('I select the training records outcome {string}', (result) => {
  WaitingRoomToCarPage.selectTrainningRecordOutcome(result);
});

When('I enter the vehicle registration number {string}', (registrationNumber) => {
  WaitingRoomToCarPage.enterRegistrationNumber(registrationNumber);
});

When('I select the {string} page', (pageTitle, questionsAndResults) => {
  WaitingRoomToCarPage.selectSafetyAndBalanceQuestions(questionsAndResults, pageTitle);

});

When('I continue to test report', () => {
  WaitingRoomToCarPage.submitWRTC();
});
