import { Before } from 'cucumber';
import { browser, element, by } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import LoginPage from '../pages/loginPage';
import LandingPage from '../pages/landingPage';
import DashboardPage from '../pages/dashboardPage';
import JournalPage from '../pages/journalPage';
import TestReportPage from '../pages/testReportPage';
import BackToOfficePage from '../pages/backToOfficePage';
import PageHelper from '../pages/pageHelper';

const {
  Given,
  Then,
  When,
  setDefaultTimeout,
  After,
  Status,
  AfterAll,
} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const fs = require('fs');

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

Before({ tags: '@catce' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'ce';
});

// We need this much timeout for the login process to complete
setDefaultTimeout(TEST_CONFIG.DEFAULT_TIMEOUT);

// Turn off syncronisation with Angular
browser.ignoreSynchronization = true;

let screenshotAlways = false;
browser.getProcessedConfig().then((config) => {
  screenshotAlways = config.screenshotAlways;
});

Given('I am not logged in', () => {

  // Wait for app to be ready
  browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  browser.waitForAngular();

  // Log out if we are logged in
  LoginPage.logout();

  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      // Wait until we are on the login page before proceeding
      LoginPage.isCurrentPage();

      // Switch back to WEBVIEW context
      browser.driver.selectContext(LoginPage.getParentContext(webviewContext));
    });
  });
});

Given('I am logged in as {string} and I have a test for {string}', async (username, candidateName) => {
  // Go to journal page as the user
  JournalPage.onJournalPageAs(username);

  // Once the journal is loaded and ready check to see if we have a Start test button for the candidate else reset state
  // JournalPage.getRefreshButton();

  JournalPage.isCurrentPage();
  const buttonElement = JournalPage.getStartTestButtonFor(candidateName, false);
  const buttonElementIsPresent = await JournalPage.isButtonPresent(buttonElement);

  if (!buttonElementIsPresent) {
    PageHelper.resetApp(username); // temp hardcoded string for testing.
  }

  return expect(buttonElementIsPresent).to.be.true;
});

When('I launch the mobile app', () => {
  // Application is already launched by framework
});

Then('I should see the Microsoft login page', () => {
  // To be able to fill in the Authenticator login we need to switch to NATIVE context then switch back to WEBVIEW after
  browser.driver.getCurrentContext().then((webviewContext) => {

    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      // Check for Microsoft login username field
      const usernameFld = LoginPage.getUsernameField();
      expect(usernameFld.isPresent()).to.eventually.be.true;

      // Switch back to WEBVIEW context
      browser.driver.selectContext(PageHelper.getParentContext(webviewContext));
    });
  });
});

Given('I am on the landing page as {string}', (username) => {
  LandingPage.onLandingPageAs(username);
});

When(/^I start marking a practice test (with|without) a driving fault$/, (drivingFault) => {
  DashboardPage.clickPracticeMarkingATestCatB();
  DashboardPage.clickStartWithOrWithoutADrivingFault(drivingFault);
});

Given(/^I start full practice mode$/, () => {
  DashboardPage.clickStartFullPracticeMode();

  const practiceModeBanner = TestReportPage.getPracticeModeBanner();
  return expect(practiceModeBanner.isPresent()).to.eventually.be.true;
});

When('I log in to the application as {string}', (username) => {
  LoginPage.login(username);

  // If the dashboard has loaded we should see the employee id
  // todo: kc seems we should also see employee id if landing page is loaded (see ln 107) which is right?
  DashboardPage.isCurrentPage(username);
});

Then('I should see the {string} page', async (pageTitle) => {
  // Wait for the page title to exist
  PageHelper.getPageTitle(pageTitle);

  // Check that it is the last page title i.e. the displayed one
  const getDisplayedPageTitle = await PageHelper.getDisplayedPageTitle();
  return expect(getDisplayedPageTitle).to.equal(pageTitle);
});

Then('I should see the {string} contains {string}', (rowName, rowValue) => {
  JournalPage.rowContains(rowName, rowValue);
});

When('I click on the {string} button', (buttonId) => {
  PageHelper.clickButtonByCssId(buttonId);
});

Then('validation item {string} should be visible', (validationId: string) => {
  const validationElement = PageHelper.getElementByCssId(validationId);
  return expect(validationElement.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('validation item {string} should not be visible', (validationId: string) => {
  const validationElement = PageHelper.getElementByCssId(validationId);
  return expect(validationElement.getAttribute('class')).to.eventually.not.contain('ng-invalid');
});

Then('validation item {string} should not exist', (validationId: string) => {
  element.all(by.id(validationId)).then((elements) => {
    expect(elements.length).to.equal(0);
  });
});

Then('validation item {string} should be {string}', (validationId: string, validationText: string) => {
  const validationElement = PageHelper.getElementByCssId(validationId);
  return expect(validationElement.getText()).to.eventually.equal(validationText);
});

When('I terminate the test', () => {
  TestReportPage.clickLastEndTestButton();
  TestReportPage.clickTerminateTestButton();
  PageHelper.enterPasscode();
});

When('I exit practice mode', () => {
  TestReportPage.clickLastExitPracticeButton();
});

Then(/^the (communication page|waiting room|debrief|health declaration) candidate name should be "(.+)"$/, (
  pageName: string, candidateName: string) => {
  const candidateNameElement = PageHelper.getCandidateNameElement(pageName, this.testCategory);
  return expect(candidateNameElement.getText()).to.eventually.equal(candidateName);
});

Then(/^the (communication page|waiting room|debrief|health declaration) candidate driver number should be "(.+)"$/, (
  pageName: string, driverNumber: string) => {
  const candidateDriverNumberElement = PageHelper.getCandidateDriveNumberElement(pageName, this.testCategory);
  return expect(candidateDriverNumberElement.getText()).to.eventually.equal(driverNumber);
});

Then('I return to the Journal Page', () => {
  BackToOfficePage.clickBackToJournalButton();
});

When('I click the back button', () => {
  JournalPage.clickBackButton();
});

When('I click go to my Journal', () => {
  DashboardPage.clickGoToMyJournalButton();
});

/**
 * Take a screenshot of the page at the end of the scenario.
 */
After(function (testCase) {
  if (screenshotAlways || testCase.result.status === Status.FAILED) {
    return browser.driver.takeScreenshot().then((screenShot) => {
      this.attach(screenShot, 'image/png');
    });
  }
});

/**
 * Output the UI processed config so it may be included in the HTML report.
 */
AfterAll(() => {
  browser.getProcessedConfig().then((config) => {
    fs.writeFile('./test-reports/e2e-test-config.json', JSON.stringify(config), (err) => {
      if (err) {
        return console.log(err);
      }
    });
  });
});

//////////////////////////////////////////// SHARED FUNCTIONS ////////////////////////////////////////////

/**
 * Output the page source to a file - For debug purposes only
 * @param fileName the name of the file to output to
 */
export const logPageSource = (fileName: string) => {
  browser.getPageSource().then((pageSource) => {
    const fs = require('fs');
    fs.writeFile(fileName, pageSource, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`The page source was saved as ${fileName}`);
    });
  });
};
