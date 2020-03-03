import { Before } from 'cucumber';
import { browser, ExpectedConditions, element, by , Key } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import { waitForOverlay } from '../../helpers/helpers';
import LoginPage from '../pages/loginPage';
import TempPage from '../pages/tempPage';

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
      const usernameFld = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
      browser.wait(ExpectedConditions.presenceOf(usernameFld));

      // Switch back to WEBVIEW context
      browser.driver.selectContext(TempPage.getParentContext(webviewContext));
    });
  });
});

Given('I am logged in as {string} and I have a test for {string}', (username, candidateName) => {
  // Go to journal page as the user
  onJournalPageAs(username);

  // Once the journal is loaded and ready check to see if we have a Start test button for the candidate else reset state
  const refreshButton = element(by.xpath('//button/span/span/span[text() = "Refresh"]'));
  browser.wait(ExpectedConditions.presenceOf(refreshButton));

  const buttonElement = element(by.xpath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`));

  buttonElement.isPresent().then((isStartPresent) => {
    if (!isStartPresent) {
      // Go back to dashboard
      waitForOverlay('click-block-active');
      clickBackButton();
      // Logout
      LoginPage.logout();
      // Login
      LoginPage.login(username);
      // Refresh application
      loadApplication().then(() => {
      // Small wait to make sure the action has initiated
        browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
      });

      // I should first hit the landing page
      const employeeId = element(
        by.xpath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`));
      browser.wait(ExpectedConditions.presenceOf(employeeId));

      // Navigate to journal page
      const goToJournalButton = TempPage.getElementByXPath('//go-to-journal-card/button');
      TempPage.clickElement(goToJournalButton);

      // If the journal page is loaded we should have a refresh button
      const refreshButton = element(by.xpath('//button/span/span/span[text() = "Refresh"]'));
      browser.wait(ExpectedConditions.presenceOf(refreshButton));
      return expect(refreshButton.isPresent()).to.eventually.be.true;
    }
  });
  return expect(buttonElement.isPresent()).to.eventually.be.true;
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
      const usernameFld = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
      expect(usernameFld.isPresent()).to.eventually.be.true;

      // Switch back to WEBVIEW context
      browser.driver.selectContext(TempPage.getParentContext(webviewContext));
    });
  });
});

Given('I am on the landing page as {string}', (username) => {
  onLandingPageAs(username);
});

When(/^I start marking a practice test (with|without) a driving fault$/, (drivingFault) => {
  const practiceMarkingXPath = '//button/span/h3[text() = "Practice marking a test (cat B)"]';
  TempPage.clickElementByXPath(practiceMarkingXPath);

  const withDriverFaultXPath = `//button/span/h3[text() = "Start ${drivingFault} a driving fault"]`;
  TempPage.clickElementByXPath(withDriverFaultXPath);
});

Given(/^I start full practice mode$/, () => {
  const practiceMarkingXPath = '//button/span/h3[text() = "Practice marking a test (cat B)"]';
  TempPage.clickElementByXPath(practiceMarkingXPath);

  const practiceModeBanner = element(by.className('practice-mode-top-banner'));
  browser.wait(ExpectedConditions.presenceOf(practiceModeBanner));
  return expect(practiceModeBanner.isPresent()).to.eventually.be.true;
});

