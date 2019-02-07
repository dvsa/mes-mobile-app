import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsDimensionIndices
} from '../../providers/analytics/analytics.model';

@IonicPage()
@Component({
  selector: 'page-debrief',
  templateUrl: 'debrief.html'
})
export class DebriefPage extends BasePageComponent {

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
    this.analytics.setCurrentPage(AnalyticsScreenNames.DEBRIEF);
  }

}
