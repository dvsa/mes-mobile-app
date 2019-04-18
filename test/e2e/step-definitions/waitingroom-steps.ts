import { Then, When } from 'cucumber';
import { getElement, clickElement, enterPasscode } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

Then(/^the (communication page|waiting room) candidate name should be \"(.+)\"$/, (pageName: string,
                                                                                   candidateName: string) => {
  const pageType = (pageName === 'communication page' ? 'communication' : 'page-waiting-room');
  const candidateNameElement = getElement(by.xpath(`//${pageType}//h2[@id = 'candidate-name']`));
  return expect(candidateNameElement.getText()).to.eventually.equal(candidateName);
});

Then(/^the (communication page|waiting room) candidate driver number should be \"(.+)\"$/, (pageName: string,
                                                                                            driverNumber: string) => {
  const pageType = (pageName === 'communication page' ? 'communication' : 'page-waiting-room');
  const candidateDriverNumberElement = getElement(by.xpath(`//${pageType}//h3[@id = 'candidate-driver-number']`));
  return expect(candidateDriverNumberElement.getText()).to.eventually.equal(driverNumber);
});

When(/^the candidate confirms their (communication preference|declaration)$/, (pageName) => {
  const pageType = (pageName === 'communication preference' ? 'communication' : 'page-waiting-room');
  const continueButton = getElement(by.xpath(`//${pageType}//button[@id = 'continue-button']`));
  clickElement(continueButton);
});

When('the candidate completes the declaration page', () => {
  const declarationCheckbox = getElement(by.id('insurance-declaration-checkbox'));
  clickElement(declarationCheckbox);
  const residencyCheckbox = getElement(by.id('residency-declaration-checkbox'));
  clickElement(residencyCheckbox);
  const signatureField = getElement(by.xpath('//signature-pad/canvas'));
  clickElement(signatureField);
});

When('I proceed to the car', () => {
  // Examiner clicks continue button then enters passcode
  const continueButton = getElement(by.xpath('//page-waiting-room//button[@id = "continue-button"]'));
  clickElement(continueButton);
  enterPasscode();
});
