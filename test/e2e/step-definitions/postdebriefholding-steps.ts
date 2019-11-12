import { Then, When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { browser, by, ExpectedConditions } from 'protractor';

Then('I am on the post debrief holding page', () => {
  // No page title so need to check something else exists that exists on the page
  const postDebriefHoldingPage = getElement(by.id('post-debrief-holding-cat-b-page'));
  return browser.wait(ExpectedConditions.presenceOf(postDebriefHoldingPage));
});

When('I continue to the non pass finalisation page', () => {
  const continueToNonPassFinalisationButton = getElement(by.id('continue-to-non-pass-finalisation'));
  clickElement(continueToNonPassFinalisationButton);
});
