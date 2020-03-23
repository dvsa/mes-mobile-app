import Page from './page';

class NonPassFinalisationPage extends Page {
  selectActivityCode(activityCodeDesc) {
    this.clickActivityCodeSelector();
    this.clickActivityItem(activityCodeDesc);
    this.submitDialog();
  }

  // 2 getTestOutcomes - one is in debriefPage.ts.
  getTestOutcome() {
    const selector = 'office-page-test-outcome';
    const element = this.getElementById(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getActivityCodeSelector() {
    const selector = 'activity-code-selector';
    const element = this.getElementById(selector);
    this.waitForPresenceOfElement(element, selector);
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

  // todo: kc also on debriefPage.
  getD255Yes() {
    const selector = 'd255-yes';
    const element = this.getElementById(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  // todo: kc also on debriefPage.
  clickD255Yes() {
    this.clickElement(this.getD255Yes());
  }

  clickContinueToBackOfficeButton(testCategory) {
    this.clickElementByXPath(
      `//div[contains(@class, "non-pass-finalisation-cat-${testCategory}-page")]//button[@id = "continue-button"]`);
  }
}

export default new NonPassFinalisationPage();
