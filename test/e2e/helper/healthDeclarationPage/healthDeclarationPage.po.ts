import { Page } from '../../utilities/page';

export class HealthDeclarationObject extends Page {

  passCertificateNumber =
    this.getElementById('declaration-pass-certificate-number');

  healthDeclarationCheckbox =
    this.getElementById('health-declaration-checkbox');

  receiptDeclarationCheckbox =
    this.getElementById('receipt-declaration-checkbox');

  HealthDeclaration(testCategory: string) {
    return this.getElementByXPath(`//div[contains(@class, "health-declaration-cat-${testCategory}-page")]//button[@id="continue-button"]`);
  }

  HealthSignatureField(testCategory) {
    return this.getElementByXPath(`//div[contains(@class, "health-declaration-cat-${testCategory}-page")]//signature-pad/canvas`);
  }

}
