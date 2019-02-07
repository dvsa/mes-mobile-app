import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import {
  AnalyticsScreenNames,
  AnalyticsDimensionIndices
} from '../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@IonicPage()
@Component({
  selector: 'page-terminate-test',
  templateUrl: 'terminate-test.html'
})
export class TerminateTestPage extends BasePageComponent {

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
    this.analytics.addCustomDimension(AnalyticsDimensionIndices.DEVICE_ID, this.analytics.uniqueDeviceId);
    this.analytics.setCurrentPage(AnalyticsScreenNames.TERMINATE_TEST);
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
