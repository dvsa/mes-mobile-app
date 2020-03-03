import Page from './page';
import LandingPage from './landingPage';
import DashboardPage from './dashboardPage';
import { browser, by, element, ExpectedConditions } from 'protractor';

class JournalPage extends Page {
  // todo: kc on LandingPage there is a method onLandingPageAs.
  // would be good to have a polymorphic method name here for both methods.
  onJournalPageAs (username) {
    // Load the landing page
    LandingPage.onLandingPageAs(username);

    // Navigate to journal page
    DashboardPage.clickGoToMyJournalButton();

    // If the journal page is loaded we should have a refresh button
    const refreshButton = element(by.xpath('//button/span/span/span[text() = "Refresh"]'));
    browser.wait(ExpectedConditions.presenceOf(refreshButton));
  }

  // todo: kc find a better name
  getExclamationIndicatorSpecialNeedsFor(candidateName) {
    return this.getElementByXPath(`//indicators/div/img[@class = "exclamation-indicator"]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  // todo: kc find a better name
  getExclamationIndicatorWelshfor(candidateName) {
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

  getRekeyStartTestButton() {
    return this.getElementById('rekey-start-test-button');
  }

  clickRekeyStartTestButton() {
    this.clickElement(this.getRekeyStartTestButton());
  }

  clickRekeyTestButtonFor(candidateName) {
    this.clickElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Rekey"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  clickContinueWriteupButton(candidateName) {
    this.clickElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Write-up"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }

  getStartTestEarlyButton() {
    return this.getElementById('early-start-start-test-button');
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

  startTestFor(candidateName) {
    this.clickElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
    [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
    h3[text() = "${candidateName}"]]`);
  }
}

export default new JournalPage();
