import { browser, ExpectedConditions, element, by } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import Page from './page';

class LoginPage extends Page {
  isCurrentPage() {
    // wait for username field to appear
    this.getUsernameField();
  }
  /**
   * Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
   * @param user the user
   */
  login(user : string) {
    this.logInToApplication(TEST_CONFIG.users[user].username, TEST_CONFIG.users[user].password);
  }

  getUsernameField() {
    return this.getElementByXPath('//XCUIElementTypeTextField[@label="Enter your email, phone, or Skype."]');
  }

  getToSignInPopUp() {
    return this.getElementByXPath('//XCUIElementTypeButton[@name="Continue"]');
  }

  /**
   * Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
   * @param username the username
   * @param password the password
   */
  logInToApplication(username : string, password : string) {

    // tslint:disable-next-line:max-line-length
    // To be able to fill in the Authenticator login we need to switch to NATIVE context then switch back to WEBVIEW after
    browser.driver.getCurrentContext().then((webviewContext) => {
      // Switch to NATIVE context
      browser.driver.selectContext('NATIVE_APP').then(() => {
        const microsoftOnlineContinue = element(by.xpath(`//XCUIElementTypeButton[@name="Continue"]`));
        browser.wait(ExpectedConditions.presenceOf(microsoftOnlineContinue));
        microsoftOnlineContinue.click().then((result) => {
          return browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
        })
          .then((result) => {
            const useAnotherAccountButton = element(by.xpath(`//XCUIElementTypeOther[@name="Use another account, Use another account"]`));
            useAnotherAccountButton.isPresent().then((result) => {
              if (result) {
                return useAnotherAccountButton.click();
              }
              else {
                return ;
              }
            });

          })
          .then((result) => {
            // Fill in username and click Next
            const usernameFld = this.getUsernameField();
            browser.wait(ExpectedConditions.presenceOf(usernameFld));
            usernameFld.sendKeys(username);

            const nextButtonElement = element(by.xpath('(//XCUIElementTypeButton[@name="Next"])[1]'));
            nextButtonElement.click();

            const passwordForOrgAccount = element(by.xpath(`//XCUIElementTypeOther[@name="Sign In"]/XCUIElementTypeOther[4]/XCUIElementTypeSecureTextField`));
            browser.wait(ExpectedConditions.presenceOf(passwordForOrgAccount));
            passwordForOrgAccount.sendKeys(password);

            const signinForOrgAccount = element(by.xpath(`//XCUIElementTypeButton[@name="Sign in"]`));
            return signinForOrgAccount.click();
          })
          .then((result) => {
            return browser.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
          })
          .then((result) => {
            const authCContinue = element(by.xpath(`//XCUIElementTypeButton[@name="Continue"]`));
            return authCContinue.isPresent()
              .then((result) => {
                if (result) {
                  return authCContinue.click();
                }
                else {
                  const acceptButton =   element(by.xpath(`//XCUIElementTypeButton[@name="Accept"]`));
                  return acceptButton.click();
                }
              });
          });
        // Fill in password and click Sign in
        // const pFld = element(by.xpath(`//XCUIElementTypeSecureTextField[@label=
        // "Enter the password for ${username}"]`));
        // browser.wait(ExpectedConditions.presenceOf(pFld));
        // pFld.sendKeys(password);
        // const signInButtonElement = element(by.xpath('//XCUIElementTypeButton[@label="Sign in"]'));
        // signInButtonElement.click();

        // Switch back to WEBVIEW context
        browser.driver.selectContext(this.getParentContext(webviewContext));

        // Wait for dashboard page to load
        const employeeId = element(by.xpath('//span[@class="employee-id"]'));
        browser.wait(ExpectedConditions.presenceOf(employeeId));
      });
    });
  }

  clickOnContinue() {
    browser.driver.getCurrentContext().then((webviewContext) => {
      browser.driver.selectContext('NATIVE_APP').then(() => {
        // Wait until we are on the login page before proceeding
        const microsoftOnlineContinue = element(by.xpath(`//XCUIElementTypeButton[@name="Continue"]`));
        browser.wait(ExpectedConditions.presenceOf(microsoftOnlineContinue));
        microsoftOnlineContinue.click();

        // Switch back to WEBVIEW context
        browser.driver.selectContext(this.getParentContext(webviewContext));
      });
    });
  }
  /**
   * Logs out of the application and takes them to the login page if they were logged in else returns current page
   */
  // todo: kc should this method really be here?  If not here then where?
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

            browser.driver.selectContext('NATIVE_APP').then(() => {
              // Wait until we are on the login page before proceeding
              const microsoftOnlineContinue = element(by.xpath(`//XCUIElementTypeButton[@name="Continue"]`));
              browser.wait(ExpectedConditions.presenceOf(microsoftOnlineContinue));
              microsoftOnlineContinue.click();
              const selectUserToSignOut = element(by.xpath(`//XCUIElementTypeOther[@name="Sign out"]/XCUIElementTypeOther[4]`));
              browser.wait(ExpectedConditions.presenceOf(selectUserToSignOut));
              selectUserToSignOut.click();

              const cancelButton = element(by.xpath(`//XCUIElementTypeButton[@name="Cancel"]`));
              browser.wait(ExpectedConditions.presenceOf(cancelButton));
              cancelButton.click();

              const signInLink = element(by.xpath(`//XCUIElementTypeStaticText[@name="Sign in"]`));
              browser.wait(ExpectedConditions.presenceOf(signInLink));
              signInLink.click();
              // Switch back to WEBVIEW context
              browser.driver.selectContext(this.getParentContext(webviewContext));
            });
            //     browser.driver.selectContext(this.getParentContext(webviewContext));
            // browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
            // const signIn = element(by.xpath('//span[contains(text(), "Sign in")]'));
            // this.clickElement(signIn);
          });
        } else {
          return Promise.resolve();
        }
      });
    });
  }
}

export default new LoginPage();
