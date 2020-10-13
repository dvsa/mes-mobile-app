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

  getPassCodeField() {
    return this.getElementByXPath('//XCUIElementTypeSecureTextField[@label="Passcode field"]');
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
    return;
  }
}

export default new PageHelper();
