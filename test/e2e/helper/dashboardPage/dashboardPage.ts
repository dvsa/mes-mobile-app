import Page from '../../utilities/page';
import {dashboardPageObject} from "./dashboardPage.po";

export class DashboardPage extends Page {
  dashboardPageElement: dashboardPageObject = new dashboardPageObject();
  // todo: kc both pages (dashboard and landing) seem to look for employee id to check the page is loaded.  This
  // sounds wrong - how do we tell if a user is on landing or dashboard page?  Are these the same thing?
  async isCurrentPage(username) {
    await this.dashboardPageElement.getEmployeeId(username);
  }

  async clickGoToMyJournalButton() {
    await this.clickElement(this.dashboardPageElement.clickGoToMyJournalButton);
  }

  async clickPracticeMarkingATestCatB() {
    await this.clickElement(this.dashboardPageElement.clickPracticeMarkingATestCatB);
  }

  async clickStartWithOrWithoutADrivingFault(withDrivingFault) {
    await this.clickElement(this.dashboardPageElement.clickStartWithOrWithoutADrivingFault(withDrivingFault));
  }

  async clickStartFullPracticeMode() {
    await this.clickElement(this.dashboardPageElement.clickStartFullPracticeMode);
  }
}
