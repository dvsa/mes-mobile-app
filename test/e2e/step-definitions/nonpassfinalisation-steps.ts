import { When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

When('I continue to the back to office page', () => {
  const continueToBackToOfficeButton = getElement(by.id('continue-to-back-to-office'));
  clickElement(continueToBackToOfficeButton);
});
