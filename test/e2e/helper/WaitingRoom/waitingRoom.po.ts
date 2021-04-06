import { Page } from '../../utilities/page';

export class WaitingRoomPageObject extends Page {
  clickNewEmailRadioButton =
    this.getElementById('newEmail');

  getNewEmailInput =
    this.getElementById('newEmailInput');

  clickPostalAddressRadioButton =
    this.getElementById('postalAddress');

  checkInsuranceDeclaration =
    this.getElementById('insurance-declaration-checkbox');

  checkResidencyDeclaration =
    this.getElementById('residency-declaration-checkbox');

  clickSignaturePad =
    this.getElementByXPath('//signature-pad/canvas');

  getProvidedEmailRadioButton =
    this.getElementById('providedEmail');

  getProvidedEmailValue =
    this.getElementById('providedEmailInput');

  clickCandidateConfirmation(pageType) {
    return this.getElementByXPath(`//div[contains(@class, '${pageType}')]//button[@id = 'continue-button']`);
  }

  clickContinueButton(testCategory) {
    return this.getElementByXPath(`//div[contains(@class, "communication-cat-${testCategory}-page")]//button[@id = "continue-button"]`);
  }
}
