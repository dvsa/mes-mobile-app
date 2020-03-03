import JournalPage from '../pages/journalPage';

const {
  Given,
  Then,
  When,
} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

Given('I am on the journal page as {string}', (username) => {
  JournalPage.onJournalPageAs(username);

  // If the journal page is loaded we should have a refresh button
  // todo: kc should this be put in an isLoaded() method on the JournalPage?
  const refreshButton = JournalPage.waitForRefreshButton();
  return expect(refreshButton.isPresent()).to.eventually.be.true;
});

// todo: kc - why are we returning this?
When('I view candidate details for {string}', (candidateName) => {
  return JournalPage.viewCandidateDetails(candidateName);
});

When('I check candidate details for {string}', (candidateName) => {
  JournalPage.viewCandidateDetails(candidateName);
  JournalPage.closeCandidateDetailsDialog();
});

When('I start the test for {string}', (candidateName) => {
  JournalPage.startTestFor(candidateName);

  // If the rekey dialog is shown so just select start test normally
  const rekeyStartTestButton = JournalPage.getRekeyStartTestButton();
  rekeyStartTestButton.isPresent().then((result) => {
    if (result) {
      JournalPage.clickRekeyStartTestButton();
    }
  });

    // If the start test early dialog is shown just select continue
  const startTestEarlyButton = JournalPage.getStartTestEarlyButton();
  startTestEarlyButton.isPresent().then((result) => {
    if (result) {
      JournalPage.clickStartTestEarlyButton();
    }
  });
});

When('I rekey a test for {string}', (candidateName) => {
  JournalPage.clickRekeyTestButtonFor(candidateName);
});

When('I navigate to next day', () => {
  JournalPage.clickNextDayButton();
});

When('I navigate to previous day', () => {
  JournalPage.clickPreviousDayButton();
});

Then('I have a special needs slot for {string}', (candidateName) => {
  const exclamationIndicator = JournalPage.getExclamationIndicatorSpecialNeedsFor(candidateName);
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

Then('I have a welsh slot for {string}', (candidateName) => {
  const exclamationIndicator = JournalPage.getExclamationIndicatorWelshfor(candidateName);
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

When('I refresh the journal', () => {
  return JournalPage.clickRefreshButton();
  // todo: kc do we need to return the result of this call as per the original line below?
  // return TempPage.clickElement(refreshButton);
});

Then('I have a non-test slot for {string} with code {string} at {string}', (description, code, time) => {
  const slotLocator = JournalPage.getSlotLocator(description, code, time);
  return expect(slotLocator.isPresent()).to.eventually.be.true;
});

Then('the test result for {string} is {string}', (candidateName, testResultText) => {
  const testResultElement = JournalPage.getTestResultElementFor(candidateName);
  return expect(testResultElement.getText()).to.eventually.equal(testResultText);
});

Then('I should have a category {string} test for {string}', (category, candidateName) => {
  const testCategory = JournalPage.getTestCategoryElementFor(candidateName);
  return expect(testCategory.getText()).to.eventually.equal(category);
});

Then('The vehicle for {string} has length {string}, width {string}, height {string} and seats {string}',
(candidateName, length, width, height, seats) => {
  const lengthValue = JournalPage.getVehicleLengthElementFor(candidateName);
  expect(lengthValue.getText()).to.eventually.equal(length);

  const widthValue = JournalPage.getVehicleWidthElementFor(candidateName);
  expect(widthValue.getText()).to.eventually.equal(width);

  const heightValue = JournalPage.getVehicleHeightElementFor(candidateName);
  expect(heightValue.getText()).to.eventually.equal(height);

  const seatValue = JournalPage.getSeatElementFor(candidateName);
  return expect(seatValue.getText()).to.eventually.equal(seats);
});

Then('I continue the write up for {string}', (candidateName) => {
  JournalPage.clickContinueWriteupButton(candidateName);
});
