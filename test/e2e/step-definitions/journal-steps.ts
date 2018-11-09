import { browser, WebDriver, element, by } from 'protractor';

const { Given, Then, When, setDefaultTimeout, After, Status } = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const basePage = require('../pages/page.js');
const journalPage = require('../pages/journal-page.js');
const welcomePage = require('../pages/welcome-page.js');

setDefaultTimeout(10 * 1000);

////////////////////////////////// Journal Page //////////////////////////////////

Then('I am on the journal page', function() {
  return validateJournalPage();
});

Given('I am logged in and on the journal page', function() {
  //Navigate to journal page
  basePage.open();
  welcomePage.clickOk();
  return validateJournalPage();
});

Then('I have a slot at {string} for {string}', function(slotTime, candidateName) {
  return expect(journalPage.slotExists(slotTime, candidateName)).to.eventually.equal(true);
});

Then('I view candidate details for {string}', function(candidateName) {
  return journalPage.viewCandidate(candidateName);
});

function validateJournalPage() {
  return expect(journalPage.getPageTitle()).to.eventually.equal('Journal');
}
