import { When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { textFieldInputViaNativeMode } from '../../helpers/helpers'; 

When('I click search completed tests', () => {
  const searchForCompletedTestsBtn = getElement(by.xpath('//page-dashboard//test-results-search-card//span'));
  clickElement(searchForCompletedTestsBtn);
});

When('I search for a completed test with the application reference of {string}', (searchTerm) => {
  textFieldInputViaNativeMode('//XCUIElementTypeWindow//XCUIElementTypeTextField[@value="Enter an application reference"]', searchTerm);
  const searchButton = getElement(by.xpath('//*[@id="tab-search-candidate-details"]//ion-row[3]/button/span'));
  clickElement(searchButton);
});
