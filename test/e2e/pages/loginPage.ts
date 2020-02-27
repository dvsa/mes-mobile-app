import { browser, ExpectedConditions, element, by } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import Page from './page'

class LoginPage extends Page {
 /**
 * Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
 * @param user the user
 */
login(user : string) {
    this.logInToApplication(TEST_CONFIG.users[user].username, TEST_CONFIG.users[user].password);
}

 /**
 * Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
 * @param username the username
 * @param password the password
 */
logInToApplication(username : string, password : string) {
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
        browser.driver.selectContext(this.getParentContext(webviewContext));

        // Wait for dashboard page to load
        const employeeId = element(by.xpath('//span[@class="employee-id"]'));
        browser.wait(ExpectedConditions.presenceOf(employeeId));
      });
    });
  };

/**
 * Logs out of the application and takes them to the login page if they were logged in else returns current page
 */
//todo: should this method really be here?  If not here then where?
logout() {
    browser.driver.getCurrentContext().then((webviewContext) => {
      browser.driver.selectContext(this.getParentContext(webviewContext));
      browser.wait(ExpectedConditions.presenceOf(element(by.xpath('//ion-app'))));
      browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
      const logout = element(by.xpath('//button/span/span[contains(text(), "Sign Out")]'));
      logout.isPresent().then((result) => {
        if (result) {
          browser.wait(ExpectedConditions.elementToBeClickable(logout));
          logout.click().then(() => {
            // After logout click sign in to get us to the login screen
            browser.sleep(TEST_CONFIG.ACTION_WAIT);
            browser.driver.selectContext(this.getParentContext(webviewContext));
            browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
            const signIn = element(by.xpath('//span[contains(text(), "Sign in")]'));
            this.clickElement(signIn);
          });
        } else {
          return Promise.resolve();
        }
      });
    });
  };
}

export default new LoginPage();
