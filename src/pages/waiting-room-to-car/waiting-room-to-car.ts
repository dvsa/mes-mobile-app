import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';

@IonicPage()
@Component({
  selector: 'page-waiting-room-to-car',
  templateUrl: 'waiting-room-to-car.html'
})
export class WaitingRoomToCarPage extends BasePageComponent{
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public analytics: AnalyticsProvider
  ) {
    super(platform, navCtrl, authenticationProvider)
  }

  ionViewDidEnter(): void {
    this.analytics.setCurrentPage(AnalyticsScreenNames.WAITING_ROOM_TO_CAR);
  }

}
