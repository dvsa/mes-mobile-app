import Page from './page';

class DashboardPage extends Page {
  clickGoToMyJournalButton () {
    this.clickElementByXPath('//go-to-journal-card/button');
  }

  clickPracticeMarkingATestCatB() {
    this.clickElementByXPath('//button/span/h3[text() = "Practice marking a test (cat B)"]');
  }

  clickStartWithOrWithoutADrivingFault(withDrivingFault) {
    this.clickElementByXPath(`//button/span/h3[text() = "Start ${withDrivingFault} a driving fault"]`);
  }
}

export default new DashboardPage();
