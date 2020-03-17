import Page from './page';
import LandingPage from './landingPage';
import DashboardPage from './dashboardPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

class JournalPage extends Page {
  /**
   * If the journal page is loaded we should have a refresh button
   */
  isCurrentPage() {
    const refreshButton = this.getRefreshButton();
    expect(refreshButton.isPresent()).to.eventually.be.true;
  }

  // todo: kc on LandingPage there is a method onLandingPageAs.
  // would be good to have a polymorphic method name here for both methods.
  onJournalPageAs (username) {
    // Load the landing page
    LandingPage.onLandingPageAs(username);

    // Navigate to journal page
    DashboardPage.clickGoToMyJournalButton();
  }

  getSpecialNeedsIndicatorFor(candidateName) {
    const element = this.getElementByXPath(`//indicators/div/img[@class = "exclamation-indicator"]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getWelshIndicatorFor(candidateName) {
    const element = this.getElementByXPath(`//ion-grid/ion-row/ion-col/language/
  div[@class = "welsh-language-indicator"][ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link
    /div/button/span/h3[text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getSlotLocator(description, code, time) {
    const element = this.getElementByXPath(`//ion-row[ion-col/div/time/div/h2[text() = '${time}']]
    [ion-col/h3[normalize-space(text()) = '${description}']][ion-col[h2[text() = '${code}']]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getTestResultElementFor(candidateName) {
    const element = this.getElementByXPath(`//test-outcome//span[@class='outcome']/h2
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getTestCategoryElementFor(candidateName) {
    const element = this.getElementByXPath(`//test-category/h2[ancestor::ion-row/ion-col/ion-grid/ion-row/
    ion-col/candidate-link/div/button/span/h3[text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getVehicleLengthElementFor(candidateName) {
    const element = this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'L: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getVehicleWidthElementFor(candidateName) {
    const element = this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'W: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getVehicleHeightElementFor(candidateName) {
    const element = this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'H: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getSeatElementFor(candidateName) {
    const element = this.getElementByXPath(`//vehicle-details/div/span/span[text() = 'Seats: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getRefreshButton() {
    const element = this.getElementByXPath('//button/span/span/span[text() = "Refresh"]');
    this.waitForPresenceOfElement(element);
    return element;
  }

  clickRefreshButton() {
    this.clickElement(this.getRefreshButton());
  }

  getRekeyStartTestButton() {
    return this.getElementById('rekey-start-test-button');
    // no need to call this.waitForPresenceOfElement(element) - this element may or may not be present.  If it is
    // present we want to click it.  If it isn't present we don't care.
  }

  clickRekeyStartTestButton() {
    this.clickElement(this.getRekeyStartTestButton());
  }

  getRekeyTestButtonFor(candidateName) {
    return this.getElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Rekey"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  clickRekeyTestButtonFor(candidateName) {
    this.clickElement(this.getRekeyTestButtonFor(candidateName));
  }

  clickContinueWriteupButton(candidateName) {
    this.clickElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Write-up"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  getStartTestEarlyButton() {
    return this.getElementById('early-start-start-test-button');
    // no need to call this.waitForPresenceOfElement(element) - this element may or may not be present.  If it is
    // present we want to click it.  If it isn't present we don't care.
  }

  clickStartTestEarlyButton() {
    this.clickElement(this.getStartTestEarlyButton());
  }

  /**
   * If the start test early dialog is shown just select continue
   */
  clickStartTestEarlyContinueButtonIfPresent() {
    const startTestEarlyButton = this.getStartTestEarlyButton();
    startTestEarlyButton.isPresent().then((result) => {
      if (result) {
        this.clickStartTestEarlyButton();
      }
    });
  }

  /**
   * If the rekey dialog is shown so just select start test normally
   */
  clickRekeyStartTestButtonIfPresent() {
    const lateStartTestButton = this.getRekeyStartTestButton();
    lateStartTestButton.isPresent().then((result) => {
      if (result) {
        this.clickRekeyStartTestButton();
      }
    });
  }

  clickNextDayButton() {
    this.clickElementById('next-day-container');
  }

  clickPreviousDayButton() {
    this.clickElementById('previous-day-container');
  }

  viewCandidateDetails(candidateName) {
    this.clickElementByXPath(`//h3[text()[normalize-space(.) = "${candidateName}"]]`);
  }

  closeCandidateDetailsDialog() {
    this.clickElementById('closeCandidateDetails');
  }

  getStartTestButtonFor(candidateName, waitForElement : boolean = true) {
    const element = this.getElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);

    if (waitForElement) {
      this.waitForPresenceOfElement(element);
    }

    return element;
  }

  startTestFor(candidateName) {
    this.clickElement(this.getStartTestButtonFor(candidateName));
  }

  clickBackButton() {
    this.clickElementByXPath('//page-journal//button//span[text()="Back"]');
  }

  getDataRow(rowName, rowValue) {
    const element = this.getElementByXPath(`//ion-col/label[text()= "${rowName}"]
    [parent::ion-col/parent::ion-row//*[normalize-space(text()) = "${rowValue}"]]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  rowContains(rowName, rowValue) {
    const dataRow = this.getDataRow(rowName, rowValue);
    return expect(dataRow.isPresent()).to.eventually.be.true;
  }

  async startingExpiredOrEarlyTest(candidateName) {
    // this.clickElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    // [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    // h3[text() = "${candidateName}"]]`);
    this.startTestFor(candidateName);
    const timeDialogIsPresent = await this.isTimeDialogPresent();
    expect(timeDialogIsPresent).to.be.true;
  }

  getTimeDialog() {
    return this.getElementByClassName(`modal-alert-header`);
  }

  async isTimeDialogPresent() {
    return this.getTimeDialog().isPresent();
  }
}

export default new JournalPage();
