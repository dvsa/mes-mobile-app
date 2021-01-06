import JournalPage from '../pages/journalPage';
import PageHelper from '../pages/pageHelper';
import LandingPage from '../pages/landingPage';
import DashboardPage from '../pages/dashboardPage';

const {
  Given,
  Then,
  When,
} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

Given('I am on the my dashboard page as {string}',  async (username) => {
  // Load the landing page
  await LandingPage.onLandingPageAsAsync(username);

  // If the dashboard page is loaded we should have a Rekey Delegated Examiner Test button
  const rekeyDelegatedButton = DashboardPage.getRekeyDelegatedExaminerTestButton();
  return expect(rekeyDelegatedButton.isPresent(), 'rekeyDelegatedButton.isPresent()').to.eventually.be.true;
});

When('I click on the test rekey delegated examiner test',  async () => {

  // Navigate to Rekey Delegated Examiner Test page
  DashboardPage.clickRekeyDelegatedExaminerTestButton();

  // If the journal page is loaded we should have a refresh button
  // const refreshButton = JournalPage.getRefreshButton();
  // return expect(refreshButton.isPresent(), 'refreshButton.isPresent()').to.eventually.be.true;
});
