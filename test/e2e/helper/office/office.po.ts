import Page from '../../utilities/page';

export class OfficePageObject extends Page {

  uploadButton =
    this.getElementByXPath('//button[span[h3[text() = "Upload"]]]');

  uploadConfirmationButton =
    this.getElementByXPath('//ion-alert//button/span[text() = "Upload"]');
  circuitLeft =
    this.getElementById('circuit-left');
  circuitRight =
    this.getElementById('circuit-right');
  iPadIssue =
    this.getElementById('ipadIssueSelected');
  iPadIssueTechnicalFault =
    this.getElementById('ipadIssueTechnicalFault');
  uploadRekeyedTestButton =
    this.getElementByXPath('//button/span/h3[text() = "Upload rekeyed test"]');
  uploadRekeyedTestConfirmationButton =
    this.getElementByXPath('//button/span[text() = "Upload"]');
  uploadRekeyMessage =
    this.getElementByClassName('modal-alert-header');
  physicalDescription =
    this.getElementById('physical-description');
  routeField =
    this.getElementById('route');
  weatherSelector =
    this.getElementByXPath('//ion-select[@formcontrolname="weatherConditions"]');
  weatherItemBrightWetRoads =
    this.getElementByXPath('//button/span/div[normalize-space(text()) = "2 - Bright / wet roads"]');
  weatherItemShowers =
    this.getElementByXPath('//button/span/div[normalize-space(text()) = "4 - Showers"]');
  submit =
    this.getElementByXPath('//button[span[text() = "Submit"]]');
  showMeSelector =
    this.getElementById('show-me-selector');
  testOutcomeField =
    this.getElementByXPath('//div[@id="test-outcome-text"]/span');
  getTellMeQuestionField =
    this.getElementById('tell-me-question-text');
  saveAndContinueLater =
    this.getElementById('defer-button');
  getAssessmentReport =
    this.getElementById('assessment report');

  ContinueButton(testCategory) {
    return this.getElementByXPath(
      `//div[contains(@class, "office-cat-${testCategory}-page")]//button//h3[text()="Continue"]`);
  }

  ShowMeItem(value) {
    return this.getElementByXPath(`//button/span/div[normalize-space(text()) = '${value}']`);
  }

  ShowMeQuestion(index: string) {
    return this.getElementById('show-me-question-selector_1'.replace('1', index));
  }

  enterIndependentDriving(type: string) {
    return this.getElementById(`independent-driving-${type}`);
  }

  enterTestConductedOn(type: string) {
    return this.getElementById(`mode-of-transport-${type}`);
  }

  ReturnToJournalButton() {
    return this.getElementByXPath('//button/span/h3[text() = "Return to journal"]');
  }

  DriverFault(faultCount, faultTest) {
    return this.getElementByXPath(`//ion-row[@id = 'driving-fault-commentary-label']
  [descendant::span[@class='count' and text() = '${faultCount}'] and descendant::label[@class='fault-label'
  and text() = '${faultTest}']]`);
  }

  CommentsValidationText(faultSeverity, faultLabel) {
    return this.getElementByXPath(`//fault-comment-card[@faulttype='${faultSeverity}'
  and //label[@class = 'fault-label' and text() = '${faultLabel}']]//div[@class='validation-text ng-invalid']`);
  }

  CommentsField(faultSeverity, faultLabel) {
    return this.getElementByXPath(`//fault-comment-card[@faulttype='${faultSeverity}']
  //ion-row[ion-col/label[text() = '${faultLabel}']]//textarea`);
  }

  ActivityCodeField(testCategory) {
    return this.getElementByXPath(`//div[contains(@class, "office-cat-${testCategory}-page")]`
      + `//ion-select[@id = "activity-code-selector"]/div[@class = "select-text"]`);
  }

}
