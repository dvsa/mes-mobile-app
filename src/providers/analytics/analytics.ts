import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import { IAnalyticsProvider, AnalyticsEventCategories } from './analytics.model';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import * as moment from 'moment';
import cryptoJs from 'crypto-js';

@Injectable()
export class AnalyticsProvider implements IAnalyticsProvider {
  private analyticsStartupError: string = 'Error starting Google Analytics';
  googleAnalyticsKey: string;
  uniqueDeviceId: string;
  constructor(
    private appConfig: AppConfigProvider,
    public ga: GoogleAnalytics,
    public platform: Platform,
    private device: Device
  ) {
    this.googleAnalyticsKey = this.appConfig.getAppConfig().googleAnalyticsId;
    this.platform.ready().then(() => {
      this.uniqueDeviceId = cryptoJs.SHA256(this.device.uuid).toString(cryptoJs.enc.Hex);
      this.setUserId(this.uniqueDeviceId); 
      this.ga.enableUncaughtExceptionReporting(true).then((resp) => {})
        .catch((error) => console.log(this.analyticsStartupError, error));
    });
  
  }

  setCurrentPage(name: string) {
    this.platform.ready().then(() => { 
      this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.trackView(name)
          .then((resp) => {})
          .catch((pageError) => console.log('Error setting page', pageError));
        })
        .catch((error) => console.log(this.analyticsStartupError, error));
    });
  }

  logEvent(category: string, event: string, label?: string, params?: any) {
    this.platform.ready().then(() => {
      this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.trackEvent(category, event, label)
          .then((resp) => {})
          .catch((eventError) => console.log('Error tracking event', eventError));
        })
        .catch((error) => console.log(this.analyticsStartupError, error));
    });
  }

  addCustomDimension(key: number, value: string) {
    this.ga
    .startTrackerWithId(this.googleAnalyticsKey)
    .then(() => {
      this.ga.addCustomDimension(key,value)
        .then((resp) => {})
        .catch((dimError) => console.log('Error adding custom dimension ', dimError));
    })
    .catch((error) => console.log(this.analyticsStartupError, error));
  }

  logError(type: string, message: string) {
    this.logEvent(AnalyticsEventCategories.ERROR, type, message);
  }

  logException(message: string, fatal: boolean) {
    this.ga
    .startTrackerWithId(this.googleAnalyticsKey)
    .then(() => {
      this.ga.trackException(message, fatal)
        .then((resp) => {})
        .catch((trackingError) => console.log('Error logging exception in Google Analytics', trackingError));
    })
    .catch((error) => console.log(this.analyticsStartupError, error));
  }

  setUserId(userId: string) {
    this.ga
    .startTrackerWithId(this.googleAnalyticsKey)
    .then(() => {
      this.ga.setUserId(userId)
        .then((resp) => {})
        .catch((idError) => console.log(`Error setting userid ${userId}`,idError));
    })
    .catch((error) => console.log(this.analyticsStartupError, error));
  }

  getDiffDays(userDate: string): number {
    const today = moment().startOf('day');
    const startOfDay = moment(userDate, 'YYYY-MM-DD').startOf('day');

    return(moment.duration(startOfDay.diff(today)).asDays());
  }
  
  getDescriptiveDate(userDate: string): string {
    let ret: string;
    const daysDiff = this.getDiffDays(userDate);

    switch (daysDiff) 
    {
      case -1 : 
        ret = 'Yesterday';
        break;
      case 0: 
        ret = 'Today';
        break;
      case 1:
        ret = 'Tomorrow';
        break;
      default:
        ret = moment(userDate, 'YYYY-MM-DD').startOf('day').format('YYYYMMDD');
        break;
    }
    return ret;
  }
}
