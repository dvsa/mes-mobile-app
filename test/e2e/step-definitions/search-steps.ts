import { When,Then } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { textFieldInputViaNativeMode, scrollToElement } from '../../helpers/helpers';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

When('I click search completed tests', () => {
  const searchForCompletedTestsBtn = getElement(by.xpath('//page-dashboard//test-results-search-card//span'));
  clickElement(searchForCompletedTestsBtn);
});

When('I search for a completed test with the application reference of {string}', (searchTerm) => {
  textFieldInputViaNativeMode('//XCUIElementTypeWindow//XCUIElementTypeTextField[@value="Enter an application reference"]', searchTerm);
  const searchButton = getElement(by.xpath('//*[@id="tab-search-candidate-details"]//ion-row[3]/button/span'));
  clickElement(searchButton);
});

When('the search result is clicked', () => {
  const searchResult = getElement(by.xpath('//page-test-results-search//search-result/ion-card/ion-grid/ion-row[2]'));
  clickElement(searchResult);
});

Then('the Test Details has the correct test information, {string}, {string}, {string}, {string}', (result: string, reference, category, type) => {
  const testResult = getElement(by.xpath(`//*[@id="testOutcome"][@class="mes-${result}"]`));
  const applicationReference = getElement(by.xpath(`//test-details-card//data-row[3][@ng-reflect-value="${reference}"]`));
  const testCategory = getElement(by.xpath(`//test-details-card//data-row[4][@ng-reflect-value="${category}"]`));
  const testType = getElement(by.xpath(`//test-details-card//data-row[5][@ng-reflect-value="${type}"]`));
  assertElementIsPresent([testResult, applicationReference, testCategory, testType]);
});

Then('the Defrief has the correct test information, {string}, {string}', (category, categoryText) => {
  const debriefSection = getElement(by.xpath('//debrief-card'));
  scrollToElement(debriefSection);
  const catTellMeQuestion = getElement(by.xpath(`//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span/span[@class="mes-data bold" and text() = "${category}"]`));
  const textTellMeQuestion = getElement(by.xpath(`//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span[@class="mes-data" and text() = "${categoryText}"]`));
  assertElementIsPresent([catTellMeQuestion,textTellMeQuestion]);
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
