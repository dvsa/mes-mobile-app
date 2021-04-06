import { Page } from '../../utilities/page';
import {NonPassFinalisationPageObject} from './nonPassFinalisationPage.po';

export class NonPassFinalisationPage extends Page {

  nonPassFinalisationPageElement: NonPassFinalisationPageObject = new NonPassFinalisationPageObject()

  async selectActivityCode(activityCodeDesc) {
    await this.clickActivityCodeSelector();
    await this.clickActivityItem(activityCodeDesc);
    await this.submitDialog();
  }

  async clickActivityCodeSelector() {
    await this.clickElement(this.nonPassFinalisationPageElement.activityCodeSelector);
  }

  async clickActivityItem(activityCodeDesc) {
    await this.clickElement(this.nonPassFinalisationPageElement.ActivityItem(activityCodeDesc));
  }

  async submitDialog() {
    await this.clickElement(this.nonPassFinalisationPageElement.submitDialog);
  }

  async selectAutomaticTransmission() {
    await this.clickElement(this.nonPassFinalisationPageElement.automaticTransmission);
  }

  async selectManualTransmission() {
    await this.clickElement(this.nonPassFinalisationPageElement.manualTransmission);
  }

  // todo: kc also on debriefPage.
  async clickD255Yes() {
    await this.clickElement(this.nonPassFinalisationPageElement.d255Yes);
  }

  async clickContinueToBackOfficeButton(testCategory) {
    await this.clickElement(this.nonPassFinalisationPageElement.ContinueToBackOfficeButton(testCategory));
  }
}
