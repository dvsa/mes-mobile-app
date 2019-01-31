import { browser, ExpectedConditions, element, by } from 'protractor';
import { TEST_CONFIG } from '../test.config';

const {
  Given,
  Then,
  When,
  setDefaultTimeout,
  After
} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// We need this much timeout for the login process to complete
setDefaultTimeout(30 * 1000);

Given('I am not logged in', () => {
  return logout();
});

When('I launch the mobile app', () => {
  // Application is already launched by framework
});

Then('I should see the Microsoft login page', () => {
  // To be able to fill in the Authenticator login we need to switch to NATIVE context but then switch back to WEBVIEW after
  browser.driver.getCurrentContext().then((webviewContext) => {

    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP');

    // Disable angular mode
    browser.ignoreSynchronization = true;

    // Because we have disabled syncronisation we are manually having to put waits between actions
    browser.driver.sleep(2000);

    // Check for Microsoft login username field
    const usernameElement = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
    expect(usernameElement.isPresent()).to.eventually.be.true;

    // Enable angular mode
    browser.ignoreSynchronization = false;

    browser.driver.sleep(2000);

    // Switch back to WEBVIEW context
    browser.driver.selectContext(webviewContext);
  });
});

When('I log in to the application as {string}', (username) => {
  return logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
});

Then('I should see the {string} page', (pageTitle) => {
  return expect(element.all(by.className('toolbar-title')).last().getText()).to.eventually.equal(pageTitle);
});

Given('I am on the journal page as {string}', (username) => {
  // If we are not already logged in do so now and then load the application
  loggedIn().then((response) => {
    if (!response) {
      logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
    }
  });

  return loadApplication();
});

When('I view candidate details for {string}', (candidateName) => {
  const buttonElement = element(by.xpath(`//h3[text() = "${candidateName}"]`));
  return clickElement(buttonElement);
});

When('I start the test for {string}', (candidateName) => {
  const buttonElement = element(by.xpath(`//button/span[text()[normalize-space(.) = "Start test"]][ancestor::ion-row/ion-col/candidate-link/div/ion-grid/ion-row/ion-col/h3[text() = "${candidateName}"]]`));
  return clickElement(buttonElement);
});

// After hook to take screenshots of page
After(function (testCase) {
  return browser.driver.takeScreenshot().then((screenShot) => {
    // screenShot is a base-64 encoded PNG
    this.attach(screenShot, 'image/png');
  });
});


//////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////

// Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
function logInToApplication(username, password) {
  // To be able to fill in the Authenticator login we need to switch to NATIVE context but then switch back to WEBVIEW after
  browser.driver.getCurrentContext().then((webviewContext) => {
    // Switch to NATIVE context
    browser.driver.selectContext('NATIVE_APP');

    // Disable angular mode
    browser.ignoreSynchronization = true;

    // Because we have disabled syncronisation we are manually having to put waits between actions
    browser.driver.sleep(2000);

    // Fill in username and click Next
    const usernameElement = element(by.xpath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]'));
    usernameElement.sendKeys(username);
    const nextButtonElement = element(by.xpath('//XCUIElementTypeButton[@label="Next"]'));
    nextButtonElement.click();
    browser.driver.sleep(2000);

    // Fill in password and click Sign in
    const passwordElement = element(by.xpath(`//XCUIElementTypeSecureTextField[@label="Enter the password for ${username}"]`));
    passwordElement.sendKeys(password);
    const signInButtonElement = element(by.xpath('//XCUIElementTypeButton[@label="Sign in"]'));
    signInButtonElement.click();

    // Enable angular mode
    browser.ignoreSynchronization = false;

    browser.driver.sleep(2000);

    // Switch back to WEBVIEW context
    browser.driver.selectContext(webviewContext);
  });
}

// Checks whether the user is logged in. This will need updating as it only checks for the existance of the logout button.
function loggedIn() {
  browser.driver.sleep(3000);
  const logout = element(by.xpath('//button/span[contains(text(), "Logout")]'));
  return logout.isPresent();
}

// Logs out of the application and takes them to the login page if they were logged in else returns (which should be the login page)
function logout() {
    browser.sleep(500);
    const logout = element(by.xpath('//button/span[contains(text(), "Logout")]'));
    logout.isPresent().then((result) => {
      if ( result ) {
        logout.click().then (() => {
          // After logout click sign in to get us to the login screen
          const signIn = element(by.xpath('//span[contains(text(), "Sign in")]'));
          return signIn.click();
        });
      } else {
        return Promise.resolve();
      }
    });

}

// A framework safe click method
function clickElement(fieldElement) {
  fieldElement.click().then((promise) => {
    return isReady(promise);
  });
}

// Goes to the home page which will be the journal for logged in Examiners
function loadApplication() {
  browser.get('').then((promise) => {
    browser.sleep(500);
    return isReady(promise);
  });
}

// Ionic adds an overlay preventing clicking until the page is ready so we need to wait for that to disappear
function isReady(promise) {
  // There is a 200ms transition duration we have to account for
  browser.sleep(250);
  // Then wait for the page to become active again
  browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
  // Then return the original promise
  return promise;
}