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

When('I select a tell me question', () => {
  WaitingRoomToCarPage.selectTellMeQuestion('T2 - Tyre pressures');
});

When('I complete the waiting room to car page', () => {
  WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, false, true, 'T5 - Headlights & tail lights');
});

When('I complete the waiting room to car page with a tell me driver fault', () => {
  WaitingRoomToCarPage.completeWaitingRoomPage(this.testCategory, true, true, 'T1 - Brakes');
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
