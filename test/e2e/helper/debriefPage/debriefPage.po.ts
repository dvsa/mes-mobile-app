import { Page } from '../../utilities/page';

export class debriefPageObject extends Page {

  EndDebriefButton =
    this.getElementByXPath('//button[span[h3[text()="End debrief"]]]');

  EndDebriefButtonWelsh =
    this.getElementByXPath('//button[span[h3[text()="Diwedd ôl-drafodaeth"]]]');

  ProvisionalLicenceReceived =
    this.getElementById('license-received');

  D255Yes =
    this.getElementById('d255-yes');

  D255No =
    this.getElementById('d255-no');

  DebriefWitnessedYes =
    this.getElementById('debrief-witnessed-yes');

  LanguageYes =
    this.getElementById('lang-pref-english');

  ContinueButton2 =
    this.getElementById('continue-button');

  Code78NotReceived =
    this.getElementById('code-78-not-received');

  Code78Received =
    this.getElementById('code-78-received');

  ApplicationRefField =
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
