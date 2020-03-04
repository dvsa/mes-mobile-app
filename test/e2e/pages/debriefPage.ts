import Page from './page';

class DebriefPage extends Page {
  clickEndDebriefButton() {
    this.clickElementByXPath('//button[span[h3[text()="End debrief"]]]');
  }

  clickEndDebriefButtonWelsh() {
    this.clickElementByXPath('//button[span[h3[text()="Diwedd ôl-drafodaeth"]]]');
  }

  completePassdetails() {
    this.textFieldInputViaNativeMode('//XCUIElementTypeOther[XCUIElementTypeOther[@name="Pass certificate number"]]/'
    + 'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', 'A123456X');
    this.clickProvisionalLicenceReceived();
    this.clickD255Yes();
    this.clickDebriefWitnessedYes();
  }

  selectTransmission (transmissionType: string) {
    this.clickElementById(`transmission-${transmissionType}`);
  }

  continuePassFinalisation(testCategory: string) {
    this.clickContinueToPassFinalisationButton(testCategory);
  }

  clickProvisionalLicenceReceived() {
    this.clickElementById('license-received');
  }

  getD255Yes() {
    return this.getElementById('d255-yes');
  }

  clickD255Yes() {
    this.clickElement(this.getD255Yes());
  }

  clickD255No() {
    this.clickElementById('d255-no');
  }

  clickDebriefWitnessedYes() {
    this.clickElementById('debrief-witnessed-yes');
  }

  clickContinueToPassFinalisationButton(testCategory: string) {
    const xpath =
      `//div[contains(@class, "pass-finalisation-cat-${testCategory}-page")]//button[span[h3[text() = "Continue"]]]`;
    this.clickElementByXPath(xpath);
  }

  clickContinueToNonPassFinalisationButton(testCategory: string) {
    const xpath =
      `//div[contains(@class, "non-pass-finalisation-cat-${testCategory}-page")]//button[@id = "continue-button"]`;
    this.clickElementByXPath(xpath);
  }

  // todo: kc there seem to be 2 continue buttons....why?  Are they on different pages?
  // todo: is it different ways of calling the same button?
  clickContinueButton2() {
    this.clickElementById('continue-button');
  }

  clickCode78NotReceived() {
    this.clickElementById('code-78-not-received');
  }

  clickCode78Received() {
    this.clickElementById('code-78-received');
  }

  getApplicationRefField() {
    return this.getElementByXPath('//ion-row[@id="application-reference-card"]/ion-col/span');
  }

  getFaultElement(faultSeverity: string, faultDescription:string) {
    return this.getElementByXPath(`//ion-card[@id = '${faultSeverity}-fault']
      //div[text() = '${faultDescription}']`);
  }

  getTestOutcome(testCategory) {
    const xpath =
      `//div[contains(@class, "debrief-cat-${testCategory}-page")]//div[@id = "test-outcome-background"]/div/h1`;
    return this.getElementByXPath(xpath);
  }
}

export default new DebriefPage();
