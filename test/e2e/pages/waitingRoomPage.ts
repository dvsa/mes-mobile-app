import Page from './page';

class WaitingRoomPage extends Page {
  clickNewEmailRadioButton() {
    this.clickElementById('newEmail');
  }

  getNewEmailInput() {
    const element = this.getElementById('newEmailInput');
    this.waitForPresenceOfElement(element);
    return element;
  }

  enterNewEmail(email) {
    const newEmailAddressField = this.getNewEmailInput();
    newEmailAddressField.sendKeys(email);
  }

  clickPostalAddressRadioButton() {
    this.clickElementById('postalAddress');
  }

  candidateConfirmsDeclaration(testCategory) {
    const pageType = `waiting-room-cat-${testCategory}-page`;
    this.clickCandidateConfirmation(pageType);
  }

  candidateConfirmsCommunicationPreference(testCategory) {
    const pageType = `communication-cat-${testCategory}-page`;
    this.clickCandidateConfirmation(pageType);
  }

  private clickCandidateConfirmation(pageType) {
    this.clickElementByXPath(
      `//div[contains(@class, '${pageType}')]//button[@id = 'continue-button']`);
  }

  checkInsuranceDeclaration() {
    this.clickElementById('insurance-declaration-checkbox');
  }

  checkResidencyDeclaration() {
    this.clickElementById('residency-declaration-checkbox');
  }

  clickSignaturePad() {
    this.clickElementByXPath('//signature-pad/canvas');
  }

  clickContinueButton(testCategory) {
    this.clickElementByXPath(
      `//div[contains(@class, "communication-cat-${testCategory}-page")]//button[@id = "continue-button"]`);
  }

  getProvidedEmailRadioButton() {
    const element = this.getElementById('providedEmail');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getProvidedEmailValue() {
    const element = this.getElementById('providedEmailInput');
    this.waitForPresenceOfElement(element);
    return element;
  }
}

export default new WaitingRoomPage();
