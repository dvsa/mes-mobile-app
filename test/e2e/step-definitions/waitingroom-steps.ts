import { Then, When, Before } from 'cucumber';
import WaitingRoomPage from '../pages/waitingRoomPage';
import PageHelper from '../pages/pageHelper';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

//Set default category to be cat b
this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  this.testCategory = 'be';
});

Before({ tags: '@catc' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catce' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@cata' }, () => {
  this.testCategory = 'a-mod1';
});

Before({ tags: '@catd' }, () => {
  this.testCategory = 'd';
});

When('the candidate enters a new email address', () => {
  WaitingRoomPage.clickNewEmailRadioButton();
  WaitingRoomPage.enterNewEmail('testemail@example.com');
});

When('the candidate requests to receive results by post', () => {
  WaitingRoomPage.clickPostalAddressRadioButton();
});

When(/^the candidate confirms their declaration$/, () => {
  WaitingRoomPage.candidateConfirmsDeclaration(this.testCategory);
});

When(/^the candidate confirms their communication preference$/, () => {
  WaitingRoomPage.candidateConfirmsCommunicationPreference(this.testCategory);
});

When('the candidate completes the declaration page', () => {
  WaitingRoomPage.checkInsuranceDeclaration();
  WaitingRoomPage.checkResidencyDeclaration();
  WaitingRoomPage.clickSignaturePad();
});

When(/^I proceed to the car|bike$/, () => {
  // Examiner clicks continue button then enters passcode
  WaitingRoomPage.clickContinueButton(this.testCategory);
  PageHelper.enterPasscode();
});

Then('the email {string} has been provided and is preselected', (emailAddress) => {
  const providedEmailRadio = WaitingRoomPage.getProvidedEmailRadioButton();
  expect(providedEmailRadio.isSelected()).to.eventually.be.true;
  const providedEmailValue = WaitingRoomPage.getProvidedEmailValue();
  return expect(providedEmailValue.getText()).to.eventually.equal(emailAddress);
});
