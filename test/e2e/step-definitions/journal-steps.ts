import JournalPage from '../pages/journalPage';
import TempPage from '../pages/tempPage';

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
  const refreshButton = JournalPage.getRefreshButton();
  return expect(refreshButton.isPresent()).to.eventually.be.true;
});

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
  const previousDayButtonElement = TempPage.getAndAwaitElement(by.id('previous-day-container'));
  TempPage.clickElement(previousDayButtonElement);

  JournalPage.clickRekeyTestButtonFor(candidateName);
  // todo: added as part of an independent commit.  Left in to make
  // sure that the merge works correctly.
  // const buttonElement = TempPage.getAndAwaitElement(by.xpath(`//button/span/h3[text()[normalize-space(.) = "Rekey"]]
  // [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
  // h3[text() = "${candidateName}"]]`));
  // TempPage.clickElement(buttonElement);
});

When(/^I start the test (early|late) for \"(.+)\"$/, (testTime: string, candidateName: string) => {
  if (testTime === 'early') {
    startingExpiredOrEarlyTest(candidateName);

    // If the start test early dialog is shown just select continue
    const startTestEarlyButton = element(by.id('early-start-start-test-button'));
    startTestEarlyButton.isPresent().then((result) => {
      if (result) {
        clickElement(startTestEarlyButton);
      }
    });
  }

  if (testTime === 'late') {
    startingExpiredOrEarlyTest(candidateName);

    // If the rekey dialog is shown so just select start test normally
    const lateStartTestButton = element(by.id('rekey-start-test-button'));
    lateStartTestButton.isPresent().then((result) => {
      if (result) {
        clickElement(lateStartTestButton);
      }
    });
  }
});

When('I rekey a late test for {string}',(candidateName) => {
  const buttonElement = TempPage.getAndAwaitElement(by.xpath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  TempPage.clickElement(buttonElement);
});

When('I navigate to next day', () => {
  JournalPage.clickNextDayButton();
});

When('I navigate to previous day', () => {
  JournalPage.clickPreviousDayButton();
});

Then('I have a special needs slot for {string}', (candidateName) => {
  const exclamationIndicator = JournalPage.getSpecialNeedsIndicatorFor(candidateName);
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

Then('I have a welsh slot for {string}', (candidateName) => {
  const exclamationIndicator = JournalPage.getWelshIndicatorFor(candidateName);
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

When('I refresh the journal', () => {
  JournalPage.clickRefreshButton();
});

Then('I have a non-test slot for {string} with code {string} at {string}', (description, code, time) => {
  const slotLocator = JournalPage.getSlotLocator(description, code, time);
  // todo: kc does getSlotLocator need this.waitForPresenceOfElement(element)
  //  if it is being used with isPresent()to.eventually.be.true?
  return expect(slotLocator.isPresent()).to.eventually.be.true;
});

Then('the test result for {string} is {string}', (candidateName, testResult) => {
  const testResultElement = JournalPage.getTestResultElementFor(candidateName);
  // todo: kc does getTestResultElementFor need this.waitForPresenceOfElement(element)
  //  if it is being used with isPresent()to.eventually.be.true?
  return expect(testResultElement.getText()).to.eventually.equal(testResult);
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

const rekeyIsPresent = () => {
  const rekeyStartTestButton = element(by.id('rekey-start-test-button'));
  return expect(rekeyStartTestButton.isPresent()).to.eventually.be.true;
};

const timeDialog = () => {
  const testDialog = getElement(by.className(`modal-alert-header`));
  return expect(testDialog.isPresent()).to.eventually.be.true;
};

const startingExpiredOrEarlyTest = (candidateName) => {
  const buttonElement = getElement(by.xpath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  clickElement(buttonElement);
  timeDialog();
};
