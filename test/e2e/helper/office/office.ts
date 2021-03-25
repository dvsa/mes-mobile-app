import Page from '../../utilities/page';
import { OfficePageObject } from './office.po';

export class OfficePage extends Page {
  officePageElement: OfficePageObject = new OfficePageObject();

  async clickUploadButton() {
    await this.clickElement(this.officePageElement.uploadButton);
  }

  async clickUploadConfirmationButton() {
    await this.clickElement(this.officePageElement.uploadConfirmationButton);
  }

  async clickContinueButton(testCategory) {
    await this.clickElement(this.officePageElement.ContinueButton(testCategory));
  }

  async uploadTest() {
    await this.clickUploadButton();
    await this.clickUploadConfirmationButton();
  }

  async clickiPadIssue() {
    await this.clickElement(this.officePageElement.iPadIssue);
  }

  async clickCircuit(value) {
    if (value === 'left') {
      await this.clickElement(this.officePageElement.circuitLeft);
    } else {
      await this.clickElement(this.officePageElement.circuitRight);
    }
  }

  async clickiPadIssueTechnicalFault() {
    await this.clickElement(this.officePageElement.iPadIssueTechnicalFault);
  }

  async clickUploadRekeyedTestButton() {
    await this.clickElement(this.officePageElement.uploadRekeyedTestButton);
  }

  async clickUploadRekeyedTestConfirmationButton() {
    await this.clickElement(this.officePageElement.uploadRekeyedTestConfirmationButton);
  }

  async completeRekey(testCategory) {
    await this.clickContinueButton(testCategory);
    await this.clickiPadIssue();
    await this.clickiPadIssueTechnicalFault();
    await this.clickUploadRekeyedTestButton();
    await this.clickUploadRekeyedTestConfirmationButton();
  }

  async enterCandidateDescription() {
    const physicalDescriptionField = this.officePageElement.physicalDescription;
    await physicalDescriptionField.sendKeys('Tall, slim build with dark brown hair.');
  }

  async enterRouteNumber(routeNumber) {
    const routeField = this.officePageElement.routeField;
    await routeField.sendKeys(routeNumber);
  }

  async clickWeatherSelector() {
    await this.clickElement(this.officePageElement.weatherSelector);
  }

  async clickWeatherItemBrightWetRoads() {
    await this.clickElement(this.officePageElement.weatherItemBrightWetRoads);
  }

  async clickWeatherItemShowers() {
    await this.clickElement(this.officePageElement.weatherItemShowers);
  }

  async clickSubmit() {
    await this.clickElement(this.officePageElement.submit);
  }

  async enterWeatherConditions() {
    await this.clickWeatherSelector();
    await this.clickWeatherItemBrightWetRoads();
    await this.clickWeatherItemShowers();
    await this.clickSubmit();
  }

  async clickShowMeSelector() {
    await this.clickElement(this.officePageElement.showMeSelector);
  }

  async clickShowMeItem(value: string) {
    await this.clickElement(this.officePageElement.ShowMeItem(value));
  }

  async enterShowMe(value: string) {
    await this.clickShowMeSelector();
    await this.clickShowMeItem(value);
    await this.clickSubmit();
  }

  async selectShowMeQuestion(index: string, value: string) {
    await this.clickElement(this.officePageElement.ShowMeQuestion(index));
    await this.clickShowMeItem(value);
    await this.clickSubmit();
  }

  async enterIndependentDriving(type: string) {
    await this.clickElement(this.officePageElement.enterIndependentDriving(type));
  }

  async enterTestConductedOn(type: string) {
    await this.clickElement(this.officePageElement.enterTestConductedOn(type));
  }

  async clickReturnToJournalButton() {
    await this.clickElement(this.officePageElement.ReturnToJournalButton);
  }

  async clickSaveAndContinueLater() {
    await this.clickElement(this.officePageElement.saveAndContinueLater);
  }

  async enterAssessmentReport() {
    const assessmentReport = this.officePageElement.getAssessmentReport;
    await assessmentReport.sendKeys('Tall, slim build with dark brown hair.');
  }

}
