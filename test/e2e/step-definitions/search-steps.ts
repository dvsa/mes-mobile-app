import { When, Then } from 'cucumber';
import { by } from 'protractor';
import { scrollToElement } from '../../helpers/helpers';
import TempPage from '../pages/tempPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I click search completed tests', () => {
  const searchForCompletedTestsBtn = TempPage.getAndAwaitElement(by.xpath('//page-dashboard//test-results-search-card//span'));
  TempPage.clickElement(searchForCompletedTestsBtn);
});

When('I search for a completed test with the application reference of {string}', (searchTerm) => {
  TempPage.textFieldInputViaNativeMode(
    '//XCUIElementTypeWindow//XCUIElementTypeTextField[@value="Enter an application reference"]', searchTerm);
  const searchButton = TempPage.getAndAwaitElement(by.xpath('//*[@id="tab-search-candidate-details"]//ion-row[3]/button/span'));
  TempPage.clickElement(searchButton);
});

When('the search result is clicked', () => {
  const searchResult = TempPage.getAndAwaitElement(by.xpath('//page-test-results-search//search-result/ion-card/ion-grid/ion-row[2]'));
  TempPage.clickElement(searchResult);
});

Then('the test result outcome is {string}', (testOutcome) => {
  const testOutcomeField = TempPage.getAndAwaitElement(by.id('testOutcome'));
  expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then('the test result has the following data present', (table) => {
  table.rows().forEach((row: string[]) => {
    const dataRow = TempPage.getAndAwaitElement(
      by.xpath(`//data-row/ion-row[ion-col/label[text() = '${row[0]}'] and ion-col/span[text() = '${row[1]}']]`));
    expect(dataRow.isPresent()).to.eventually.be.true;
  });
});

Then('the Debrief has the correct test information, {string}, {string}', (cat, categoryText) => {
  const debriefSection = TempPage.getAndAwaitElement(by.xpath('//debrief-card'));
  scrollToElement(debriefSection);
  const catTellMeQuestion = TempPage.getAndAwaitElement(by.xpath(
    `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span/span[@class="mes-data bold" and text() = "${cat}"]`));
  const textTellMeQuestion = TempPage.getAndAwaitElement(by.xpath(
    `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span[@class="mes-data" and text() = "${categoryText}"]`));
  assertElementIsPresent([catTellMeQuestion, textTellMeQuestion]);
});

Then('I click the close button', () => {
  const closeButton = TempPage.getAndAwaitElement(by.xpath('//div[2]/ion-header/ion-navbar/ion-buttons/button'));
  TempPage.clickElement(closeButton);
});

Then('I click the back button on the search submitted test page', () => {
  const backButton = TempPage.getAndAwaitElement(by.xpath('//page-test-results-search/ion-header/ion-navbar/button'));
  TempPage.clickElement(backButton);
});

const assertElementIsPresent = (elements) => {
  elements.forEach((e) => {
    expect(e.isPresent()).to.eventually.be.true;
  });
};
