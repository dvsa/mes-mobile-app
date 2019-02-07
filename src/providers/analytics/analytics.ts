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
    });
  
  }

  setCurrentPage(name: string) {
    this.platform.ready().then(() => { 
      this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.trackView(name).then((resp) => {});
        })
        .catch((error) => console.log('Error starting Google Analytics', error));
    });
  }

  logEvent(category: string, event: string, label?: string, params?: any) {
    this.platform.ready().then(() => {
      this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.trackEvent(category, event, label).then((resp) => {});
        })
        .catch((error) => console.log('Error starting Google Analytics', error));
    });
  }

  addCustomDimension(key: number, value: string) {
    this.ga
    .startTrackerWithId(this.googleAnalyticsKey)
    .then(() => {
      this.ga.addCustomDimension(key,value)
        .then(() => console.log(`Custom Dimension ${key} added successfully - value ${value}`))
        .catch((dimError) => console.log('Error adding custom dimension ', dimError));
    })
    .catch((error) => console.log('Error starting GoogleAnalytics', error));
  }

  logError(type: string, message: string) {
    this.logEvent(AnalyticsEventCategories.ERROR, type, message);
  }

  setUserId(userId: string) {
    this.ga
    .startTrackerWithId(this.googleAnalyticsKey)
    .then(() => {
      this.ga.setUserId(userId)
        .then(() => console.log(`User Id set to ${userId}`))
        .catch((idError) => console.log(`Error setting userid ${userId}`,idError));
    })
    .catch((error) => console.log('Error starting GoogleAnalytics', error));
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
