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
    return refreshButton.isPresent();
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
    return this.getElementByXPath(`//indicators/div/img[@class = "exclamation-indicator"]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  getWelshIndicatorFor(candidateName) {
    return this.getElementByXPath(`//ion-grid/ion-row/ion-col/language/
  div[@class = "welsh-language-indicator"][ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link
    /div/button/span/h3[text() = "${candidateName}"]]`);
  }

  getSlotLocator(description, code, time) {
    return this.getElementByXPath(`//ion-row[ion-col/div/time/div/h2[text() = '${time}']]
    [ion-col/h3[normalize-space(text()) = '${description}']][ion-col[h2[text() = '${code}']]]`);
  }

  getTestResultElementFor(candidateName) {
    return this.getElementByXPath(`//test-outcome//span[@class='outcome']/h2
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  getTestCategoryElementFor(candidateName) {
    return this.getElementByXPath(`//test-category/h2[ancestor::ion-row/ion-col/ion-grid/ion-row/
    ion-col/candidate-link/div/button/span/h3[text() = "${candidateName}"]]`);
  }

  getVehicleLengthElementFor(candidateName) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'L: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
  }

  getVehicleWidthElementFor(candidateName) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'W: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
  }

  getVehicleHeightElementFor(candidateName) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'H: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
  }

  getSeatElementFor(candidateName) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text() = 'Seats: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`);
  }

  getRefreshButton() {
    return this.getElementByXPath('//button/span/span/span[text() = "Refresh"]');
  }

  clickRefreshButton() {
    this.clickElement(this.getRefreshButton());
  }

  /**
   * no need to call this.waitForPresenceOfElement(element) - this element may or may not be present.  If it is
   * present we want to click it.  If it isn't present we don't care.
   */
  getRekeyStartTestButton() {
    return this.getElementById('rekey-start-test-button', false);
  }

  clickRekeyStartTestButton() {
    this.clickElement(this.getRekeyStartTestButton());
  }

  getRekeyTestButtonFor(candidateName) {
    return this.getElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Rekey"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`, false);
  }

  clickRekeyTestButtonFor(candidateName) {
    this.clickElement(this.getRekeyTestButtonFor(candidateName));
  }

  getStartTestButtonFor(candidateName, waitForElement : boolean = true) {
    return this.getElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`, waitForElement);
  }

  startTestFor(candidateName) {
    this.clickElement(this.getStartTestButtonFor(candidateName));
  }

  clickContinueWriteupButton(candidateName) {
    this.clickElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Write-up"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  /**
   * no need to call this.waitForPresenceOfElement(element) - this element may or may not be present.  If it is
   * present we want to click it.  If it isn't present we don't care.
   */
  getStartTestEarlyButton() {
    return this.getElementById('early-start-start-test-button', false);
  }

  clickStartTestEarlyButton() {
    this.clickElement(this.getStartTestEarlyButton());
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

  clickBackButton() {
    this.clickElementByXPath('//page-journal//button//span[text()="Back"]');
  }

  getDataRow(rowName, rowValue) {
    return this.getElementByXPath(`//ion-col/label[text()= "${rowName}"]
    [parent::ion-col/parent::ion-row//*[normalize-space(text()) = "${rowValue}"]]`);
  }

  rowContains(rowName, rowValue) {
    const dataRow = this.getDataRow(rowName, rowValue);
    return expect(dataRow.isPresent()).to.eventually.be.true;
  }

  startingExpiredOrEarlyTest = (candidateName) => {
    this.startTestFor(candidateName);
    const testDialog = this.getTimeDialog();
    return expect(testDialog.isPresent()).to.eventually.be.true;
  }

  getTimeDialog() {
    return this.getElementByClassName(`modal-alert-header`);
  }

  rekeyIsPresent() {
    // todo: should this call waitForPresenceOfElement?
    const rekeyStartTestButton = this.getElementById('rekey-start-test-button', false);
    return expect(rekeyStartTestButton.isPresent()).to.eventually.be.true;
  }
}

export default new JournalPage();
