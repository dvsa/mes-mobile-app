import { Page } from '../../utilities/page';
import { SearchPageObject } from './searchPage.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

export class SearchPage extends Page {

  searchPageElement: SearchPageObject = new SearchPageObject();

  assertElementIsPresent(elements) {
    elements.forEach((e) => {
      expect(e.isPresent()).to.eventually.be.true;
    });
  }

  async clickBackButton() {
    await this.clickElement(this.searchPageElement.backButton);
  }

  async clickCloseButton() {
    await this.clickElement(this.searchPageElement.closeButton);
  }

  async scrollToDebriefSection() {
    await this.scrollToElement(this.searchPageElement.debriefSection);
  }

  dataIsPresent(table: any) {
    table.rows().forEach(async (row: string[]) => {
      const dataRow = this.searchPageElement.DataRow(row);
      await expect(dataRow.isPresent()).to.eventually.be.true;
    });
  }

  async clickSearchResult(index) {
    await this.clickElement(this.searchPageElement.SearchResult);
  }

  async enterSearchTerm(searchTerm: string) {
    await this.textFieldInputViaNativeMode(
      '//XCUIElementTypeWindow//XCUIElementTypeTextField[@value="Enter an application reference"]',
      searchTerm);
  }

  async clickSearchButton() {
    await this.clickElement(this.searchPageElement.searchButton);
  }

  async clickSearchForCompletedTestsButton() {
    await this.clickElement(this.searchPageElement.searchForCompletedTestsButton);
  }
}
