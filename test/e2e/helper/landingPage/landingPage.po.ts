import { TEST_CONFIG } from '../../utilities/test.config';
import { Page } from '../../utilities/page';

export class LandingPageObject extends Page {

  appElement =
    this.getElementByXPath('//ion-app');

  getEmployeeId(username: string) {
    // tslint:disable-next-line:max-line-length
    return this.getElementByXPath(`//span[@class="employee-id" and text()="${TEST_CONFIG.users[username].employeeId}"]`);
  }
  getStaffNumberField(staffNumber: string) {
    return this.getElementByXPath(`//span[@class="employee-id" and text()="${staffNumber}"]`);
  }

}
