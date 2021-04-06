import { browser, Key } from 'protractor';
import { Page } from '../../utilities/page';
import { PageHelperObject } from './pageHelper.po';
import { LoginPage } from '../LoginPage/loginPage';
import { LandingPage } from '../landingPage/landingPage';
import { DashboardPage } from '../dashboardPage/dashboardPage';
import { JournalPage } from '../Journal/jounralPage';
import { TEST_CONFIG } from '../../test.config';

export class PageHelper extends Page {

  loginPage: LoginPage = new LoginPage();
  landingPage: LandingPage = new LandingPage();
  dashboardPage: DashboardPage = new DashboardPage();
  journalPage: JournalPage = new JournalPage();
  pageHelperElement: PageHelperObject = new PageHelperObject();

  async resetApp(username) {
    // Go back to dashboard
    await this.waitForOverlay('click-block-active');
    await this.journalPage.clickBackButton();
    // Logout
    await this.loginPage.logout();
    // Login
    await this.loginPage.login(username);
    // Refresh application
    await this.landingPage.loadApplication();
    await this.landingPage.waitForActionToInitiate();

    // I should first hit the landing page
    // LandingPage.getEmployeeId(username);
    await this.landingPage.isCurrentPage(username);

    // Navigate to journal page
    await this.dashboardPage.clickGoToMyJournalButton();
    await this.journalPage.isCurrentPage();
  }

  /**
   * Send the fake passcode using native browser actions
   */
  async sendFakePasscode() {
    await browser.actions().sendKeys('PASSWORD').sendKeys(Key.ENTER).perform();
  }

  /**
   * Enters a generic password into the iOS passcode field.
   * Note: This will not work on the physical device but the simulator will accept any code.
   */
  async enterPasscode() {
    // To be able to fill in the passcode we need to switch to NATIVE context then switch back to WEBVIEW after
    var webviewContext = await browser.driver.getCurrentContext();
    // Switch to NATIVE context
    await browser.driver.selectContext('NATIVE_APP');
    // Get the passcode field
    this.pageHelperElement.passCodeField;
    await this.sendFakePasscode();

    // Switch back to WEBVIEW context
    await browser.driver.selectContext(this.getParentContext(webviewContext));
    await browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);

  }
}
