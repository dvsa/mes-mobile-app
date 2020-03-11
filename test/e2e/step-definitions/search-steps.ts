import { When, Then } from 'cucumber';
import { by } from 'protractor';
import { textFieldInputViaNativeMode, scrollToElement, getElement, clickElement } from '../../helpers/interactionHelpers';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I click search completed tests', () => {
  const searchForCompletedTestsBtn = getElement(by.xpath('//page-dashboard//test-results-search-card//span'));
  clickElement(searchForCompletedTestsBtn);
});

When('I search for a completed test with the application reference of {string}', (searchTerm) => {
  textFieldInputViaNativeMode(
    '//XCUIElementTypeWindow//XCUIElementTypeTextField[@value="Enter an application reference"]', searchTerm);
  const searchButton = getElement(by.xpath('//*[@id="tab-search-candidate-details"]//ion-row[3]/button/span'));
  clickElement(searchButton);
});

When('the search result is clicked', () => {
  const searchResult = getElement(by.xpath('//page-test-results-search//search-result/ion-card/ion-grid/ion-row[2]'));
  clickElement(searchResult);
});

Then('the test result outcome is {string}', (testOutcome) => {
  const testOutcomeField = getElement(by.id('testOutcome'));
  expect(testOutcomeField.getText()).to.eventually.equal(testOutcome);
});

Then('the test result has the following data present', (table) => {
  table.rows().forEach((row: string[]) => {
    const dataRow = getElement(
      by.xpath(`//data-row/ion-row[ion-col/label[text() = '${row[0]}'] and ion-col/span[text() = '${row[1]}']]`));
    expect(dataRow.isPresent()).to.eventually.be.true;
  });
});

Then('the Debrief has the correct test information, {string}, {string}', (cat, categoryText) => {
  const debriefSection = getElement(by.xpath('//debrief-card'));
  scrollToElement(debriefSection);
  const catTellMeQuestion = getElement(by.xpath(
    `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span/span[@class="mes-data bold" and text() = "${cat}"]`));
  const textTellMeQuestion = getElement(by.xpath(
    `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span[@class="mes-data" and text() = "${categoryText}"]`));
  assertElementIsPresent([catTellMeQuestion, textTellMeQuestion]);
});

Then('I click the close button', () => {
  const closeButton = getElement(by.xpath('//div[2]/ion-header/ion-navbar/ion-buttons/button'));
  clickElement(closeButton);
});

Then('I click the back button on the search submitted test page', () => {
  const backButton = getElement(by.xpath('//page-test-results-search/ion-header/ion-navbar/button'));
  clickElement(backButton);
});

const assertElementIsPresent = (elements) => {
  elements.forEach((e) => {
    expect(e.isPresent()).to.eventually.be.true;
  });
};
