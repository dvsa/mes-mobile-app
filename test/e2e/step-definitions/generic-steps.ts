import { After, AfterAll, Before, Given, setDefaultTimeout, Status, Then, When } from 'cucumber';
import { browser, by, element } from 'protractor';
import { BackToOfficePage } from '../helper/backToOfficePage/backToOfficePage';
import { DashboardPage } from '../helper/dashboardPage/dashboardPage';
import { JournalPage } from '../helper/Journal/jounralPage';
import { JournalPageObjects } from '../helper/Journal/jounralPage.po';
import { LandingPage } from '../helper/landingPage/landingPage';
import { LoginPage } from '../helper/LoginPage/loginPage';
import { getToSignInPopUp, getUsernameField } from '../helper/LoginPage/loginPage.po';
import { PageHelper } from '../helper/PageHelper/pageHelper';
import { PageHelperObject } from '../helper/PageHelper/pageHelper.po';
import { TestReportPage } from '../helper/testReportPage/testReportPage';
import { TestReportPageObject } from '../helper/testReportPage/testReportPage.po';
import { DashboardPageObject } from '../helper/dashboardPage/dashboardPage.po';
import { TEST_CONFIG } from '../test.config';

const loginPage: LoginPage = new LoginPage();
const landingPage: LandingPage = new LandingPage();
const dashboardPage: DashboardPage = new DashboardPage();
const journalPage: JournalPage = new JournalPage();
const testReportPage: TestReportPage = new TestReportPage();
const backToOfficePage: BackToOfficePage = new BackToOfficePage();
const pageHelper: PageHelper = new PageHelper();
new PageHelperObject();
const journalPageElement: JournalPageObjects = new JournalPageObjects();
const dashboardPageElement: DashboardPageObject = new DashboardPageObject();
const testReportPageElement: TestReportPageObject = new TestReportPageObject();

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

Before({ tags: '@cata' }, () => {
  this.testCategory = 'a-mod1';
});

Before({ tags: '@catm2' }, () => {
  this.testCategory = 'a-mod2';
});

Before({ tags: '@catd' }, () => {
  this.testCategory = 'd';
});

Before({ tags: '@catHome' }, () => {
  this.testCategory = 'home-test';
});

Before({ tags: '@catADI2' }, () => {
  this.testCategory = 'adi-part2';
});

Before({ tags: '@catcpc' }, () => {
  this.testCategory = 'cpc';
});

// We need this much timeout for the login process to complete
setDefaultTimeout(TEST_CONFIG.DEFAULT_TIMEOUT);

// Turn off syncronisation with Angular
browser.ignoreSynchronization = true;

let screenshotAlways = false;
browser.getProcessedConfig().then((config) => {
  screenshotAlways = config.screenshotAlways;
});

Given('I am not logged in', async () => {

  // Wait for app to be ready
  browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  browser.waitForAngular();

  // Log out if we are logged in
  await loginPage.logout();

  const webviewContext = browser.driver.getCurrentContext();
  // Switch to NATIVE context
  browser.driver.selectContext('NATIVE_APP').then(async () => {
    // Wait until we are on the login page before proceeding
    await getToSignInPopUp;

    // Switch back to WEBVIEW context
    await browser.driver.selectContext(loginPage.getParentContext(await webviewContext));
  });
});

Given('I am logged in as {string} and I have a test for {string}', async (username, candidateName) => {
  // Go to journal page as the user
  // Load the landing page
  await landingPage.onLandingPageAsAsync(username);
  // Navigate to journal page
  await dashboardPage.clickGoToMyJournalButton();
  // Once the journal is loaded and ready check to see if we have a Start test button for the candidate else reset state
  // @ts-ignore
  await journalPageElement.getRefreshButton();
  const buttonElement = await journalPageElement.getStartTestButtonFor(candidateName, false);
  const hasStartTest = await journalPageElement.hasStartTestButtonFor(candidateName);

  if (!hasStartTest) {
    await pageHelper.waitForOverlay('click-block-active');
    await journalPage.clickBackButton();
    // Logout
    await loginPage.logout();
    // Login
    await loginPage.login(username);
    // Refresh application
    await landingPage.loadApplication();

    await landingPage.waitForActionToInitiate();

    // I should first hit the landing page
    // LandingPage.getEmployeeId(username);
    await landingPage.isCurrentPage(username);

    // Navigate to journal page
    await dashboardPage.clickGoToMyJournalButton();

    // If the journal page is loaded we should have a refresh button
    const refreshButton = await journalPageElement.getRefreshButton;
    return expect(refreshButton.isPresent()).to.eventually.be.true;
  }

  return expect(buttonElement.isPresent()).to.eventually.be.true;
});

When('I launch the mobile app', () => {
  // Application is already launched by framework
});

