import { Page } from '../../utilities/page';

export class HealthDeclarationObject extends Page {

  passCertificateNumber =
    this.getElementById('declaration-pass-certificate-number');

  healthDeclarationCheckbox =
    this.getElementById('health-declaration-checkbox');

  receiptDeclarationCheckbox =
    this.getElementById('receipt-declaration-checkbox');

  // tslint:disable-next-line:function-name
  HealthDeclaration(testCategory: string) {
    // tslint:disable-next-line:max-line-length
    return this.getElementByXPath(`//div[contains(@class, "health-declaration-cat-${testCategory}-page")]//button[@id="continue-button"]`);
  }

  // tslint:disable-next-line:function-name
  HealthSignatureField(testCategory) {
    // tslint:disable-next-line:max-line-length
    return this.getElementByXPath(`//div[contains(@class, "health-declaration-cat-${testCategory}-page")]//signature-pad/canvas`);
  }

}
