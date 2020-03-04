import Page from './page';

class NonPassFinalisationPage extends Page {
  selectActivityCode(activityCodeDesc) {
    this.clickActivityCodeSelector();
    this.clickActivityItem(activityCodeDesc);
    this.submitDialog();
  }

  getTestOutcome() {
    return this.getElementById('office-page-test-outcome');
  }

  getActivityCodeSelector() {
    return this.getElementById('activity-code-selector');
  }

  clickActivityCodeSelector() {
    this.clickElement(this.getActivityCodeSelector());
  }

  clickActivityItem(activityCodeDesc) {
    this.clickElementByXPath(`//button/span/div[@class='alert-radio-label']
  [normalize-space(text()) = '${activityCodeDesc}']`);
  }

  submitDialog() {
    this.getElementByXPath('//button[span[text() = "Submit"]]');
  }

  selectAutomaticTransmission() {
    this.clickElementById('transmission-automatic');
  }

  selectManualTransmission() {
    this.clickElementById('transmission-manual');
  }
}

export default new NonPassFinalisationPage();
