import {browser, ExpectedConditions} from "protractor";
import {Given, Then, When} from 'cucumber';
import {DashboardPage} from "../helper/dashboardPage/dashboardPage";
import {JournalPage} from "../helper/Journal/jounralPage";
import {JournalPageObjects} from "../helper/Journal/jounralPage.po";
import {PageHelper} from "../helper/PageHelper/pageHelper";
import {LandingPage} from '../helper/landingPage/landingPage';
import { TEST_CONFIG } from '../test.config';


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
let journalPage: JournalPage = new JournalPage();
let journalPageElement: JournalPageObjects = new JournalPageObjects();
let landingPage: LandingPage = new LandingPage();
let dashboardPage: DashboardPage = new DashboardPage();
let pageHelper: PageHelper = new PageHelper;

Given('I am on the journal page as {string}', async (username) => {
  // Load the landing page
  await landingPage.onLandingPageAsAsync(username);
  // Navigate to journal page
  dashboardPage.clickGoToMyJournalButton();
  // If the journal page is loaded we should have a refresh button
  return expect(journalPageElement.getRefreshButton().isPresent(), 'refreshButton.isPresent()').to.eventually.be.true;
});

When('I view candidate details for {string}', (candidateName) => {
  return journalPage.viewCandidateDetails(candidateName);
});

When('I check candidate details for {string}', async (candidateName) => {
  await journalPage.viewCandidateDetails(candidateName);
  await journalPage.closeCandidateDetailsDialog();
});

When('I start the test for {string}', async (candidateName) => {
  await journalPage.startTestFor(candidateName);
  // If the start test early dialog is shown just select continue
  const startTestEarlyButton = journalPageElement.getStartTestEarlyButton;
  try {
    await startTestEarlyButton.isPresent();
    await journalPage.clickStartTestEarlyButton();
  } catch {
  }
  const startTestLateButton = journalPageElement.getStartTestLateButton;
  try {
    await startTestLateButton.isPresent();
    await journalPage.clickStartTestLateButton();
  } catch {
  }

});

When('I rekey a test for {string}', async (candidateName) => {
  const buttonElement = journalPageElement.getRekeyTestButtonFor(candidateName);
  try {
    await buttonElement.isPresent();
    pageHelper.resetApp('mobexaminer1'); // temp hardcoded string for testing.
    expect(buttonElement.isPresent()).to.eventually.be.true;
  } catch {
    expect(buttonElement.isPresent()).to.eventually.be.true;
  }
  await journalPage.clickRekeyTestButtonFor(candidateName);
});

When(/^I start the test (early|late) for \"(.+)\"$/, async (testTime: string, candidateName: string) => {
  if (testTime === 'early') {
    await journalPage.startingExpiredOrEarlyTest(candidateName);

    // If the start test early dialog is shown just select continue
    await journalPage.clickStartTestEarlyButton();
  }

  if (testTime === 'late') {
    await journalPage.startingExpiredOrEarlyTest(candidateName);

    // If the rekey dialog is shown so just select start test normally
    const lateStartTestButton = journalPageElement.getRekeyTestLateButton;
    try {
      await lateStartTestButton.isPresent();
      await journalPage.clickRekeyTestLateButton();
    } catch {
    }
  }
});

When('I rekey a late test for {string}', async (candidateName: string) => {
  await journalPage.startTestFor(candidateName);

  // If the rekey dialog is shown so just select start test normally
  const rekeyStartTestButton = journalPageElement.getRekeyTestLateButton;
  await journalPage.rekeyIsPresent();
  try {
    await rekeyStartTestButton.isPresent();
    await journalPage.clickRekeyTestLateButton();
  } catch {
  }
});

When('I navigate to next day', async () => {
  await journalPage.clickNextDayButton();
});

When('I navigate to {int} day(s) previously', async (numberOfDays: number) => {
  for (let i = 0; i < numberOfDays; i += 1) {
    await journalPage.clickPreviousDayButton();
  }
});

Then('I have a special needs slot for {string}', async (candidateName: string) => {
  const exclamationIndicator = await journalPageElement.getSpecialNeedsIndicatorFor(candidateName);
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

Then('I have a welsh slot for {string}', (candidateName: string) => {
  const exclamationIndicator = journalPageElement.getWelshIndicatorFor(candidateName);
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

When('I refresh the journal', async () => {
  await journalPage.clickRefreshButton();
});

Then('I have a non-test slot for {string} with code {string} at {string}', async (description: string, code: string, time: string) => {
  const slotLocator = journalPageElement.getSlotLocator(description, code, time);
  // todo: kc does getSlotLocator need this.waitForPresenceOfElement(element)
  //  if it is being used with isPresent()to.eventually.be.true?
  return expect(await slotLocator.isPresent()).to.eventually.be.true;
});

Then('the test result for {string} is {string}', async (candidateName: string, testResult: string) => {
  const testResultElement = journalPageElement.getTestResultElementFor(candidateName);
  await browser.wait(ExpectedConditions.presenceOf(testResultElement), TEST_CONFIG.Element_Wait);
  // todo: kc does getTestResultElementFor need this.waitForPresenceOfElement(element)
  //  if it is being used with isPresent()to.eventually.be.true?
  return expect(await testResultElement.getText()).to.eventually.equal(testResult);
});

Then('I should have a category {string} test for {string}', async (category: string, candidateName: string) => {
  const testCategory = journalPageElement.getTestCategoryElementFor(candidateName);
  return expect(await testCategory.getText()).to.eventually.equal(category);
});

Then('The vehicle for {string} has length {string}, width {string}, height {string} and seats {string}',
  async (candidateName: string, length: string, width: string, height: string, seats: string) => {
    const lengthValue = journalPageElement.getVehicleLengthElementFor(candidateName);
    expect(await lengthValue.getText()).to.eventually.equal(length);

    const widthValue = journalPageElement.getVehicleWidthElementFor(candidateName);
    expect(await widthValue.getText()).to.eventually.equal(width);

    const heightValue = journalPageElement.getVehicleHeightElementFor(candidateName);
    expect(await heightValue.getText()).to.eventually.equal(height);

    const seatValue = journalPageElement.getSeatElementFor(candidateName);
    return expect(await seatValue.getText()).to.eventually.equal(seats);
  });

Then('I continue the write up for {string}', async (candidateName) => {
  await journalPage.clickContinueWriteupButton(candidateName);
});

When('I close the candidate test details modal', async () => {
  await journalPage.closeCandidateDetailsDialog();
});
