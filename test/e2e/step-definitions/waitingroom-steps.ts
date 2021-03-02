import { Then, When, Before } from 'cucumber';
import { PageHelper } from '../helper/PageHelper/pageHelper';
import { WaitingRoomPage } from '../helper/WaitingRoom/waitingRoom';
import { WaitingRoomPageObject } from '../helper/WaitingRoom/waitingRoom.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const pageHelper : PageHelper = new PageHelper();
const waitingRoomPage : WaitingRoomPage = new WaitingRoomPage();
const waitingRoomPageElement : WaitingRoomPageObject = new WaitingRoomPageObject();

// Set default category to be cat b
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

Before({ tags: '@catcpc' }, () => {
  this.testCategory = 'cpc';
});

When('the candidate enters a new email address', async () => {
  await waitingRoomPage.clickNewEmailRadioButton();
  await waitingRoomPage.enterNewEmail('testemail@example.com');
});

When('the candidate requests to receive results by post', async () => {
  await waitingRoomPage.clickPostalAddressRadioButton();
});

When(/^the candidate confirms their declaration$/, async () => {
  await waitingRoomPage.candidateConfirmsDeclaration(this.testCategory);
});

When(/^the candidate confirms their communication preference$/, async () => {
  await waitingRoomPage.candidateConfirmsCommunicationPreference(this.testCategory);
});

When('the candidate completes the declaration page', async () => {
  await waitingRoomPage.checkInsuranceDeclaration();
  if (this.testCategory !== 'adi-part2') {
    await waitingRoomPage.checkResidencyDeclaration();
  }
  await waitingRoomPage.clickSignaturePad();
});

When(/^I proceed to the car|bike$/, async () => {
  // Examiner clicks continue button then enters passcode
  await waitingRoomPage.clickContinueButton(this.testCategory);
  await pageHelper.enterPasscode();
});

Then('the email {string} has been provided and is preselected', async (emailAddress) => {
  // @ts-ignore
  const providedEmailRadio = waitingRoomPageElement.getProvidedEmailRadioButton();
  expect(await providedEmailRadio.isSelected()).to.eventually.be.true;
  // @ts-ignore
  const providedEmailValue = waitingRoomPageElement.getProvidedEmailValue();
  return expect(await providedEmailValue.getText()).to.eventually.equal(emailAddress);
});
