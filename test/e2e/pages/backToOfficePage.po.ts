import Page from '../utilities/page';

export class BackToOfficePageObject extends Page {
  isCurrentPage =
        this.getElementById('back-to-office-page');

  continueToWriteUpButton =
        this.getElementById('continue-to-write-up');

  backToJournalButton =
        this.getElementByXPath('//*[@id="back-to-office-page"]//div[3]/button/span');
}
