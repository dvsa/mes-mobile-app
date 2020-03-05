import { browser, by, element, ExpectedConditions } from 'protractor';
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
  browser.wait(ExpectedConditions.presenceOf(refreshButton));
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
  const buttonElement = TempPage.getAndAwaitElement(
    by.xpath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  TempPage.clickElement(buttonElement);

  // If the rekey dialog is shown so just select start test normally
  const rekeyStartTestButton = element(by.id('rekey-start-test-button'));
  rekeyStartTestButton.isPresent().then((result) => {
    if (result) {
      TempPage.clickElement(rekeyStartTestButton);
    }
  });

    // If the start test early dialog is shown just select continue
  const startTestEarlyButton = element(by.id('early-start-start-test-button'));
  startTestEarlyButton.isPresent().then((result) => {
    if (result) {
      TempPage.clickElement(startTestEarlyButton);
    }
  });
});

When('I rekey a test for {string}', (candidateName) => {
  const buttonElement = TempPage.getAndAwaitElement(by.xpath(`//button/span/h3[text()[normalize-space(.) = "Rekey"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  TempPage.clickElement(buttonElement);
});

When('I navigate to next day', () => {
  const nextDayButtonElement = TempPage.getAndAwaitElement(by.id('next-day-container'));
  return TempPage.clickElement(nextDayButtonElement);
});

When('I navigate to previous day', () => {
  const previousDayButtonElement = TempPage.getAndAwaitElement(by.id('previous-day-container'));
  return TempPage.clickElement(previousDayButtonElement);
});

Then('I have a special needs slot for {string}', (candidateName) => {
  const exclamationIndicator = TempPage.getAndAwaitElement(
    by.xpath(`//indicators/div/img[@class = "exclamation-indicator"]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

Then('I have a welsh slot for {string}', (candidateName) => {
  const exclamationIndicator = TempPage.getAndAwaitElement(by.xpath(`//ion-grid/ion-row/ion-col/language/
  div[@class = "welsh-language-indicator"][ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link
    /div/button/span/h3[text() = "${candidateName}"]]`));
  return expect(exclamationIndicator.isPresent()).to.eventually.be.true;
});

When('I refresh the journal', () => {
  const refreshButton = TempPage.getAndAwaitElement(by.xpath('//button/span/span/span[text() = "Refresh"]'));
  return TempPage.clickElement(refreshButton);
});

Then('I have a non-test slot for {string} with code {string} at {string}', (description, code, time) => {
  const slotLocator = TempPage.getAndAwaitElement(by.xpath(`//ion-row[ion-col/div/time/div/h2[text() = '${time}']]
  [ion-col/h3[normalize-space(text()) = '${description}']][ion-col[h2[text() = '${code}']]]`));
  return expect(slotLocator.isPresent()).to.eventually.be.true;
});

Then('the test result for {string} is {string}', (candidateName, testResult) => {
  const testResultElement = TempPage.getAndAwaitElement(by.xpath(`//test-outcome//span[@class='outcome']/h2
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));

  return expect(testResultElement.getText()).to.eventually.equal(testResult);
});

Then('I should have a category {string} test for {string}', (category, candidateName) => {
  const testCategory = TempPage.getAndAwaitElement(
    by.xpath(`//test-category/h2[ancestor::ion-row/ion-col/ion-grid/ion-row/
    ion-col/candidate-link/div/button/span/h3[text() = "${candidateName}"]]`));
  return expect(testCategory.getText()).to.eventually.equal(category);
});

Then('The vehicle for {string} has length {string}, width {string}, height {string} and seats {string}',
(candidateName, length, width, height, seats) => {
  const lengthValue = TempPage.getAndAwaitElement(
    by.xpath(`//vehicle-details/div/span/span[text()= 'L: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`));
  expect(lengthValue.getText()).to.eventually.equal(length);

  const widthValue = TempPage.getAndAwaitElement(
    by.xpath(`//vehicle-details/div/span/span[text()= 'W: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`));
  expect(widthValue.getText()).to.eventually.equal(width);

  const heightValue = TempPage.getAndAwaitElement(
    by.xpath(`//vehicle-details/div/span/span[text()= 'H: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`));
  expect(heightValue.getText()).to.eventually.equal(height);

  const seatValue = TempPage.getAndAwaitElement(
    by.xpath(`//vehicle-details/div/span/span[text() = 'Seats: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`));
  return expect(seatValue.getText()).to.eventually.equal(seats);
});

Then('I continue the write up for {string}', (candidateName) => {
  const continueWriteUp = TempPage.getAndAwaitElement(
    by.xpath(`//button/span/h3[text()[normalize-space(.) = "Write-up"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));
  TempPage.clickElement(continueWriteUp);
});
