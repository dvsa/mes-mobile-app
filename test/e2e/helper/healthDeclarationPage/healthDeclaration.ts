import Page from '../../utilities/page';
import { HealthDeclarationObject } from './healthDeclarationPage.po';

export class HealthDeclarationPage extends Page {

  healthDeclarationPageElement: HealthDeclarationObject = new HealthDeclarationObject();

  /**
   * Examiner clicks continue button then enters passcode - Note button has same id as another on page
   */
  async confirmHealthDeclaration(testCategory: string) {
    await this.clickElement(this.healthDeclarationPageElement.HealthDeclaration(testCategory));
  }

  async clickHealthDeclarationCheckbox() {
    await this.clickElement(this.healthDeclarationPageElement.healthDeclarationCheckbox);
  }

  async clickReceiptDeclarationCheckbox() {
    await this.clickElement(this.healthDeclarationPageElement.receiptDeclarationCheckbox);
  }

  async clickHealthSignatureField(testCategory) {
    await this.clickElement(this.healthDeclarationPageElement.HealthSignatureField(testCategory));
  }
}
