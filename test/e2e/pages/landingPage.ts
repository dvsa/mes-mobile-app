import { browser, by, element, ExpectedConditions } from 'protractor';
import { TEST_CONFIG } from '../test.config';
import Page from './page';
import LoginPage from './loginPage';

class LandingPage extends Page {
  // todo: kc both pages (dashboard and landing) seem to look for employee id to check the page is loaded.  This
  // sounds wrong - how do we tell if a user is on landing or dashboard page?  Are these the same thing?
  isCurrentPage(username) {
    this.getEmployeeId(username);
  }

  getEmployeeId(username) {
    return this.getElementByXPath(
      `//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`);
  }

  // todo: kc this should be called something better.
  getAppElement() {
    return this.getElementByXPath('//ion-app');
  }

  getStaffNumberField() {
    return this.getElementByXPath(`//span[@class="employee-id"]`);
  }

  /**
   * Checks whether the user is logged in.
   * @param username of the user we wish to be logged in
   */
  isLoggedInAs(username) {
    const expectedStaffNumber = TEST_CONFIG.users[username].employeeId;
    this.getAppElement();
    let result;
    this.getStaffNumberField().getText().then((actualStaffNumber) => {
      result = actualStaffNumber === expectedStaffNumber;
      return result;
    });

    return Promise.resolve(false);
  }

  // todo: kc on journalPage there is a method onJournalPageAs.
  // would be good to have a polymorphic method name here for both methods.
  onLandingPageAs(username) {
    this.loadApplication().then(() => {
      this.waitForActionToInitiate();
    });

    this.isLoggedInAs(username).then((response) => {
      if (!response) {
        // If not logged in as the right user logout and log in as the correct user
        LoginPage.logout();
        LoginPage.login(username);

        // Refresh application
        this.loadApplication().then(() => {
          this.waitForActionToInitiate();
        });
      }
    });

    // I should first hit the landing page
    const employeeId = element(
      by.xpath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`));
    browser.wait(ExpectedConditions.presenceOf(employeeId));
  }

  /**
   * Load application.
   * Goes to the home page which will be the journal for logged in Examiners.
   * This essentially reloads the application.
   */
  loadApplication() {
    const promise = browser.get('ionic://localhost');
    return this.isReady(promise);
  }
}

export default new LandingPage();
