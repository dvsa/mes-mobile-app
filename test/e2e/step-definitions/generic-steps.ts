import { Before } from 'cucumber';
import { browser, ExpectedConditions, element, by , Key } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import { waitForOverlay } from '../../helpers/helpers'; 
import { getParentContext } from '../../helpers/helpers'; 

const {
  Given,
  Then,
  When,
  setDefaultTimeout,
  After,
} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// Set default category to be cat b
this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  // This hook will be executed before scenarios tagged with @catbe
  this.testCategory = 'be';
});

// We need this much timeout for the login process to complete
setDefaultTimeout(TEST_CONFIG.DEFAULT_TIMEOUT);

// Turn off syncronisation with Angular
browser.ignoreSynchronization = true;

Given('I am not logged in', () => {

  // Wait for app to be ready
  browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  browser.waitForAngular();

  // Log out if we are logged in
  logout();

  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      // Wait until we are on the login page before proceeding
      const usernameFld = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
      browser.wait(ExpectedConditions.presenceOf(usernameFld));

      // Switch back to WEBVIEW context
      browser.driver.selectContext(getParentContext(webviewContext));
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
      logout();
      // Login
      logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
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
      const goToJournalButton = getElement(by.xpath('//go-to-journal-card/button'));
      clickElement(goToJournalButton);

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
      browser.driver.selectContext(getParentContext(webviewContext));
    });
  });
});

Given('I am on the landing page as {string}', (username) => {
  onLandingPageAs(username);
});

When(/^I start marking a practice test (with|without) a driving fault$/, (drivingFault) => {
  const practiceMarking = getElement(by.xpath('//button/span/h3[text() = "Practice marking a test (cat B)"]'));
  clickElement(practiceMarking);

  const withDriverFault = getElement(by.xpath(`//button/span/h3[text() = "Start ${drivingFault} a driving fault"]`));
  clickElement(withDriverFault);
});

Given(/^I start full practice mode$/, () => {
  const practiceMarking = getElement(by.xpath('//button/span/h3[text() = "Practice marking a full test (cat B)"]'));
  clickElement(practiceMarking);

  const practiceModeBanner = element(by.className('practice-mode-top-banner'));
  browser.wait(ExpectedConditions.presenceOf(practiceModeBanner));
  return expect(practiceModeBanner.isPresent()).to.eventually.be.true;
});

When('I log in to the application as {string}', (username) => {
  logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);

  // If the dashboard has loaded we should see the employee id
  const employeeId = element(
    by.xpath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`));
  browser.wait(ExpectedConditions.presenceOf(employeeId));
  return expect(employeeId.isPresent()).to.eventually.be.true;
});

Then('I should see the {string} page', (pageTitle) => {
  // Wait for the page title to exist
  getElement(by.xpath(`//div[contains(@class, 'toolbar-title')][normalize-space(text()) = '${pageTitle}']`));
  // Check that it is the last page title i.e. the displayed one
  return expect(element.all(by.className('toolbar-title')).last().getText()).to.eventually.equal(pageTitle);
});

Then('I should see the {string} contains {string}', (rowName, rowValue) => {
  const dataRow = getElement(by.xpath(`//ion-col/label[text()= "${rowName}"]
    [parent::ion-col/parent::ion-row//*[normalize-space(text()) = "${rowValue}"]]`));
  return expect(dataRow.isPresent()).to.eventually.be.true;
});

When('I click on the {string} button', (buttonId) => {
  const buttonElement = getElement(by.css(`#${buttonId}`));
  return clickElement(buttonElement);
});

Then('validation item {string} should be visible', (validationId: string) => {
  const validationElement = getElement(by.css(`#${validationId}`));
  return expect(validationElement.getAttribute('class')).to.eventually.contain('ng-invalid');
});

Then('validation item {string} should not be visible', (validationId: string) => {
  const validationElement = getElement(by.css(`#${validationId}`));
  return expect(validationElement.getAttribute('class')).to.eventually.not.contain('ng-invalid');
});

Then('validation item {string} should be {string}', (validationId: string, validationText: string) => {
  const validationElement = getElement(by.css(`#${validationId}`));
  return expect(validationElement.getText()).to.eventually.equal(validationText);
});

When('I terminate the test', () => {
  const lastEndTestButton = element.all(by.xpath('//end-test-link/button/span[text() = "End test"]')).last();
  clickElement(lastEndTestButton);

  const terminateTestButton = getElement(by.xpath('//button/span[text() = "Terminate test"]'));
  clickElement(terminateTestButton);

  enterPasscode();
});

When('I exit practice mode', () => {
  const lastExitPracticeButton = element.all(by.className('exit-text')).last();
  clickElement(lastExitPracticeButton);
});

Then(/^the (communication page|waiting room|debrief|health declaration) candidate name should be \"(.+)\"$/, (
  pageName: string, candidateName: string) => {
  const candidateNameElement = getElement(
    by.xpath(`//div[contains(@class, '${getPageType(pageName)}')]//h2[@id = 'candidate-name']`));
  return expect(candidateNameElement.getText()).to.eventually.equal(candidateName);
});

