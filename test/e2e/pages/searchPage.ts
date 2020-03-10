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

  // todo: kc should this method be here or on another page?
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
}

export default new SearchPage();
