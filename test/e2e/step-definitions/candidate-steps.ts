import { browser, WebDriver, element, by } from 'protractor';

const { Given, Then, When, setDefaultTimeout, After, Status } = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const candidatePage = require('../pages/candidate-page.js');

setDefaultTimeout(10 * 1000);

////////////////////////////////// Candidate Page //////////////////////////////////
Then('I am on the view candidate page', function() {
  return expect(candidatePage.getPageTitle()).to.eventually.equal('View candidate');
});