Then(/^the (communication page|waiting room|debrief|health declaration) candidate driver number should be \"(.+)\"$/, (
  pageName: string, driverNumber: string) => {
  const candidateDriverNumberElement = getElement(
    by.xpath(`//div[contains(@class, '${getPageType(pageName)}')]//h3[@id = 'candidate-driver-number']`));
  return expect(candidateDriverNumberElement.getText()).to.eventually.equal(driverNumber);
});

Then('I return to the Journal Page', () => {
  const returnToJournalBtn = getElement(by.xpath('//*[@id="back-to-office-page"]//div[3]/button/span'));
  clickElement(returnToJournalBtn);
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
  return browser.driver.takeScreenshot().then((screenShot) => {
    // screenShot is a base-64 encoded PNG
    this.attach(screenShot, 'image/png');
  });
});

//////////////////////////////////////////// SHARED FUNCTIONS ////////////////////////////////////////////

/**
 * Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
 * @param username the username
 * @param password the password
 */
export const logInToApplication = (username, password) => {
  // To be able to fill in the Authenticator login we need to switch to NATIVE context then switch back to WEBVIEW after
  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP').then(() => {
      // Fill in username and click Next
      const usernameFld = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
      browser.wait(ExpectedConditions.presenceOf(usernameFld));
      usernameFld.sendKeys(username);
      const nextButtonElement = element(by.xpath('//XCUIElementTypeButton[@label="Next"]'));
      nextButtonElement.click();

      // Fill in password and click Sign in
      const pFld = element(by.xpath(`//XCUIElementTypeSecureTextField[@label="Enter the password for ${username}"]`));
      browser.wait(ExpectedConditions.presenceOf(pFld));
      pFld.sendKeys(password);
      const signInButtonElement = element(by.xpath('//XCUIElementTypeButton[@label="Sign in"]'));
      signInButtonElement.click();

      // Switch back to WEBVIEW context
      browser.driver.selectContext(getParentContext(webviewContext));

      // Wait for dashboard page to load
      const employeeId = element(by.xpath('//span[@class="employee-id"]'));
      browser.wait(ExpectedConditions.presenceOf(employeeId));
    });
  });
};

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
 * Logs out of the application and takes them to the login page if they were logged in else returns current page
 */
export const logout = () => {
  browser.driver.getCurrentContext().then((webviewContext) => {
    browser.driver.selectContext(getParentContext(webviewContext));
    browser.wait(ExpectedConditions.presenceOf(element(by.xpath('//ion-app'))));
    browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
    const logout = element(by.xpath('//button/span/span[contains(text(), "Sign Out")]'));
    logout.isPresent().then((result) => {
      if (result) {
        browser.wait(ExpectedConditions.elementToBeClickable(logout));
        logout.click().then(() => {
          // After logout click sign in to get us to the login screen
          browser.sleep(TEST_CONFIG.ACTION_WAIT);
          browser.driver.selectContext(getParentContext(webviewContext));
          browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
          const signIn = element(by.xpath('//span[contains(text(), "Sign in")]'));
          clickElement(signIn);
        });
      } else {
        return Promise.resolve();
      }
    });
  });
};

/**
 * A framework safe click method.
 * @param fieldElement the element to click
 */
export const clickElement = (fieldElement) => {
  browser.wait(ExpectedConditions.elementToBeClickable(fieldElement));
  fieldElement.click().then((promise) => {
    return isReady(promise);
  });
};

/**
 * Load application.
 * Goes to the home page which will be the journal for logged in Examiners.
 * This essentially reloads the application.
 */
export const loadApplication = () => {
  const promise = browser.get('ionic://localhost');
  return isReady(promise);
};

/**
 * Checks whether the page is ready to be interacted with.
 * Ionic adds an overlay preventing clicking until the page is ready so we need to wait for that to disappear.
 * @param promise the promise to return when the page is ready
 */
const isReady = (promise) => {
  // There is a 200ms transition duration we have to account for
  browser.sleep(TEST_CONFIG.ACTION_WAIT);
  // Then wait for the page to become active again
  browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
  // Then return the original promise
  return promise;
};

/**
 * Waits for the element to exist on the page before returning it.
 * @param elementBy the element finder
 */
export const getElement = (elementBy) => {
  const foundElement = element(elementBy);
  browser.wait(ExpectedConditions.presenceOf(foundElement));
  return foundElement;
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
      browser.driver.selectContext(getParentContext(webviewContext)).then(() => {
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
      logout();
      logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);

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
  const backButton = getElement(by.xpath('//page-journal//button//span[text()="Back"]'));
  clickElement(backButton);
};

const clickGoToMyJournalButton = () => {
  const goToJournalButton = getElement(by.xpath('//go-to-journal-card/button'));
  clickElement(goToJournalButton);
};
