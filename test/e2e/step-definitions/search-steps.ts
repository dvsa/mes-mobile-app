import { When, Then } from 'cucumber';
import { SearchPage } from '../helper/searchPage/searchPage';
import { SearchPageObject } from '../helper/searchPage/searchPage.po';

const searchPage : SearchPage = new SearchPage();
const searchPageElement : SearchPageObject = new SearchPageObject();

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I click search completed tests', async () => {
  await searchPage.clickSearchForCompletedTestsButton();
});

When('I search for a completed test with the application reference of {string}', async (searchTerm) => {
  await searchPage.enterSearchTerm(searchTerm);
  await searchPage.clickSearchButton();
});

When('the search result is clicked', async () => {
  await searchPage.clickSearchResult(2);
});

Then('the test result outcome is {string}', async (testOutcome) => {
  const testOutcomeField = searchPageElement.testOutcome;
  expect(await testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then('the test result has the following data present', async (table) => {
  await searchPage.dataIsPresent(table);
});

Then('the Debrief has the correct test information, {string}, {string}', async (cat, categoryText) => {
  searchPage.scrollToDebriefSection();
  const catTellMeQuestion = searchPageElement.TellMeQuestionCategory(cat);
  const textTellMeQuestion = searchPageElement.TellMeQuestionText(categoryText);
  await searchPage.assertElementIsPresent([catTellMeQuestion, textTellMeQuestion]);
});

Then('I click the close button', async () => {
  await searchPage.clickCloseButton();
});

Then('I click the back button on the search submitted test page', async () => {
  await searchPage.clickBackButton();
});
