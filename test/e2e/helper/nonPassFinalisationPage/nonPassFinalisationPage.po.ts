import Page from '../../utilities/page';

export class NonPassFinalisationPageObject extends Page {

  testOutcome =
    this.getElementById('office-page-test-outcome');

  activityCodeSelector =
    this.getElementById('activity-code-selector');

  submitDialog =
    this.getElementByXPath('//button/span[contains(text(), "Submit")]');

  automaticTransmission =
    this.getElementById('transmission-automatic');

  manualTransmission =
    this.getElementById('transmission-manual');

  d255Yes =
    this.getElementById('d255-yes');

  ActivityItem(activityCodeDesc) {
    return this.getElementByXPath(`//button/span/div[@class='alert-radio-label']
    [normalize-space(text()) = '${activityCodeDesc}']`);
  }

  ContinueToBackOfficeButton(testCategory) {
    return this.getElementByXPath(
      `//div[contains(@class, "non-pass-finalisation-cat-${testCategory}-page")]//button[@id = "continue-button"]`);
  }
}
