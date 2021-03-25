import Page from '../../utilities/page';
import { JournalPageObjects } from './jounralPage.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

export class JournalPage extends Page {

  JournalPageElement: JournalPageObjects = new JournalPageObjects();

  /**
   * If the journal page is loaded we should have a refresh button
   */
  async isCurrentPage() {
    await expect(this.JournalPageElement.getRefreshButton.isPresent()).to.eventually.be.true;
  }

  async clickRefreshButton() {
    await this.clickElement(this.JournalPageElement.getRefreshButton);
  }

  async clickStartTestLateButton() {
    await this.clickElement(this.JournalPageElement.getStartTestLateButton);
  }

  async clickRekeyTestLateButton() {
    await this.clickElement(this.JournalPageElement.getRekeyTestLateButton);
  }

  async clickRekeyTestButtonFor(candidateName: string) {
    await this.clickElement(this.JournalPageElement.getRekeyTestButtonFor(candidateName));
  }

  async startTestFor(candidateName: string) {
    await this.clickElement(this.JournalPageElement.getStartTestButtonFor(candidateName, true));
  }

  async clickContinueWriteupButton(candidateName: string) {
    await this.clickElement(this.JournalPageElement.clickContinueWriteupButton(candidateName));
  }

  async clickStartTestEarlyButton() {
    await this.clickElement(this.JournalPageElement.getStartTestEarlyButton);
  }

  async viewCandidateDetails(candidateName: string) {
    await this.clickElement(this.JournalPageElement.viewCandidateDetails(candidateName));
  }

  async closeCandidateDetailsDialog() {
    await this.clickElement(this.JournalPageElement.closeCandidateDetailsDialog);
    await this.waitForAngularToFinishRendering();
  }

  async clickBackButton() {
    await this.clickElement(this.JournalPageElement.clickBackButton);
  }

  async clickNextDayButton() {
    await this.clickElement(this.JournalPageElement.clickNextDayButton);
  }

  async clickPreviousDayButton() {
    await this.clickElement(this.JournalPageElement.clickPreviousDayButton);
  }

  async rowContains(rowName: string, rowValue: string) {
    const dataRow = await this.JournalPageElement.getDataRow(rowName, rowValue);
    expect(dataRow.isPresent()).to.eventually.be.true;
  }

  async startingExpiredOrEarlyTest(candidateName: string) {
    await this.startTestFor(candidateName);
    return expect(this.JournalPageElement.getTimeDialog.isPresent()).to.eventually.be.true;
  }

  async rekeyIsPresent() {
    // todo: should this call waitForPresenceOfElement?
    return expect(this.JournalPageElement.rekeyStartTestButton.isPresent()).to.eventually.be.true;
  }

  closeCandidateTestDetailsModal() {
    // const closeButton = this.ge
  }
}