When('I log in to the application as {string}', (username) => {
  LoginPage.login(username);

  // If the dashboard has loaded we should see the employee id
  const employeeId = element(
    by.xpath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`));
  browser.wait(ExpectedConditions.presenceOf(employeeId));
  return expect(employeeId.isPresent()).to.eventually.be.true;
});

Then('I should see the {string} page', (pageTitle) => {
  // Wait for the page title to exist
  TempPage.getPageTitle(pageTitle);
  // Check that it is the last page title i.e. the displayed one
  return expect(element.all(by.className('toolbar-title')).last().getText()).to.eventually.equal(pageTitle);
});

Then('I should see the {string} contains {string}', (rowName, rowValue) => {
  const dataRow = TempPage.getElementByXPath(`//ion-col/label[text()= "${rowName}"]
    [parent::ion-col/parent::ion-row//*[normalize-space(text()) = "${rowValue}"]]`);
  return expect(dataRow.isPresent()).to.eventually.be.true;
});

When('I click on the {string} button', (buttonId) => {
  const buttonElement = TempPage.getElement(by.css(`#${buttonId}`));
  return TempPage.clickElement(buttonElement);
});

Then('validation item {string} should be visible', (validationId: string) => {
  const validationElement = TempPage.getElement(by.css(`#${validationId}`));
  return expect(validationElement.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('validation item {string} should not be visible', (validationId: string) => {
  const validationElement = TempPage.getElement(by.css(`#${validationId}`));
  return expect(validationElement.getAttribute('class')).to.eventually.not.contain('ng-invalid');
});

Then('validation item {string} should not exist', (validationId: string) => {
  element.all(by.id(validationId)).then((elements) => {
    expect(elements.length).to.equal(0);
  });
});

Then('validation item {string} should be {string}', (validationId: string, validationText: string) => {
  const validationElement = TempPage.getElement(by.css(`#${validationId}`));
  return expect(validationElement.getText()).to.eventually.equal(validationText);
});

When('I terminate the test', () => {
  const lastEndTestButton = element.all(by.xpath('//end-test-link/button/span[text() = "End test"]')).last();
  TempPage.clickElement(lastEndTestButton);

  const terminateTestButton = TempPage.getElementByXPath('//button/span[text() = "Terminate test"]');
  TempPage.clickElement(terminateTestButton);

  enterPasscode();
});

When('I exit practice mode', () => {
  const lastExitPracticeButton = element.all(by.className('exit-text')).last();
  TempPage.clickElement(lastExitPracticeButton);
});

Then(/^the (communication page|waiting room|debrief|health declaration) candidate name should be \"(.+)\"$/, (
  pageName: string, candidateName: string) => {
  const candidateNameElement = TempPage.getElementByXPath(`//div[contains(@class, '${getPageType(pageName)}')]//h2[@id = 'candidate-name']`);
  return expect(candidateNameElement.getText()).to.eventually.equal(candidateName);
});

Then(/^the (communication page|waiting room|debrief|health declaration) candidate driver number should be \"(.+)\"$/, (
  pageName: string, driverNumber: string) => {
  const candidateDriverNumberElement = TempPage.getElementByXPath(`//div[contains(@class, '${getPageType(pageName)}')]//h3[@id = 'candidate-driver-number']`);
  return expect(candidateDriverNumberElement.getText()).to.eventually.equal(driverNumber);
});

Then('I return to the Journal Page', () => {
  const returnToJournalBtn = TempPage.getElementByXPath('//*[@id="back-to-office-page"]//div[3]/button/span');
  TempPage.clickElement(returnToJournalBtn);
});

When('I click the back button', () => {
  clickBackButton();
});

When('I click go to my Journal', () => {
  clickGoToMyJournalButton();
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
 * Checks whether the user is logged in.
 * @param staffNumber the staff number of the user we wish to be logged in
 */
export const loggedInAs = (staffNumber) => {
  browser.wait(ExpectedConditions.presenceOf(element(by.xpath('//ion-app'))));
  const staffNumberField = element(by.xpath(`//span[@class="employee-id" and text()="${staffNumber}"]`));
  return staffNumberField.isPresent();
};

/**
 * Load application.
 * Goes to the home page which will be the journal for logged in Examiners.
 * This essentially reloads the application.
 */
export const loadApplication = () => {
  const promise = browser.get('ionic://localhost');
  return TempPage.isReady(promise);
};

/**
 * Enters a generic password into the iOS passcode field.
 * Note: This will not work on the physical device but the simulator will accept any code.
 */
export const enterPasscode = () => {
  // To be able to fill in the passcode we need to switch to NATIVE context then switch back to WEBVIEW after
  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      // Get the passcode field
      const passcodeField = element(by.xpath('//XCUIElementTypeSecureTextField[@label="Passcode field"]'));
      browser.wait(ExpectedConditions.presenceOf(passcodeField));

      // Send the fake passcode using native browser actions
      browser.actions().sendKeys('PASSWORD').sendKeys(Key.ENTER).perform();

      // Switch back to WEBVIEW context
      browser.driver.selectContext(TempPage.getParentContext(webviewContext)).then(() => {
        browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
      });
    });
  });
};

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

const onLandingPageAs = (username) => {
  loadApplication().then(() => {
    // Small wait to make sure the action has initiated
    browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
  });

  loggedInAs(TEST_CONFIG.users[username].employeeId).then((response) => {
    if (!response) {
        // If not logged in as the right user logout and log in as the correct user
      LoginPage.logout();
      LoginPage.login(username);

      // Refresh application
      loadApplication().then(() => {
      // Small wait to make sure the action has initiated
        browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
      });
    }
  });

  // I should first hit the landing page
  const employeeId = element(
    by.xpath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`));
  browser.wait(ExpectedConditions.presenceOf(employeeId));
};

export const onJournalPageAs = (username) => {
  // Load the landing page
  onLandingPageAs(username);

  // Navigate to journal page
  clickGoToMyJournalButton();

  // If the journal page is loaded we should have a refresh button
  const refreshButton = element(by.xpath('//button/span/span/span[text() = "Refresh"]'));
  browser.wait(ExpectedConditions.presenceOf(refreshButton));
};

const getPageType = (pageName : string) => {
  switch (pageName) {
    case 'communication page':
      return `communication-cat-${this.testCategory}-page`;
    case 'debrief':
      return `pass-finalisation-cat-${this.testCategory}-page`;
    case 'health declaration':
      return `health-declaration-cat-${this.testCategory}-page`;
    default:
      return `waiting-room-cat-${this.testCategory}-page`;
  }
};

const clickBackButton = () => {
  const backButton = TempPage.getElementByXPath('//page-journal//button//span[text()="Back"]');
  TempPage.clickElement(backButton);
};

const clickGoToMyJournalButton = () => {
  const goToJournalButton = TempPage.getElementByXPath('//go-to-journal-card/button');
  TempPage.clickElement(goToJournalButton);
};
