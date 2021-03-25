import {Before, When} from 'cucumber';
import {WaitingRoomToCarPage} from '../helper/waitingRoomToCarPage/waitingRoomToCarPage';
import {WaitingRoomToCarPageObject} from '../helper/waitingRoomToCarPage/waitingRoomToCarPage.po';

let waitingRoomToCarPage: WaitingRoomToCarPage = new WaitingRoomToCarPage();
let waitingRoomToCarPageElement: WaitingRoomToCarPageObject = new WaitingRoomToCarPageObject();

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

this.testCategory = 'b';

Before({tags: '@catbe'}, () => {
  this.testCategory = 'be';
});

Before({tags: '@catc'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@catce'}, () => {
  this.testCategory = 'ce';
});

Before({tags: '@catc1'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@catc1e'}, () => {
  this.testCategory = 'ce';
});

Before({tags: '@cata'}, () => {
  this.testCategory = 'a-mod1';
});

Before({tags: '@catm2'}, () => {
  this.testCategory = 'a-mod2';
});

Before({tags: '@catd'}, () => {
  this.testCategory = 'd';
});

Before({tags: '@catHome'}, () => {
  this.testCategory = 'home-test';
});

Before({tags: '@catADI2'}, () => {
  this.testCategory = 'adi-part2';
});

Before({tags: '@catcpc'}, () => {
  this.testCategory = 'cpc';
});

When('I select a tell me question', async () => {
  await waitingRoomToCarPage.selectTellMeQuestion('T2 - Tyre pressures');
});

When('I complete the waiting room to car page', async () => {
  await waitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, true, true, 'T5 - Headlights & tail lights');
});

When('I complete the waiting room to car page with a tell me driver fault', async () => {
  await waitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, false, true, 'T1 - Brakes');
});

When('I complete the waiting room to car page with automatic transmission', async () => {
  await waitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, false, false, 'T1 - Brakes');
});

When('I fail the eye sight test', async () => {
  await waitingRoomToCarPage.eyeSightResultFail();
  const eyesightConfirmation = waitingRoomToCarPageElement.eyesightFailureConfirmation;
  expect(await eyesightConfirmation.isPresent()).to.eventually.be.true;
  await waitingRoomToCarPage.clickEyesightFailureConfirmButton();
});

When('I complete the waiting room to car page with the following vehicle checks', async (table) => {
  await waitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, table.raw()[1], true);
});

When('I complete the waiting room to bike page with confirmed cat type {string}', async (catType: string) => {
  await waitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, true, true, catType);
});

When('I complete the waiting room to car page with a Safety And Balance Question faults and cat type {string}',
  async (catType: string) => {
    await waitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, false, true, catType);
  });

When('I select the test category {string}', async (catType: string) => {
  await waitingRoomToCarPage.modCatConfirmation(catType);
});

When('I select the Transmission Type {string}', async (transmissionType: string) => {
  await waitingRoomToCarPage.selectTransmissionType(transmissionType);
});

When('I select the Eyesight test result {string}', async (result: string) => {
  await waitingRoomToCarPage.selectEyeSight(result);
});

When('I select the ordit trainer outcome {string}', async (result: string) => {
  await waitingRoomToCarPage.selectOrditTrainerOutcome(result);
});

When('I select the training records outcome {string}', async (result: string) => {
  await waitingRoomToCarPage.selectTrainningRecordOutcome(result);
});

When('I enter the vehicle registration number {string}', async (registrationNumber: string) => {
  await waitingRoomToCarPage.enterRegistrationNumber(registrationNumber);
});

When('I select the {string} page', async (pageTitle: string, questionsAndResults: string) => {
  await waitingRoomToCarPage.selectSafetyAndBalanceQuestions(questionsAndResults, pageTitle);
});

When('I continue to test report', async () => {
  await waitingRoomToCarPage.submitWRTC();
});

When('I select the vehicle details', async () => {
  await waitingRoomToCarPage.selectVehicleDetails();
});

When('I select the Combination options {string}', async (optionValue: string) => {
  await waitingRoomToCarPage.selectCombination(optionValue);
});
