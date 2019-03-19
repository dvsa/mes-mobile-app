import { Then } from 'cucumber';
import { getElement } from './generic-steps';
import { by } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

Then('the waiting room candidate name should be {string}', (candidateName: string) => {
  const candidateNameElement = getElement(by.css('#candidate-name'));
  return expect(candidateNameElement.getText()).to.eventually.equal(candidateName);
});

Then('the waiting room candidate driver number should be {string}', (driverNumber: string) => {
  const candidateDriverNumberElement = getElement(by.css('#candidate-driver-number'));
  return expect(candidateDriverNumberElement.getText()).to.eventually.equal(driverNumber);
});
