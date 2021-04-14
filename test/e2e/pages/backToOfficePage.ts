import Page from '../utilities/page';
import { BackToOfficePageObject } from './backToOfficePage.po';

export class BackToOfficePage extends Page {
  backToOfficePageElement: BackToOfficePageObject = new BackToOfficePageObject();

  async clickContinueToWriteUpButton() {
    await this.clickElement(this.backToOfficePageElement.continueToWriteUpButton);
  }

  async clickBackToJournalButton() {
    await this.clickElement(this.backToOfficePageElement.backToJournalButton);
  }
}
