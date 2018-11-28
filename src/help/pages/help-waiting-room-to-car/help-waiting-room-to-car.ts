import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';

@Component({
  selector: 'page-help-waiting-room-to-car',
  templateUrl: 'help-waiting-room-to-car.html'
})
export class HelpWaitingRoomToCarPage {
  title: string = 'Waiting room to car - Help';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logging: AnalyticsProvider
  ) {}

  ionViewDidEnter() {
    this.logging.setCurrentPage(AnalyticsScreenNames.HELP_WAITING_ROOM);
  }
}
