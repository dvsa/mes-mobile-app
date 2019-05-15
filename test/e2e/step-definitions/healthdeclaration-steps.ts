import { When } from 'cucumber';
import { getElement, clickElement, enterPasscode } from './generic-steps';
import { by } from 'protractor';

When('I complete the health declaration', () => {
  const healthDeclarationCheckbox = getElement(by.id('health-declaration-checkbox'));
  clickElement(healthDeclarationCheckbox);
  const receiptDeclarationCheckbox = getElement(by.id('receipt-declaration-checkbox'));
  clickElement(receiptDeclarationCheckbox);
  const healthSignatureField = getElement(by.xpath('//page-health-declaration//signature-pad/canvas'));
  clickElement(healthSignatureField);

  // Examiner clicks continue button then enters passcode - Note button has same id as another on page
  const buttonElement = getElement(by.xpath('//page-health-declaration//button[@id="continue-button"]'));
  clickElement(buttonElement);
  enterPasscode();
});
