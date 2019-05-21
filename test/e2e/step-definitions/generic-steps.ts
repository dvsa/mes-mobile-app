import { browser, ExpectedConditions, element, by , Key } from 'protractor';
import { TEST_CONFIG } from '../test.config';

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

// We need this much timeout for the login process to complete
setDefaultTimeout(TEST_CONFIG.DEFAULT_TIMEOUT);

// Turn off syncronisation with Angular
browser.ignoreSynchronization = true;

Given('I am not logged in', () => {
  // Log out if we are logged in
  logout();

  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP');

    // Wait until we are on the login page before proceeding
    const usernameField = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
    browser.wait(ExpectedConditions.presenceOf(usernameField));

    // Switch back to WEBVIEW context
    browser.driver.selectContext(webviewContext);
  });
});

Given('I reset the application state for {string}', (username) => {
  // Go to journal page
  loadApplication();
  // Logout
  logout();
  // Login
  logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
  // Refresh application
  loadApplication();
});

When('I launch the mobile app', () => {
  // Application is already launched by framework
});

Then('I should see the Microsoft login page', () => {
  // To be able to fill in the Authenticator login we need to switch to NATIVE context then switch back to WEBVIEW after
  browser.driver.getCurrentContext().then((webviewContext) => {

    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP');

    // Check for Microsoft login username field
    const usernameField = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
    expect(usernameField.isPresent()).to.eventually.be.true;

    // Switch back to WEBVIEW context
    browser.driver.selectContext(webviewContext);
  });
});

When('I log in to the application as {string}', (username) => {
  logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);

  // If the journal page is loaded we should have a refresh button
  const refreshButton = element(by.xpath('//button/span/span/span[text() = "Refresh"]'));
  browser.wait(ExpectedConditions.presenceOf(refreshButton));
  return expect(refreshButton.isPresent()).to.eventually.be.true;
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
    browser.driver.selectContext('NATIVE_APP');

    // Fill in username and click Next
    const usernameField = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
    browser.wait(ExpectedConditions.presenceOf(usernameField));
    usernameField.sendKeys(username);
    const nextButtonElement = element(by.xpath('//XCUIElementTypeButton[@label="Next"]'));
    nextButtonElement.click();

    // Fill in password and click Sign in
    const passFld = element(by.xpath(`//XCUIElementTypeSecureTextField[@label="Enter the password for ${username}"]`));
    browser.wait(ExpectedConditions.presenceOf(passFld));
    passFld.sendKeys(password);
    const signInButtonElement = element(by.xpath('//XCUIElementTypeButton[@label="Sign in"]'));
    signInButtonElement.click();
    browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);

    // Switch back to WEBVIEW context
    browser.driver.selectContext(webviewContext);
  });
};

/**
 * Checks whether the user is logged in.
 * @param staffNumber the staff number of the user we wish to be logged in
 */
export const loggedInAs = (staffNumber) => {
  browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  const logout = element(by.xpath(`//input[@id="employeeId"][@value="${staffNumber}"]`));
  return logout.isPresent();
};

/**
 * Logs out of the application and takes them to the login page if they were logged in else returns current page
 */
export const logout = () => {
  browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
  const logout = element(by.xpath('//button/span/span[contains(text(), "Logout")]'));
  logout.isPresent().then((result) => {
    if (result) {
      logout.click().then(() => {
        // After logout click sign in to get us to the login screen
        browser.sleep(TEST_CONFIG.ACTION_WAIT);
        browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
        const signIn = element(by.xpath('//span[contains(text(), "Sign in")]'));
        clickElement(signIn);
      });
    } else {
      return Promise.resolve();
    }
  });
};

/**
 * A framework safe click method.
 * @param fieldElement the element to click
 */
export const clickElement = (fieldElement) => {
  browser.wait(ExpectedConditions.presenceOf(fieldElement));
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
  browser.wait(ExpectedConditions.presenceOf(element(elementBy)));
  return element(elementBy);
};

/**
 * Enters a generic password into the iOS passcode field.
 * Note: This will not work on the physical device but the simulator will accept any code.
 */
export const enterPasscode = () => {
  // To be able to fill in the passcode we need to switch to NATIVE context then switch back to WEBVIEW after
  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP');

    // Get the passcode field
    const passcodeField = element(by.xpath('//XCUIElementTypeSecureTextField[@label="Passcode field"]'));
    browser.wait(ExpectedConditions.presenceOf(passcodeField));

    // Set focus on the field
    passcodeField.click();

    // Send the fake passcode using native browser actions
    browser.actions().sendKeys('PASSWORD').sendKeys(Key.ENTER).perform();

    // Switch back to WEBVIEW context
    browser.driver.selectContext(webviewContext);

    browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  });
};

/**
 * Alternative way to enter text where the field element does not allow direct text entry.
 * Works by setting focus on the field and then sending browser actions rather than element actions.
 * @param field the field to enter the text into
 * @param text  the text you wish to enter into the field
 */
export const enterTextIndirect = (field, text) => {
  // Wait for field to be present
  browser.wait(ExpectedConditions.presenceOf(field));
  // Set focus on the field
  field.click();
  // Enter the text using browser actions rather than field send keys
  browser.actions().sendKeys(text).perform();
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
