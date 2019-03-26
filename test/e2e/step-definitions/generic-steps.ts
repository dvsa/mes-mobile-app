import { browser, ExpectedConditions, element, by } from 'protractor';
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
  return logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
});

Then('I should see the {string} page', (pageTitle) => {
  browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
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


// After hook to take screenshots of page
After(function (testCase) {
  return browser.driver.takeScreenshot().then((screenShot) => {
    // screenShot is a base-64 encoded PNG
    this.attach(screenShot, 'image/png');
  });
});

//////////////////////////////////////////// SHARED FUNCTIONS ////////////////////////////////////////////

// Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
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

// Checks whether the user is logged in. This will need updating as it checks for the existance of the logout button.
export const loggedInAs = (staffNumber) => {
  browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  const logout = element(by.xpath(`//input[@id="employeeId"][@value="${staffNumber}"]`));
  return logout.isPresent();
};

// Logs out of the application and takes them to the login page if they were logged in else returns current page
export const logout = () => {
  browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
  browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
  const logout = element(by.xpath('//button/span/span[contains(text(), "Logout")]'));
  logout.isPresent().then((result) => {
    if (result) {
      logout.click().then(() => {
        // After logout click sign in to get us to the login screen
        const signIn = element(by.xpath('//span[contains(text(), "Sign in")]'));
        browser.wait(ExpectedConditions.presenceOf(signIn));
        signIn.click();
      });
    } else {
      return Promise.resolve();
    }
  });
};

// A framework safe click method
export const clickElement = (fieldElement) => {
  browser.wait(ExpectedConditions.presenceOf(fieldElement));
  fieldElement.click().then((promise) => {
    return isReady(promise);
  });
};

// Goes to the home page which will be the journal for logged in Examiners
export const loadApplication = () => {
  const promise = browser.get('ionic://localhost');
  return isReady(promise);
};

// Ionic adds an overlay preventing clicking until the page is ready so we need to wait for that to disappear
const isReady = (promise) => {
  // There is a 200ms transition duration we have to account for
  browser.sleep(TEST_CONFIG.ACTION_WAIT);
  // Then wait for the page to become active again
  browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
  // Then return the original promise
  return promise;
};

// Waits for the element to exist on the page before returning it.
export const getElement = (elementBy) => {
  browser.wait(ExpectedConditions.presenceOf(element(elementBy)));
  return element(elementBy);
};
