import { When, Then } from 'cucumber';
import { by } from 'protractor';
import TempPage from '../pages/tempPage';
import SearchPage from '../pages/SearchPage';

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
  const testOutcomeField = SearchPage.getTestOutcome();
  expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then('the test result has the following data present', (table) => {
  SearchPage.dataIsPresent(table);
});

Then('the Debrief has the correct test information, {string}, {string}', (cat, categoryText) => {
  SearchPage.scrollToDebriefSection();
  const catTellMeQuestion = SearchPage.getTellMeQuestionCategory(cat);
  const textTellMeQuestion = SearchPage.getTellMeQuestionText(categoryText);
  SearchPage.assertElementIsPresent([catTellMeQuestion, textTellMeQuestion]);
});

Then('I click the close button', () => {
  SearchPage.clickCloseButton();
});

Then('I click the back button on the search submitted test page', () => {
  SearchPage.clickBackButton();
});
