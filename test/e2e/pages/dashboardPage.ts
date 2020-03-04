import Page from './page';

class DashboardPage extends Page {
  clickGoToMyJournalButton () {
    this.clickElementByXPath('//go-to-journal-card/button');
  }
}

export default new DashboardPage();
