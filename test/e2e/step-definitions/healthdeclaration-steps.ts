import { When, Then, Before } from 'cucumber';
import { getElement, clickElement, enterPasscode } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// Set default category to be cat b
this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  // This hook will be executed before scenarios tagged with @catbe
  this.testCategory = 'be';
});

Then('the pass certificate number should be {string}', (certificateNumber) => {
  const passCertificateNumber = getElement(by.id('declaration-pass-certificate-number'));
  passCertificateNumber.getText().then((textValue) => {
    expect(textValue.trim().endsWith(`: ${certificateNumber}`)).to.be.true;
  });
});

When('I try to confirm the health declaration', () => {
  confirmHealthDeclaration();
});

When('I complete the health declaration', () => {
  const healthDeclarationCheckbox = getElement(by.id('health-declaration-checkbox'));
  clickElement(healthDeclarationCheckbox);
  const receiptDeclarationCheckbox = getElement(by.id('receipt-declaration-checkbox'));
  clickElement(receiptDeclarationCheckbox);
  const healthSignatureField = getElement(by.xpath(
    `//div[contains(@class, "health-declaration-cat-${this.testCategory}-page")]//signature-pad/canvas`));
  clickElement(healthSignatureField);

  // Examiner clicks continue button then enters passcode - Note button has same id as another on page
  confirmHealthDeclaration();
  enterPasscode();
});

const confirmHealthDeclaration = () => {
  const buttonElement = getElement(by.xpath(
    `//div[contains(@class, "health-declaration-cat-${this.testCategory}-page")]//button[@id="continue-button"]`));
  clickElement(buttonElement);
};
