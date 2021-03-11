import { Page } from '../../utilities/page';
import { debriefPageObject } from './debriefPage.po';

export class DebriefPage extends Page {

  debriefPageElement: debriefPageObject = new debriefPageObject();

  async clickEndDebriefButton() {
    await this.clickElement(this.debriefPageElement.endDebriefButton);
  }

  async clickEndDebriefButtonWelsh() {
    await this.clickElement(this.debriefPageElement.endDebriefButtonWelsh);
  }

  async completePassdetails(testCategory) {
    if (testCategory === 'adi-part2') {
      await this.clickDebriefWitnessedYes();
      await this.clickLanguageYes();
    } else {
      if (testCategory === 'a-mod1') {
        // tslint:disable-next-line:max-line-length
        await this.textFieldInputViaNativeMode('//XCUIElementTypeOther[XCUIElementTypeOther[@name="Pass certificate number"]]/'
          + 'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', 'A123456');
      } else {
        // tslint:disable-next-line:max-line-length
        await this.textFieldInputViaNativeMode('//XCUIElementTypeOther[XCUIElementTypeOther[@name="Pass certificate number"]]/'
          + 'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', 'A123456X');
        if (testCategory !== 'cpc') {
          await this.clickProvisionalLicenceReceived();
        }
      }
      if (testCategory !== 'cpc') {
        await this.clickD255Yes();
      }
      await this.clickDebriefWitnessedYes();
    }
  }

  async selectTransmission(transmissionType: string) {
    await this.clickElement(this.debriefPageElement.selectTransmission(transmissionType));
  }

  async continuePassFinalisation(testCategory: string) {
    await this.clickContinueToPassFinalisationButton(testCategory);
  }

  async clickProvisionalLicenceReceived() {
    await this.clickElement(this.debriefPageElement.provisionalLicenceReceived);
  }
  // todo: kc also on nonPassFinalisationPage
  async clickD255Yes() {
    await this.clickElement(this.debriefPageElement.d255Yes);
  }

  async clickD255No() {
    await this.clickElement(this.debriefPageElement.d255No);
  }

  async clickDebriefWitnessedYes() {
    await this.clickElement(this.debriefPageElement.debriefWitnessedYes);
  }

  async clickLanguageYes() {
    await this.clickElement(this.debriefPageElement.languageYes);
  }

  async clickContinueToPassFinalisationButton(testCategory: string) {
    await this.clickElement(this.debriefPageElement.ContinueToNonPassFinalisationButton(testCategory));
  }

  async clickContinueToNonPassFinalisationButton(testCategory: string) {
    await this.clickElement(this.debriefPageElement.ContinueToNonPassFinalisationButton(testCategory));
  }

  // todo: kc there seem to be 2 continue buttons....why?  Are they on different pages?
  // todo: is it different ways of calling the same button?
  async clickContinueButton2() {
    await this.clickElement(this.debriefPageElement.continueButton2);
  }

  async clickCode78NotReceived() {
    await this.clickElement(this.debriefPageElement.code78NotReceived);
  }

  async clickCode78Received() {
    await this.clickElement(this.debriefPageElement.code78Received);
  }
}
