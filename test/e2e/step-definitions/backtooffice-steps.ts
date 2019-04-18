import { Then, When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { browser, by, ExpectedConditions } from 'protractor';

Then('I am on the back to office page', () => {
  // No page title so need to check something else exists that exists on the page
  const continueToWriteUpPage = getElement(by.id('continue-to-write-up-page'));
  return browser.wait(ExpectedConditions.presenceOf(continueToWriteUpPage));
});

When('I continue to the office write up', () => {
  const continueToWriteUpButton = getElement(by.id('continue-to-write-up'));
  clickElement(continueToWriteUpButton);
});
