import Page from './page';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

class SearchPage extends Page {
  assertElementIsPresent(elements) {
    elements.forEach((e) => {
      expect(e.isPresent()).to.eventually.be.true;
    });
  }

  clickBackButton() {
    this.clickElementByXPath('//page-test-results-search/ion-header/ion-navbar/button');
  }

  clickCloseButton() {
    this.clickElementByXPath('//div[2]/ion-header/ion-navbar/ion-buttons/button');
  }

  getTestOutcome() {
    const element = this.getElementById('testOutcome');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getTellMeQuestionCategory(cat) {
    const element = this.getElementByXPath(
      `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span/span[@class="mes-data bold" and text() = "${cat}"]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getTellMeQuestionText(categoryText) {
    const element = this.getElementByXPath(
      `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span[@class="mes-data" and text() = "${categoryText}"]`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getDebriefSection() {
    const element = this.getElementByXPath('//debrief-card');
    this.waitForPresenceOfElement(element);
    return element;
  }

  scrollToDebriefSection() {
    const debriefSection = this.getDebriefSection();
    this.scrollToElement(debriefSection);
  }

  getDataRow(row) {
    const dataRow = this.getElementByXPath(
      `//data-row/ion-row[ion-col/label[text() = '${row[0]}'] and ion-col/span[text() = '${row[1]}']]`);
    this.waitForPresenceOfElement(dataRow);
    return dataRow;
  }

  dataIsPresent(table) {
    table.rows().forEach((row: string[]) => {
      const dataRow = this.getDataRow(row);
      expect(dataRow.isPresent()).to.eventually.be.true;
    });
  }

  clickSearchResult(index) {
    this.clickElementByXPath(`//page-test-results-search//search-result/ion-card/ion-grid/ion-row[${index}]`);
  }

  enterSearchTerm(searchTerm) {
    this.textFieldInputViaNativeMode(
      '//XCUIElementTypeWindow//XCUIElementTypeTextField[@value="Enter an application reference"]',
      searchTerm);
  }

  clickSearchButton() {
    this.clickElementByXPath('//*[@id="tab-search-candidate-details"]//ion-row[3]/button/span');
  }

  clickSearchForCompletedTestsButton() {
    this.clickElementByXPath('//page-dashboard//test-results-search-card//span');
  }
}

export default new SearchPage();
