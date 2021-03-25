import Page from '../../utilities/page';
import { WaitingRoomPageObject } from './waitingRoom.po';

export class WaitingRoomPage extends Page {
  waitingRoomElement: WaitingRoomPageObject = new WaitingRoomPageObject();

  async clickNewEmailRadioButton() {
    await this.clickElement(this.waitingRoomElement.clickNewEmailRadioButton);
  }

  async enterNewEmail(email) {
    const newEmailAddressField = this.waitingRoomElement.getNewEmailInput;
    await newEmailAddressField.sendKeys(email);
  }

  async clickPostalAddressRadioButton() {
    await this.clickElement('postalAddress');
  }

  async candidateConfirmsDeclaration(testCategory) {
    const pageType = `waiting-room-cat-${testCategory}-page`;
    await this.clickCandidateConfirmation(pageType);
  }

  async candidateConfirmsCommunicationPreference(testCategory) {
    const pageType = `communication-cat-${testCategory}-page`;
    await this.clickCandidateConfirmation(pageType);
  }

  async checkInsuranceDeclaration() {
    await this.clickElement(this.waitingRoomElement.checkInsuranceDeclaration);
  }

  async checkResidencyDeclaration() {
    await this.clickElement(this.waitingRoomElement.checkResidencyDeclaration);
  }

  async clickSignaturePad() {
    await this.clickElement(this.waitingRoomElement.clickSignaturePad);
  }

  async clickContinueButton(testCategory) {
    await this.clickElement(this.waitingRoomElement.clickContinueButton);
  }

  private async clickCandidateConfirmation(pageType) {
    await this.clickElement(this.waitingRoomElement.clickCandidateConfirmation);
  }

}
