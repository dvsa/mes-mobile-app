import Page from '../../utilities/page';
import { TEST_CONFIG } from '../../test.config';

export class dashboardPageObject extends Page {

  clickGoToMyJournalButton =
    this.getElementByXPath('//go-to-journal-card/button');

  clickPracticeMarkingATestCatB =
    this.getElementByXPath('//button/span/h3[text() = "Practice marking a test (cat B)"]');

  clickStartFullPracticeMode =
    this.getElementByXPath('//button/span/h3[text() = "Practice marking a full test (cat B)"]');

  getEmployeeId(username) {
    return this.getElementByXPath(
      `//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`);
  }

  clickStartWithOrWithoutADrivingFault(withDrivingFault) {
    return this.getElementByXPath(`//button/span/h3[text() = "Start ${withDrivingFault} a driving fault"]`);
  }

}
