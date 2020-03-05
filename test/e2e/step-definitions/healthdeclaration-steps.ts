import { When, Then, Before } from 'cucumber';
import { enterPasscode } from './generic-steps';
import { by } from 'protractor';
import { getElement, clickElement } from '../../helpers/interactionHelpers';
import TempPage from '../pages/tempPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  this.testCategory = 'be';
});

Before({ tags: '@catc' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catce' }, () => {
  this.testCategory = 'c';
});

Then('the pass certificate number should be {string}', (certificateNumber) => {
  const passCertificateNumber = TempPage.getElement(by.id('declaration-pass-certificate-number'));
  passCertificateNumber.getText().then((textValue) => {
    expect(textValue.trim().endsWith(`: ${certificateNumber}`)).to.be.true;
  });
});

When('I try to confirm the health declaration', () => {
  confirmHealthDeclaration();
});

When('I complete the health declaration', () => {
  const healthDeclarationCheckbox = TempPage.getElement(by.id('health-declaration-checkbox'));
  TempPage.clickElement(healthDeclarationCheckbox);
  const receiptDeclarationCheckbox = TempPage.getElement(by.id('receipt-declaration-checkbox'));
  TempPage.clickElement(receiptDeclarationCheckbox);
  const healthSignatureField = TempPage.getElement(by.xpath(
    `//div[contains(@class, "health-declaration-cat-${this.testCategory}-page")]//signature-pad/canvas`));
    TempPage.clickElement(healthSignatureField);

  // Examiner clicks continue button then enters passcode - Note button has same id as another on page
  confirmHealthDeclaration();
  enterPasscode();
});

const confirmHealthDeclaration = () => {
  const buttonElement = TempPage.getElement(by.xpath(
    `//div[contains(@class, "health-declaration-cat-${this.testCategory}-page")]//button[@id="continue-button"]`));
    TempPage.clickElement(buttonElement);
};
