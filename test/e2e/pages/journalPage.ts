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
    const selector = `//indicators/div/img[@class = "exclamation-indicator"]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getWelshIndicatorFor(candidateName) {
    const selector = `//ion-grid/ion-row/ion-col/language/
  div[@class = "welsh-language-indicator"][ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link
    /div/button/span/h3[text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getSlotLocator(description, code, time) {
    const selector = `//ion-row[ion-col/div/time/div/h2[text() = '${time}']]
    [ion-col/h3[normalize-space(text()) = '${description}']][ion-col[h2[text() = '${code}']]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getTestResultElementFor(candidateName) {
    const selector = `//test-outcome//span[@class='outcome']/h2
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getTestCategoryElementFor(candidateName) {
    const selector = `//test-category/h2[ancestor::ion-row/ion-col/ion-grid/ion-row/
    ion-col/candidate-link/div/button/span/h3[text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getVehicleLengthElementFor(candidateName) {
    const selector = `//vehicle-details/div/span/span[text()= 'L: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getVehicleWidthElementFor(candidateName) {
    const selector = `//vehicle-details/div/span/span[text()= 'W: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getVehicleHeightElementFor(candidateName) {
    const selector = `//vehicle-details/div/span/span[text()= 'H: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getSeatElementFor(candidateName) {
    const selector = `//vehicle-details/div/span/span[text() = 'Seats: ']/following-sibling::span
    [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
      [text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  getRefreshButton() {
    const selector = '//button/span/span/span[text() = "Refresh"]';
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
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

  getStartTestButtonFor(candidateName, waitForElement : boolean = true) {
    const selector = `//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`;
    const element = this.getElementByXPath(selector);

    if (waitForElement) {
      this.waitForPresenceOfElement(element, selector);
    }

    return element;
  }

  startTestFor(candidateName) {
    this.clickElement(this.getStartTestButtonFor(candidateName));
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
    const selector = `//ion-col/label[text()= "${rowName}"]
    [parent::ion-col/parent::ion-row//*[normalize-space(text()) = "${rowValue}"]]`;
    const element = this.getElementByXPath(selector);
    this.waitForPresenceOfElement(element, selector);
    return element;
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
    const selector = `modal-alert-header`;
    const element = this.getElementByClassName(`modal-alert-header`);
    this.waitForPresenceOfElement(element, selector);
    return element;
  }

  rekeyIsPresent() {
    const rekeyStartTestButton = this.getElementById('rekey-start-test-button');
    return expect(rekeyStartTestButton.isPresent()).to.eventually.be.true;
  }
}

export default new JournalPage();
