import Page from './page';

class NonPassFinalisationPage extends Page {
  selectActivityCode(activityCodeDesc) {
    this.clickActivityCodeSelector();
    this.clickActivityItem(activityCodeDesc);
    this.submitDialog();
  }

  // 2 getTestOutcomes - one is in debriefPage.ts.
  getTestOutcome() {
    const element = this.getElementById('office-page-test-outcome');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getActivityCodeSelector() {
    const element = this.getElementById('activity-code-selector');
    this.waitForPresenceOfElement(element);
    return element;
  }

  clickActivityCodeSelector() {
    this.clickElement(this.getActivityCodeSelector());
  }

  clickActivityItem(activityCodeDesc) {
    this.clickElementByXPath(`//button/span/div[@class='alert-radio-label']
  [normalize-space(text()) = '${activityCodeDesc}']`);
  }

  submitDialog() {
    this.clickElementByXPath('//button[span[text() = "Submit"]]');
  }

  selectAutomaticTransmission() {
    this.clickElementById('transmission-automatic');
  }

  selectManualTransmission() {
    this.clickElementById('transmission-manual');
  }
}

export default new NonPassFinalisationPage();
