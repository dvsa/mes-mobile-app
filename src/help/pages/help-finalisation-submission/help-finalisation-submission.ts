import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';

@Component({
  selector: 'page-help-finalisation-submission',
  templateUrl: 'help-finalisation-submission.html'
})
export class HelpFinalisationSubmissionPage {
  title: string = 'Test Summary - Help';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logging: AnalyticsProvider
  ) {}

  ionViewDidEnter() {
    this.logging.setCurrentPage(AnalyticsScreenNames.HELP_FINALISATION);
  }
}
