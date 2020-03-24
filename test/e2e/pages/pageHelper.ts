import Page from './page';
import JournalPage from './journalPage';
import LoginPage from './loginPage';
import LandingPage from './landingPage';
import DashboardPage from './dashboardPage';
import { browser, Key } from 'protractor';
import { TEST_CONFIG } from '../test.config';

 /**
 * Temporary page to allow access to functions in Page base class
 */
class PageHelper extends Page {
  resetApp(username) {
     // Go back to dashboard
    this.waitForOverlay('click-block-active');
    JournalPage.clickBackButton();
     // Logout
    LoginPage.logout();
     // Login
    LoginPage.login(username);
     // Refresh application
    LandingPage.loadApplication().then(() => {
      LandingPage.waitForActionToInitiate();
    });

     // I should first hit the landing page
     // LandingPage.getEmployeeId(username);
    LandingPage.isCurrentPage(username);

     // Navigate to journal page
    DashboardPage.clickGoToMyJournalButton();
    JournalPage.isCurrentPage();
  }

  // is this to replace reset App?
   // export const resetTestDataState = (username) => {
   //   waitForOverlay('click-block-active');
   //   clickBackButton();
   //   logout();
   //   logInToApplication(TEST_CONFIG.users[username].username, TEST_CONFIG.users[username].password);
   //   loadApplication().then(() => {
   //     browser.driver.sleep(TEST_CONFIG.ACTION_WAIT);
   //   });
   // };

  getPassCodeField() {
    const selector = '//XCUIElementTypeSecureTextField[@label="Passcode field"]';
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

   /**
    * Send the fake passcode using native browser actions
    */
  sendFakePasscode() {
    browser.actions().sendKeys('PASSWORD').sendKeys(Key.ENTER).perform();
  }

   /**
    * Enters a generic password into the iOS passcode field.
    * Note: This will not work on the physical device but the simulator will accept any code.
    */
  enterPasscode() {
     // To be able to fill in the passcode we need to switch to NATIVE context then switch back to WEBVIEW after
    browser.driver.getCurrentContext().then((webviewContext) => {
       // Switch to NATIVE context
      browser.driver.selectContext('NATIVE_APP').then(() => {
         // Get the passcode field
        this.getPassCodeField();
        this.sendFakePasscode();

         // Switch back to WEBVIEW context
        browser.driver.selectContext(this.getParentContext(webviewContext)).then(() => {
          browser.driver.sleep(TEST_CONFIG.PAGE_LOAD_WAIT);
        });
      });
    });
  }
}

export default new PageHelper();
