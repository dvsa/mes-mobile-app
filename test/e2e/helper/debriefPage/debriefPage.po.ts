import Page from '../../utilities/page';

export class debriefPageObject extends Page {

  endDebriefButton =
    this.getElementByXPath('//button[span[h3[text()="End debrief"]]]');

  endDebriefButtonWelsh =
    this.getElementByXPath('//button[span[h3[text()="Diwedd ôl-drafodaeth"]]]');

  provisionalLicenceReceived =
    this.getElementById('license-received');

  d255Yes =
    this.getElementById('d255-yes');

  d255No =
    this.getElementById('d255-no');

  debriefWitnessedYes =
    this.getElementById('debrief-witnessed-yes');

  languageYes =
    this.getElementById('lang-pref-english');

  continueButton2 =
    this.getElementById('continue-button');

  code78NotReceived =
    this.getElementById('code-78-not-received');

  code78Received =
    this.getElementById('code-78-received');

  applicationRefField =
    this.getElementByXPath('//ion-row[@id="application-reference-card"]/ion-col/span');

  ContinueToPassFinalisationButton(testCategory: string) {
    return this.getElementByXPath(`//div[contains(@class, "pass-finalisation-cat-${testCategory}-page")]//button[span[h3[text() = "Continue"]]]`);
  }

  ContinueToNonPassFinalisationButton(testCategory: string) {
    return this.getElementByXPath(`//div[contains(@class, "non-pass-finalisation-cat-${testCategory}-page")]//button[@id = "continue-button"]`);
  }

  selectTransmission(transmissionType: string) {
    return this.getElementById(`transmission-${transmissionType}`);
  }

  getFaultElement(faultSeverity: string, faultDescription: string) {
    return this.getElementByXPath(`//ion-card[@id = '${faultSeverity}-fault']//div[text() = '${faultDescription}']`);
  }

  getQuestionsElement(faultSeverity: string, faultDescription: string) {
    return this.getElementByXPath(`//ion-card[@id ='${faultSeverity}-questions']//div[text() = '${faultDescription}']`);
  }

  getVehicleCheckElement(faultDescription: string) {
    return this.getElementByXPath(`//ion-card[@id ='vehicle-checks']//span[text() = '${faultDescription}']`);
  }

  getTestOutcome(testCategory: string) {
    return this.getElementByXPath(`//div[contains(@class, "debrief-cat-${testCategory}-page")]//div[@id = "test-outcome-background"]/div/h1`);
  }
}
