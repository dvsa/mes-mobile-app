import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';

@Component({
  selector: 'page-help-debrief',
  templateUrl: 'help-debrief.html'
})
export class HelpDebriefPage {
  title: string = 'Debrief - Help';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logging: AnalyticsProvider
  ) {}

  ionViewDidEnter() {
    this.logging.setCurrentPage(AnalyticsScreenNames.HELP_DEBRIEF);
  }
}
