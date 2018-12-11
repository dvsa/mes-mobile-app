import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';

@Component({
  selector: 'page-help-journal',
  templateUrl: 'help-journal.html'
})
export class HelpJournalPage {
  title: string = 'Journal - Help';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logging: AnalyticsProvider
  ) {}

  ionViewDidEnter() {
    this.logging.setCurrentPage(AnalyticsScreenNames.HELP_JOURNAL);
  }
}