Then('I should see the Microsoft login page', async () => {
  // To be able to fill in the Authenticator login we need to switch to NATIVE context then switch back to WEBVIEW after
  const webviewContext = await browser.driver.getCurrentContext();

  // Switch to NATIVE context
  browser.driver.selectContext('NATIVE_APP').then(async () => {
    // Check for Microsoft login username field
    const usernameFld = getUsernameField;
    expect(await usernameFld.isPresent()).to.eventually.be.true;

    // Switch back to WEBVIEW context
    await browser.driver.selectContext(pageHelper.getParentContext(webviewContext));
  });

});

Given('I am on the landing page as {string}', async (username) => {
  await landingPage.onLandingPageAsAsync(username);
});

When(/^I start marking a practice test (with|without) a driving fault$/, async (drivingFault) => {
  await dashboardPage.clickPracticeMarkingATestCatB();
  await dashboardPage.clickStartWithOrWithoutADrivingFault(drivingFault);
});

Given(/^I start full practice mode$/, async () => {
  await dashboardPage.clickStartFullPracticeMode();

  const practiceModeBanner = testReportPageElement.practiceModeBanner;
  return expect(practiceModeBanner.isPresent()).to.eventually.be.true;
});

When('I log in to the application as {string}', async (username) => {
  await loginPage.login(username);

  // If the dashboard has loaded we should see the employee id
  // todo: kc seems we should also see employee id if landing page is loaded (see ln 107) which is right?
  const employeeId = dashboardPageElement.getEmployeeId(username);
  return expect(employeeId.isPresent()).to.eventually.be.true;
});

Then('I should see the {string} page', async (pageTitle) => {
  await pageHelper.getPageTitle(pageTitle);
  // Check that it is the last page title i.e. the displayed one
  return expect(await pageHelper.getDisplayedPageTitle().getText(), `Expected displayedPageTitle to equal ${pageTitle}`)
    .to.eventually.equal(pageTitle);
});

Given('I am on the {string} page', async (pageTitle) => {
  await pageHelper.getPageTitle(pageTitle);

  // Check that it is the last page title i.e. the displayed one
  return expect(await pageHelper.getDisplayedPageTitle().getText(), `Expected displayedPageTitle to equal ${pageTitle}`)
    .to.eventually.equal(pageTitle);
});

Then('I should see the {string} contains {string}', async (rowName, rowValue) => {
  await journalPage.rowContains(rowName, rowValue);
});

When('I click on the {string} button', async (buttonId) => {
  await pageHelper.getElementByCssId(buttonId).click();
});

Then('validation item {string} should be visible', async (validationId: string) => {
  const validationElement = await pageHelper.getElementByCssId(validationId);
  return expect(validationElement.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('validation item {string} should not be visible', async (validationId: string) => {
  const validationElement = await pageHelper.getElementByCssId(validationId);
  return expect(validationElement.getAttribute('class')).to.eventually.not.contain('ng-invalid');
});

Then('validation item {string} should not exist', (validationId: string) => {
  element.all(by.id(validationId)).then((elements) => {
    expect(elements.length).to.equal(0);
  });
});

Then('validation item {string} should be {string}', async (validationId: string, validationText: string) => {
  const validationElement = await pageHelper.getElementByCssId(validationId);
  return expect(validationElement.getText()).to.eventually.equal(validationText);
});

When('I terminate the test', async () => {
  if (this.testCategory !== 'cpc') {
    await testReportPage.clickLastEndTestButton();
  }
  await testReportPage.waitForTerminateButton();
  await testReportPage.clickTerminateTestButton();
  if (this.testCategory !== 'cpc') {
    await pageHelper.enterPasscode();
  }
});

When('I terminate the test in practice mode', async () => {
  await testReportPage.clickLastEndTestButton();
  await testReportPage.clickTerminateTestButton();
});

When('I exit practice mode', async () => {
  await testReportPage.clickLastExitPracticeButton();
});

Then(/^the (communication page|waiting room|debrief|health declaration) candidate name should be "(.+)"$/, async (
  pageName: string, candidateName: string) => {
  const candidateNameElement = await pageHelper.getCandidateNameElement(pageName, this.testCategory);
  return expect(candidateNameElement.getText()).to.eventually.equal(candidateName);
});

// tslint:disable-next-line:max-line-length
Then(/^the (communication page|waiting room|debrief|health declaration) candidate driver number should be "(.+)"$/, async (
  pageName: string, driverNumber: string) => {
  const candidateDriverNumberElement = await pageHelper.getCandidateDriveNumberElement(pageName, this.testCategory);
  return expect(candidateDriverNumberElement.getText()).to.eventually.equal(driverNumber);
});

Then('I return to the Journal Page', async () => {
  await backToOfficePage.clickBackToJournalButton();
});

When('I click the back button', async () => {
  await journalPage.clickBackButton();
});

When('I click go to my Journal', async () => {
  await dashboardPage.clickGoToMyJournalButton();
});

When(/^I wait "([^"]*)" seconds?$/, { timeout: 2 * 5000 }, async (seconds) => {
  await browser.sleep(seconds * 1000);
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
