import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage extends BasePageComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public analytics: AnalyticsProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.analytics.setCurrentPage(AnalyticsScreenNames.OFFICE);
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
