import Page from '../../utilities/page';
import { TEST_CONFIG } from '../../test.config';

export class LandingPageObject extends Page {

  appElement =
    this.getElementByXPath('//ion-app');

  getEmployeeId(username: string) {
    return this.getElementByXPath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`);
  }

  getStaffNumberField(staffNumber: string) {
    return this.getElementByXPath(`//span[@class="employee-id" and text()="${staffNumber}"]`);
  }

}
