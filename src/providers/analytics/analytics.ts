import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import { IAnalyticsProvider, AnalyticsEventCategories } from './analytics.model';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';

@Injectable()
export class AnalyticsProvider implements IAnalyticsProvider {
  googleAnalyticsKey: string;

  constructor(
    private appConfig: AppConfigProvider,
    public ga: GoogleAnalytics,
    public platform: Platform
  ) {
    this.googleAnalyticsKey = this.appConfig.getAppConfig().googleAnalyticsId;
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
    this.platform.ready().then(() => {
      this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
      .then(() => {
        this.ga.addCustomDimension(key,value)
        .then(() => console.log(`Custom Dimension ${key} added successfully - value ${value}`));
      })
      .catch((error) => console.log('Error starting Google Analytics',error));
    });
  }

  logError(type: string, message: string) {
    this.logEvent(AnalyticsEventCategories.ERROR, type, message);
  }

  setUserId(userId: string) {}

  getDescriptiveDate(userDate: string) {
    const today = moment().startOf('day');
    const targetDate = moment(userDate, 'YYYY-MM-DD').startOf('day');

    const daysDiff = moment.duration(targetDate.diff(today)).asDays();
    let ret: string;
    switch (daysDiff) 
    {
      case -1 : 
        ret = 'Yesterday'
        break;
      case 0: 
        ret = 'Today'
        break;
      case 1:
        ret = 'Tomorrow'
        break;
      default:
        ret = targetDate.format('YYYYMMDD')
        break;
    }
    return ret;
  }
}
