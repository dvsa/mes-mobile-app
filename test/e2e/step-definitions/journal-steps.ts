import JournalPage from '../pages/journalPage';
import PageHelper from '../pages/pageHelper';
import LandingPage from '../pages/landingPage';
import DashboardPage from '../pages/dashboardPage';
import {browser, ExpectedConditions} from "protractor";
import {TEST_CONFIG} from "../test.config";

const {
  Given,
  Then,
  When,
} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

Given('I am on the journal page as {string}',  async (username) => {
  // Load the landing page
  await LandingPage.onLandingPageAsAsync(username);

  // Navigate to journal page
  DashboardPage.clickGoToMyJournalButton();

  // If the journal page is loaded we should have a refresh button
  const refreshButton = JournalPage.getRefreshButton();
  return expect(refreshButton.isPresent(), 'refreshButton.isPresent()').to.eventually.be.true;
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
    // If the start test early dialog is shown just select continue
  const startTestEarlyButton = JournalPage.getStartTestEarlyButton();

  startTestEarlyButton.isPresent().then((result) => {
    if (result) {
      JournalPage.clickStartTestEarlyButton();
    }
  });

  const startTestLateButton = JournalPage.getStartTestLateButton();

  startTestLateButton.isPresent().then((result) => {
    if (result) {
      JournalPage.clickStartTestLateButton();
    }
  });
});

When('I rekey a test for {string}', (candidateName) => {
  const buttonElement = JournalPage.getRekeyTestButtonFor(candidateName);

  buttonElement.isPresent().then((isStartPresent) => {
    if (!isStartPresent) {
      PageHelper.resetApp('mobexaminer1'); // temp hardcoded string for testing.
    }
  });
  expect(buttonElement.isPresent()).to.eventually.be.true;

  JournalPage.clickRekeyTestButtonFor(candidateName);
});

When(/^I start the test (early|late) for \"(.+)\"$/, (testTime: string, candidateName: string) => {
  if (testTime === 'early') {
    JournalPage.startingExpiredOrEarlyTest(candidateName);

    // If the start test early dialog is shown just select continue
    const startTestEarlyButton = JournalPage.getStartTestEarlyButton();
    startTestEarlyButton.isPresent().then((result) => {
      if (result) {
        JournalPage.clickStartTestEarlyButton();
      }
    });
  }

  if (testTime === 'late') {
    JournalPage.startingExpiredOrEarlyTest(candidateName);

    // If the rekey dialog is shown so just select start test normally
    const lateStartTestButton = JournalPage.getRekeyTestLateButton();
    lateStartTestButton.isPresent().then((result) => {
      if (result) {
        JournalPage.clickRekeyTestLateButton();
      }
    });
  }
});

When('I rekey a late test for {string}', (candidateName) => {
  JournalPage.startTestFor(candidateName);

  // If the rekey dialog is shown so just select start test normally
  const rekeyStartTestButton = JournalPage.getRekeyTestLateButton();
  JournalPage.rekeyIsPresent();
  rekeyStartTestButton.isPresent().then((result) => {
    if (result) {
      JournalPage.clickRekeyTestLateButton();
    }
  });
});

When('I navigate to next day', () => {
  JournalPage.clickNextDayButton();
});

When('I navigate to {int} day(s) previously', (numberOfDays) => {
  for (let i = 0; i < numberOfDays; i += 1) {
    JournalPage.clickPreviousDayButton();
  }
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
  browser.wait(ExpectedConditions.presenceOf(testResultElement), TEST_CONFIG.Element_Wait);
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

When('I close the candidate test details modal', () => {
  JournalPage.closeCandidateDetailsDialog();
});
