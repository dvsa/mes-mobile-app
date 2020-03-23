import Page from './page';
import { TEST_CONFIG } from '../test.config';

class DashboardPage extends Page {
  // todo: kc both pages (dashboard and landing) seem to look for employee id to check the page is loaded.  This
  // sounds wrong - how do we tell if a user is on landing or dashboard page?  Are these the same thing?
  isCurrentPage(username) {
    this.getEmployeeId(username);
  }

  getEmployeeId(username) {
    const selector = `//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  clickGoToMyJournalButton () {
    this.clickElementByXPath('//go-to-journal-card/button');
  }

  clickPracticeMarkingATestCatB() {
    this.clickElementByXPath('//button/span/h3[text() = "Practice marking a test (cat B)"]');
  }

  clickStartWithOrWithoutADrivingFault(withDrivingFault) {
    this.clickElementByXPath(`//button/span/h3[text() = "Start ${withDrivingFault} a driving fault"]`);
  }

  clickStartFullPracticeMode() {
    this.clickElementByXPath('//button/span/h3[text() = "Practice marking a full test (cat B)"]');
  }
}

export default new DashboardPage();
