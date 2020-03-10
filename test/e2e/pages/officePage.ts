import Page from './page';
class OfficePage extends Page {
  clickUploadButton() {
    this.clickElementByXPath('//button[span[h3[text() = "Upload"]]]');
  }

  clickUploadConfirmationButton() {
    this.clickElementByXPath('//ion-alert//button/span[text() = "Upload"]');
  }

  clickContinueButton(testCategory) {
    this.clickElementByXPath(
      `//div[contains(@class, "office-cat-${testCategory}-page")]//button//h3[text()="Continue"]`);
  }

  uploadTest() {
    this.clickUploadButton();
    this.clickUploadConfirmationButton();
  }

  clickiPadIssue() {
    this.clickElementById('ipadIssueSelected');
  }

  clickiPadIssueTechnicalFault() {
    this.clickElementById('ipadIssueTechnicalFault');
  }

  clickUploadRekeyedTestButton() {
    this.clickElementByXPath('//button/span/h3[text() = "Upload rekeyed test"]');
  }

  clickUploadRekeyedTestConfirmationButton() {
    this.clickElementByXPath('//button/span[text() = "Upload"]');
  }

  getUploadRekeyMessage() {
    const element = this.getElementByClassName('modal-alert-header');
    this.waitForPresenceOfElement(element);
    return element;
  }

  completeRekey(testCategory) {
    this.clickContinueButton(testCategory);
    this.clickiPadIssue();
    this.clickiPadIssueTechnicalFault();
    this.clickUploadRekeyedTestButton();
    this.clickUploadRekeyedTestConfirmationButton();
  }

  getPhysicalDescription() {
    const element = this.getElementById('physical-description');
    this.waitForPresenceOfElement(element);
    return element;
  }

  enterCandidateDescription() {
    const physicalDescriptionField = this.getPhysicalDescription();
    physicalDescriptionField.sendKeys('Tall, slim build with dark brown hair.');
  }

  getRouteField() {
    const element = this.getElementById('route');
    this.waitForPresenceOfElement(element);
    return element;
  }

  enterRouteNumber(routeNumber) {
    const routeField = this.getRouteField();
    routeField.sendKeys(routeNumber);
  }

  clickWeatherSelector() {
    this.clickElementByXPath('//ion-select[@formcontrolname="weatherConditions"]');
  }

  clickWeatherItemBrightWetRoads() {
    this.clickElementByXPath('//button/span/div[normalize-space(text()) = "2 - Bright / wet roads"]');
  }

  clickWeatherItemShowers() {
    this.clickElementByXPath('//button/span/div[normalize-space(text()) = "4 - Showers"]');
  }

  clickSubmit() {
    this.clickElementByXPath('//button[span[text() = "Submit"]]');
  }

  enterWeatherConditions() {
    this.clickWeatherSelector();
    this.clickWeatherItemBrightWetRoads();
    this.clickWeatherItemShowers();
    this.clickSubmit();
  }

  clickShowMeSelector() {
    this.clickElementById('show-me-selector');
  }

  clickShowMeItem(value) {
    this.clickElementByXPath(`//button/span/div[normalize-space(text()) = '${value}']`);
  }

  enterShowMe(value) {
    this.clickShowMeSelector();
    this.clickShowMeItem(value);
    this.clickSubmit();
  }

  enterIndependentDriving (type) {
    this.clickElementById(`independent-driving-${type}`);
  }

  clickReturnToJournalButton() {
    this.clickElementByXPath('//button/span/h3[text() = "Return to journal"]');
  }

}

export default new OfficePage();
