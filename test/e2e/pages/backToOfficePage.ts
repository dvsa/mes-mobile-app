import BasePage from './basePage';
import { browser, ExpectedConditions } from 'protractor';

class BackToOfficePage extends BasePage {
  isCurrentPage() {
    // No page title so need to check something else exists that exists on the page
    const backToOfficePage = this.getElementById('back-to-office-page');
    // todo: kc do we need to return this?  What is picking it up?
    return browser.wait(ExpectedConditions.presenceOf(backToOfficePage));
  }

  clickContinueToWriteUpButton() {
    this.clickElementById('continue-to-write-up');
  }

  clickBackToJournalButton() {
    this.clickElementByXPath('//*[@id="back-to-office-page"]//div[3]/button/span');
  }
}

export default new BackToOfficePage();
