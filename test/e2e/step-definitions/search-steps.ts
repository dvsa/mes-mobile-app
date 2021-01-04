import { When, Then } from 'cucumber';
import SearchPage from '../pages/SearchPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I click search completed tests', () => {
  SearchPage.clickSearchForCompletedTestsButton();
});

When('I search for a completed test with the application reference of {string}', (searchTerm) => {
  SearchPage.enterSearchTerm(searchTerm);
  SearchPage.clickSearchButton();
});

When('the search result is clicked', () => {
  SearchPage.clickSearchResult(2);
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

Then('I click on Search booked tests button', () => {
  SearchPage.clickRekeySearchBookTestButton();
});

Then('I search for a completed test with the application reference {string}', (searchTerm) => {
  const searchField = SearchPage.getRekeyApplicationRefNumberInput();
  searchField.sendKeys(searchTerm);
  SearchPage.clickRekeySearchBookTestButton();
});
