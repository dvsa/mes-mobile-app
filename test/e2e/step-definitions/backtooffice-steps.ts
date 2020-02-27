import { Then, When } from 'cucumber';
import { browser, by, ExpectedConditions } from 'protractor';
import TempPage from '../pages/tempPage';

Then('I am on the back to office page', () => {
  // No page title so need to check something else exists that exists on the page
  const backToOfficePage = TempPage.getElement(by.id('back-to-office-page'));
  return browser.wait(ExpectedConditions.presenceOf(backToOfficePage));
});

When('I continue to the office write up', () => {
  const continueToWriteUpButton = TempPage.getElement(by.id('continue-to-write-up'));
  TempPage.clickElement(continueToWriteUpButton);
});
