import { When } from 'cucumber';
import { getElement, clickElement } from './generic-steps';
import { by } from 'protractor';

When('I end the debrief', () => {
  const endDebriefButton = getElement(by.xpath('//button[span[h3[text()="End debrief"]]]'));
  clickElement(endDebriefButton);
});

When('I complete the pass details', () => {
  const passCertificateNumberField = getElement(by.id('pass-certificate-number'));
  passCertificateNumberField.sendKeys('123456789');
  const licenceRecievedRadio = getElement(by.id('license-received'));
  clickElement(licenceRecievedRadio);
  const continueButton = getElement(by.xpath('//page-pass-finalisation//button[span[h3[text() = "Continue"]]]'));
  clickElement(continueButton);
});
