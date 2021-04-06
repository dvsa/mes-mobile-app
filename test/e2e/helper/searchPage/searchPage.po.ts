import { Page } from '../../utilities/page';

export class SearchPageObject extends Page {

  backButton =
    this.getElementByXPath('//page-test-results-search/ion-header/ion-navbar/button');

  closeButton =
    this.getElementByXPath('//div//ion-header/ion-navbar/ion-buttons/button');

  testOutcome =
    this.getElementById('testOutcome');

  debriefSection =
    this.getElementByXPath('//debrief-card');

  searchButton =
    this.getElementByXPath('//*[@id="tab-search-candidate-details"]//ion-row[3]/button/span');

  searchForCompletedTestsButton =
    this.getElementByXPath('//page-dashboard//test-results-search-card//span');

  SearchResult(index: string) {
    return this.getElementByXPath(`//page-test-results-search//search-result/ion-card/ion-grid/ion-row[${index}]`);
  }

  TellMeQuestionCategory(cat: string) {
    return this.getElementByXPath(
      `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span/span[@class="mes-data bold" and text() = "${cat}"]`);
  }

  TellMeQuestionText(categoryText: string) {
    return this.getElementByXPath(
      `//debrief-card//data-row-custom[1]/ion-row/ion-col[2]/span[@class="mes-data" and text() = "${categoryText}"]`);
  }

  DataRow(row) {
    return this.getElementByXPath(
      `//data-row/ion-row[ion-col/label[text() = '${row[0]}'] and ion-col/span[text() = '${row[1]}']]`);
  }

}
