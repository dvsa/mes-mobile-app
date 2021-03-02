import { Page } from '../../utilities/page';
import { browser, by, element, ExpectedConditions } from 'protractor';
import { TEST_CONFIG } from '../../utilities/test.config';
import { LandingPageObject } from './landingPage.po';
import { LoginPage } from '../LoginPage/loginPage';

export class LandingPage extends Page {

  landingPageElement: LandingPageObject = new LandingPageObject();
  loginPage: LoginPage = new LoginPage();
  // todo: kc both pages (dashboard and landing) seem to look for employee id to check the page is loaded.  This
  // sounds wrong - how do we tell if a user is on landing or dashboard page?  Are these the same thing?
  isCurrentPage(username: string) {
    this.landingPageElement.getEmployeeId(username);
  }

  /**
   * Checks whether the user is logged in.
   * @param username of the user we wish to be logged in
   */
  async isLoggedInAs(username: string) {
    const expectedStaffNumber = TEST_CONFIG.users[username].employeeId;
    await browser.wait(ExpectedConditions.presenceOf(element(by.xpath('//ion-app'))));
    const staffNumberField = element(by.xpath(`//span[@class="employee-id" and text()="${expectedStaffNumber}"]`));
    return staffNumberField.isPresent();
  }

  // todo: kc on journalPage there is a method onJournalPageAs.
  // would be good to have a polymorphic method name here for both methods.
  async onLandingPageAsAsync(username: string) {
    await this.loadApplication();
    await this.waitForActionToInitiate();

    const isLoggedInAs = await this.isLoggedInAs(username);
    if (!isLoggedInAs) {
      await this.loginPage.logout();
      await this.loginPage.login(username);

      // Refresh application
      await this.loadApplication();
      await this.waitForActionToInitiate();
    }

    // I should first hit the landing page
    // tslint:disable-next-line:max-line-length
    const employeeId = element(by.xpath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`));
    await browser.wait(ExpectedConditions.presenceOf(employeeId));
  }

  /**
   * Load application.
   * Goes to the home page which will be the journal for logged in Examiners.
   * This essentially reloads the application.
   */
  async loadApplication() {
    const promise = browser.get('ionic://localhost');
    return await this.isReady(promise);
  }
}
