import { Page } from '../../utilities/page';
import {by, element} from 'protractor';

export class JournalPageObjects extends Page {
  getRefreshButton =
    this.getElementByXPath('//button/span/span/span[text() = "Refresh"]');

  getStartTestLateButton =
    this.getElementById('rekey-start-test-button', false);

  getRekeyTestLateButton =
    this.getElementById('rekey-rekey-test-button', false);

  getStartTestEarlyButton =
    this.getElementById('early-start-start-test-button', false);

  clickNextDayButton =
    this.getElementById('next-day-container');

  clickPreviousDayButton =
    this.getElementById('previous-day-container');

  closeCandidateDetailsDialog =
    this.getElementById('closeCandidateDetails');

  clickBackButton =
    this.getElementByXPath('//page-journal//button//span[text()="Back"]');

  getTimeDialog =
    this.getElementByClassName(`modal-alert-header`);

  rekeyStartTestButton =
    this.getElementById('rekey-rekey-test-button', false);

  getSpecialNeedsIndicatorFor(candidateName: string) {
    return this.getElementByXPath(`//indicators/div/img[@class = "exclamation-indicator"]
        [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
        h3[text() = "${candidateName}"]]`);
  }

  getWelshIndicatorFor(candidateName: string) {
    return this.getElementByXPath(`//ion-grid/ion-row/ion-col/language/
      div[@class = "welsh-language-indicator"][ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link
        /div/button/span/h3[text() = "${candidateName}"]]`);
  }

  getSlotLocator(description: string, code: string, time: string) {
    return this.getElementByXPath(`//ion-row[ion-col/div/time/div/h2[text() = '${time}']]
        [ion-col/h3[normalize-space(text()) = '${description}']][ion-col[h2[text() = '${code}']]]`);
  }

  getTestResultElementFor(candidateName: string) {
    return this.getElementByXPath(`//test-outcome//span[@class='outcome']/h2
        [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
        h3[text() = "${candidateName}"]]`);
  }

  getTestCategoryElementFor(candidateName: string) {
    return this.getElementByXPath(`//test-category/h2[ancestor::ion-row/ion-col/ion-grid/ion-row/
        ion-col/candidate-link/div/button/span/h3[text() = "${candidateName}"]]`);
  }

  getVehicleLengthElementFor(candidateName: string) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'L: ']/following-sibling::span
        [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
          [text() = "${candidateName}"]]`);
  }

  getVehicleWidthElementFor(candidateName: string) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'W: ']/following-sibling::span
        [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
          [text() = "${candidateName}"]]`);
  }

  getVehicleHeightElementFor(candidateName: string) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text()= 'H: ']/following-sibling::span
        [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
          [text() = "${candidateName}"]]`);
  }

  getSeatElementFor(candidateName: string) {
    return this.getElementByXPath(`//vehicle-details/div/span/span[text() = 'Seats: ']/following-sibling::span
        [ancestor::ion-grid/ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/h3
          [text() = "${candidateName}"]]`);
  }

  getRekeyTestButtonFor(candidateName: string) {
    return this.getElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Rekey"]]
        [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
        h3[text() = "${candidateName}"]]`, false);
  }

  getStartTestButtonFor(candidateName: string, waitForElement: boolean = true) {
    return this.getElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
        [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
        h3[text() = "${candidateName}"]]`, waitForElement);
  }

  async hasStartTestButtonFor(candidateName: string) {
    return element.all(by.xpath(`//button/span/h3[text()[normalize-space(.) = "Start test"]]
        [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
        h3[text() = "${candidateName}"]]`)).count().then((count) => {
          return count > 0;
        });
  }

  clickContinueWriteupButton(candidateName: string) {
    return this.getElementByXPath(`//button/span/h3[text()[normalize-space(.) = "Write-up"]]
      [ancestor::ion-row/ion-col/ion-grid/ion-row/ion-col/candidate-link/div/button/span/
      h3[text() = "${candidateName}"]]`);
  }

  viewCandidateDetails(candidateName: string) {
    return this.getElementByXPath(`//h3[text()[normalize-space(.) = "${candidateName}"]]`);
  }

  getDataRow(rowName: string, rowValue: string) {
    return this.getElementByXPath(`//ion-col/label[text()= "${rowName}"]
    [parent::ion-col/parent::ion-row//*[normalize-space(text()) = "${rowValue}"]]`);
  }

}
