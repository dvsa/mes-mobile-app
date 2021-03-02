import { Page } from '../../utilities/page';
import { JournalPageObjects } from './jounralPage.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

export class JournalPage extends Page {

  journalPageElement: JournalPageObjects = new JournalPageObjects();

  /**
   * If the journal page is loaded we should have a refresh button
   */
  async isCurrentPage() {
    await expect(this.journalPageElement.getRefreshButton.isPresent()).to.eventually.be.true;
  }

  async clickRefreshButton() {
    await this.clickElement(this.journalPageElement.getRefreshButton);
  }

  async clickStartTestLateButton() {
    await this.clickElement(this.journalPageElement.getStartTestLateButton);
  }

  async clickRekeyTestLateButton() {
    await this.clickElement(this.journalPageElement.getRekeyTestLateButton);
  }

  async clickRekeyTestButtonFor(candidateName: string) {
    await this.clickElement(this.journalPageElement.getRekeyTestButtonFor(candidateName));
  }

  async startTestFor(candidateName: string) {
    await this.clickElement(this.journalPageElement.getStartTestButtonFor(candidateName, true));
  }

  async clickContinueWriteupButton(candidateName: string) {
    await this.clickElement(this.journalPageElement.clickContinueWriteupButton(candidateName));
  }

  async clickStartTestEarlyButton() {
    await this.clickElement(this.journalPageElement.getStartTestEarlyButton);
  }

  async viewCandidateDetails(candidateName: string) {
    await this.clickElement(this.journalPageElement.viewCandidateDetails(candidateName));
  }

  async closeCandidateDetailsDialog() {
    await this.clickElement(this.journalPageElement.closeCandidateDetailsDialog);
    await this.waitForAngularToFinishRendering();
  }

  async clickBackButton() {
    await this.clickElement(this.journalPageElement.clickBackButton);
  }

  async clickNextDayButton() {
    await this.clickElement(this.journalPageElement.clickNextDayButton);
  }

  async clickPreviousDayButton() {
    await this.clickElement(this.journalPageElement.clickPreviousDayButton);
  }

  async rowContains(rowName: string, rowValue: string) {
    const dataRow = await this.journalPageElement.getDataRow(rowName, rowValue);
    expect(dataRow.isPresent()).to.eventually.be.true;
  }

  async startingExpiredOrEarlyTest(candidateName: string) {
    await this.startTestFor(candidateName);
    return expect(this.journalPageElement.getTimeDialog.isPresent()).to.eventually.be.true;
  }

  async rekeyIsPresent() {
    // todo: should this call waitForPresenceOfElement?
    return expect(this.journalPageElement.rekeyStartTestButton.isPresent()).to.eventually.be.true;
  }

  closeCandidateTestDetailsModal() {
    // const closeButton = this.ge
  }
}
