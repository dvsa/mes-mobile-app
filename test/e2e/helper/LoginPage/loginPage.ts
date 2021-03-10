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
    await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.microsoftOnlineContinue), TEST_CONFIG.Element_Wait);
    await this.loginpageElement.microsoftOnlineContinue.click();
    const useAnotherAccountButton = element(by.xpath(`//XCUIElementTypeButton[@name="Use another account, Use another account"]`));
    await browser.wait(ExpectedConditions.visibilityOf(useAnotherAccountButton), TEST_CONFIG.Element_Wait);
    await useAnotherAccountButton.click();

    // Fill in username and click Next

    await browser.wait(ExpectedConditions.visibilityOf(getUsernameField), TEST_CONFIG.Element_Wait);
    await getUsernameField.sendKeys(username);
    await this.loginpageElement.nextButtonElement.click();
    await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.passwordForOrgAccount), TEST_CONFIG.Element_Wait);
    await this.loginpageElement.passwordForOrgAccount.sendKeys(password);
    await this.loginpageElement.signinForOrgAccount.click();
    await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.authCContinue), TEST_CONFIG.Element_Wait);
    try {
      if (this.loginpageElement.authCContinue.isPresent()) {
        await this.loginpageElement.authCContinue.click();
      }
    } catch {

    }
    // Switch back to WEBVIEW context
    await browser.driver.selectContext(this.getParentContext(webviewContext));

    // Wait for dashboard page to load
    await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.employeeId), TEST_CONFIG.Element_Wait);
  }

  async clickOnContinue() {
    const webviewContext = await browser.driver.getCurrentContext();
    await browser.driver.selectContext('NATIVE_APP');
    // Wait until we are on the login page before proceeding
    await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.microsoftOnlineContinue), TEST_CONFIG.Element_Wait);
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
    await browser.wait(ExpectedConditions.visibilityOf(element(by.xpath('//ion-app'))), TEST_CONFIG.Element_Wait);
    await browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))), TEST_CONFIG.Element_Wait);
    try {
      if (await this.loginpageElement.logout.isPresent()) {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.loginpageElement.logout), TEST_CONFIG.Element_Wait);
        await this.loginpageElement.logout.click();
        try {
          await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.logoutPopup), TEST_CONFIG.Element_Wait);
          await this.loginpageElement.logoutPopup.click();
          // After logout click sign in to get us to the login screen
        } catch {
        }

        await browser.driver.selectContext('NATIVE_APP');
        // Wait until we are on the login page before proceeding
        await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.microsoftOnlineContinue), TEST_CONFIG.Element_Wait);
        await this.loginpageElement.microsoftOnlineContinue.click();
        try {
          if (this.loginpageElement.selectUserToSignOut.isVisible()) {
            await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.selectUserToSignOut), TEST_CONFIG.Element_Wait);
            await this.loginpageElement.selectUserToSignOut.click();
          }
        } catch {
        }
        await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.cancelButton), TEST_CONFIG.Element_Wait);
        await this.loginpageElement.cancelButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(this.loginpageElement.signInLink), TEST_CONFIG.Element_Wait);
        await this.loginpageElement.signInLink.click();
        // Switch back to WEBVIEW context
        await browser.driver.selectContext(this.getParentContext(webviewContext));
      }
    } catch {

    }
  }
}
