import { browser, by, element, ExpectedConditions } from 'protractor';
import { Page } from '../../utilities/page';
import { TEST_CONFIG } from '../../utilities/test.config';
import { getUsernameField, LoginPageObject } from './loginPage.po';

export class LoginPage extends Page {
  loginpageElement: LoginPageObject = new LoginPageObject();

  /**
   * Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
   * @param user the user
   */
  async login(user: string) {
    await this.logInToApplication(TEST_CONFIG.users[user].username, TEST_CONFIG.users[user].password);
  }

  /**
   * Logs into the application with the given username and password. Assumes we will be on the Microsoft login page.
   * @param username the username
   * @param password the password
   */
  async logInToApplication(username: string, password: string) {

    // tslint:disable-next-line:max-line-length
    // To be able to fill in the Authenticator login we need to switch to NATIVE context then switch back to WEBVIEW after
    const webviewContext = await browser.driver.getCurrentContext();
    // Switch to NATIVE context
    await browser.driver.selectContext('NATIVE_APP');
    await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.microsoftOnlineContinue));
    await this.loginpageElement.microsoftOnlineContinue.click();
    // tslint:disable-next-line:max-line-length
    const useAnotherAccountButton = element(by.xpath(`//XCUIElementTypeButton[@name="Use another account, Use another account"]`));
    await browser.wait(ExpectedConditions.presenceOf(useAnotherAccountButton), TEST_CONFIG.Element_Wait);
    await useAnotherAccountButton.click();

    // Fill in username and click Next
    await browser.wait(ExpectedConditions.presenceOf(getUsernameField));
    await getUsernameField.sendKeys(username);
    await this.loginpageElement.nextButtonElement.click();
    await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.passwordForOrgAccount));
    await this.loginpageElement.passwordForOrgAccount.sendKeys(password);
    await this.loginpageElement.signinForOrgAccount.click();
    await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.authCContinue), TEST_CONFIG.Element_Wait);
    try {
      if (this.loginpageElement.authCContinue.isPresent()) {
        await this.loginpageElement.authCContinue.click();
      }
    } catch {

    }
    // Switch back to WEBVIEW context
    await browser.driver.selectContext(this.getParentContext(webviewContext));

    // Wait for dashboard page to load
    await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.employeeId));
  }

  async clickOnContinue() {
    const webviewContext = await browser.driver.getCurrentContext();
    await browser.driver.selectContext('NATIVE_APP');
    // Wait until we are on the login page before proceeding
    await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.microsoftOnlineContinue));
    await this.loginpageElement.microsoftOnlineContinue.click();
    // Switch back to WEBVIEW context
    await browser.driver.selectContext(this.getParentContext(webviewContext));

  }

  /**
   * Logs out of the application and takes them to the login page if they were logged in else returns current page
   */
  // todo: kc should this method really be here?  If not here then where?
  async logout() {
    const webviewContext = await browser.driver.getCurrentContext();
    await browser.driver.selectContext(this.getParentContext(webviewContext));
    await browser.wait(ExpectedConditions.presenceOf(element(by.xpath('//ion-app'))));
    await browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
    try {
      if (await this.loginpageElement.logout.isPresent()) {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.loginpageElement.logout));
        await this.loginpageElement.logout.click();
        try {
          await browser.sleep(TEST_CONFIG.ACTION_WAIT);
          await this.loginpageElement.logoutPopup.click();
          // After logout click sign in to get us to the login screen
          await browser.sleep(TEST_CONFIG.ACTION_WAIT);
        } catch {
        }

        await browser.driver.selectContext('NATIVE_APP');
        // Wait until we are on the login page before proceeding
        await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.microsoftOnlineContinue));
        await this.loginpageElement.microsoftOnlineContinue.click();
        await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.selectUserToSignOut));
        await this.loginpageElement.selectUserToSignOut.click();

        await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.cancelButton));
        await this.loginpageElement.cancelButton.click();
        await browser.wait(ExpectedConditions.presenceOf(this.loginpageElement.signInLink));
        await this.loginpageElement.signInLink.click();
        // Switch back to WEBVIEW context
        await browser.driver.selectContext(this.getParentContext(webviewContext));
      }
    } catch {

    }
  }
}
