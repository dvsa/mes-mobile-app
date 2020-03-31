import Page from './page';

class HealthDeclarationPage extends Page {
  getPassCertificateNumber() {
    const selector = 'declaration-pass-certificate-number';
    const element = this.getElementById(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  /**
   * Examiner clicks continue button then enters passcode - Note button has same id as another on page
   */
  confirmHealthDeclaration(testCategory) {
    this.clickElementByXPath(`//div[contains(@class, "health-declaration-cat-${testCategory}-page")]//button[@id="continue-button"]`);
  }

  clickHealthDeclarationCheckbox() {
    this.clickElementById('health-declaration-checkbox');
  }

  clickReceiptDeclarationCheckbox() {
    this.clickElementById('receipt-declaration-checkbox');
  }

  clickHealthSignatureField(testCategory) {
    this.clickElementByXPath(`//div[contains(@class, "health-declaration-cat-${testCategory}-page")]//signature-pad/canvas`);
  }
}

export default new HealthDeclarationPage();
