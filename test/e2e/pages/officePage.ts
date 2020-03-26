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
    return this.getElementByClassName('modal-alert-header');
  }

  completeRekey(testCategory) {
    this.clickContinueButton(testCategory);
    this.clickiPadIssue();
    this.clickiPadIssueTechnicalFault();
    this.clickUploadRekeyedTestButton();
    this.clickUploadRekeyedTestConfirmationButton();
  }

  getPhysicalDescription() {
    return this.getElementById('physical-description');
  }

  enterCandidateDescription() {
    const physicalDescriptionField = this.getPhysicalDescription();
    physicalDescriptionField.sendKeys('Tall, slim build with dark brown hair.');
  }

  getRouteField() {
    return this.getElementById('route');
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

  getDriverFault(faultCount, faultTest) {
    return this.getElementByXPath(`//ion-row[@id = 'driving-fault-commentary-label']
  [descendant::span[@class='count' and text() = '${faultCount}'] and descendant::label[@class='fault-label'
  and text() = '${faultTest}']]`);
  }

  getTestOutcomeField() {
    return this.getElementByXPath('//div[@id="test-outcome-text"]/span', false);
  }

  getTellMeQuestionField() {
    return this.getElementById('tell-me-question-text');
  }

  getCommentsValidationText(faultSeverity, faultLabel) {
    return this.getElementByXPath(`//fault-comment-card[@faulttype='${faultSeverity}'
  and //label[@class = 'fault-label' and text() = '${faultLabel}']]//div[@class='validation-text ng-invalid']`, false);
  }

  getCommentsField(faultSeverity, faultLabel) {
    return this.getElementByXPath(`//fault-comment-card[@faulttype='${faultSeverity}']
  //ion-row[ion-col/label[text() = '${faultLabel}']]//textarea`, false);
  }

  getActivityCodeField(testCategory) {
    return this.getElementByXPath(`//div[contains(@class, "office-cat-${testCategory}-page")]`
      + `//ion-select[@id = "activity-code-selector"]/div[@class = "select-text"]`, false);
  }
}

export default new OfficePage();
