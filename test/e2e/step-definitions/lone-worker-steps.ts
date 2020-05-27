import { Then, When, Before } from 'cucumber';
import TestReportPage from '../pages/testReportPage';
import LoneWorker from '../pages/loneWorkerPage';
import { browser } from 'protractor';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

//Set default category to be cat b
this.testCategory = 'b';

When('I click the SOS button on the Test Report', () => {
  TestReportPage.clickOnTheSosButton();
});

When('I click and hold the {string} alert button', (incident: string) => {
  LoneWorker.raiseAlert(incident);
});

When('I close the create incident modal', () => {
  LoneWorker.closeTheIncidentModlal();
});

When('the incident is showing as {string}', (status: string) => {
  LoneWorker.incidentStatus(status);
});

When('the SOS button is not present', () => {
  LoneWorker.sosButtonIsNotPresent();
});

When('the Lone Worker Pop up is present', () => {
  LoneWorker.loneWorkerModal();
});

Then('I should see the incident modal', () => {
  return LoneWorker.loneWorkerIncidentModalText();
});
