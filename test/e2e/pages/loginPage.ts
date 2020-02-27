import { browser, ExpectedConditions, element, by } from 'protractor';
import { getParentContext } from '../../helpers/helpers';
import { TEST_CONFIG } from '../test.config';

class LoginPage {
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
        browser.driver.selectContext(getParentContext(webviewContext));
  
        // Wait for dashboard page to load
        const employeeId = element(by.xpath('//span[@class="employee-id"]'));
        browser.wait(ExpectedConditions.presenceOf(employeeId));
      });
    });
  };
}

export default new LoginPage();