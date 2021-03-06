import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import { IAnalyticsProvider, AnalyticsEventCategories, AnalyticsDimensionIndices } from './analytics.model';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
import { DateTime } from '../../shared/helpers/date-time';
import { createHash } from 'crypto';
import { DeviceProvider } from '../device/device';
import { AuthenticationProvider } from '../authentication/authentication';

@Injectable()
export class AnalyticsProvider implements IAnalyticsProvider {
  private analyticsStartupError: string = 'Error starting Google Analytics';
  googleAnalyticsKey: string = '';
  uniqueDeviceId: string;
  uniqueUserId: string;
  constructor(
    private appConfig: AppConfigProvider,
    private ga: GoogleAnalytics,
    private platform: Platform,
    private device: DeviceProvider,
    private authProvider: AuthenticationProvider,
  ) { }

  initialiseAnalytics = (): Promise<any> =>
    new Promise((resolve) => {
      this.googleAnalyticsKey = this.appConfig.getAppConfig().googleAnalyticsId;
      this.platform.ready().then(() => {
        this.setDeviceId(this.device.getUniqueDeviceId());
        this.setUserId(this.authProvider.getEmployeeId());
        this.addCustomDimension(AnalyticsDimensionIndices.DEVICE_ID, this.uniqueDeviceId);
        this.enableExceptionReporting();
      });
      resolve();
    })

  enableExceptionReporting(): void {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.enableUncaughtExceptionReporting(true)
            .then((resp) => { })
            .catch(uncaughtError => console.log('Error enabling uncaught exceptions', uncaughtError));
        })
        .catch(error => console.log(`enableExceptionReporting: ${this.analyticsStartupError}`, error));
      }
    });
  }

  setCurrentPage(name: string): void {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.trackView(name)
            .then((resp) => { })
            .catch(pageError => console.log('Error setting page', pageError));
        })
        .catch(error => console.log('Error starting Google Analytics', error));
      }
    });
  }

  logEvent(category: string, event: string, label ?: string, value? : number): void {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.trackEvent(category, event, label, value)
            .then((resp) => { })
            .catch(eventError => console.log('Error tracking event', eventError));
        })
        .catch(error => console.log(`logEvent: ${this.analyticsStartupError}`, error));
      }
    });
  }

  addCustomDimension(key: number, value: string): void {
    if (this.platform.is('ios')) {
      this.ga
      .startTrackerWithId(this.googleAnalyticsKey)
      .then(() => {
        this.ga.addCustomDimension(key, value)
          .then((resp) => { })
          .catch(dimError => console.log('Error adding custom dimension ', dimError));
      })
      .catch(error => console.log(`addCustomDimension: ${this.analyticsStartupError}`, error));
    }
  }

  logError(type: string, message: string): void {
    this.logEvent(AnalyticsEventCategories.ERROR, type, message);
  }

  logException(message: string, fatal: boolean): void {
    if (this.platform.is('ios')) {
      this.ga
      .startTrackerWithId(this.googleAnalyticsKey)
      .then(() => {
        this.ga.trackException(message, fatal)
          .then((resp) => { })
          .catch(trackingError => console.log('Error logging exception in Google Analytics', trackingError));
      })
      .catch(error => console.log(`logException: ${this.analyticsStartupError}`, error));
    }
  }

  setUserId(userId: string): void {
    if (this.platform.is('ios')) {
      this.uniqueUserId = createHash('sha256').update(userId || 'unavailable').digest('hex');
      this.ga
      .startTrackerWithId(this.googleAnalyticsKey)
      .then(() => {
        this.addCustomDimension(AnalyticsDimensionIndices.USER_ID, this.uniqueUserId);
        this.ga.setUserId(this.uniqueUserId)
          .then((resp) => { })
          .catch(idError => console.log(`Error setting userid ${this.uniqueUserId}`, idError));
      })
      .catch(error => console.log(`setUserId: ${this.analyticsStartupError}`, error));
    }
  }

  setDeviceId(deviceId: string): void {
    this.uniqueDeviceId = createHash('sha256').update(deviceId || 'defaultDevice').digest('hex');
    this.addCustomDimension(AnalyticsDimensionIndices.DEVICE_ID, this.uniqueDeviceId);
  }

  getDiffDays(userDate: string) : number {
    const today = new DateTime();
    return today.daysDiff(userDate);
  }

  getDescriptiveDate(userDate: string) : string {
    let ret: string;

    const daysDiff = this.getDiffDays(userDate);

    switch (daysDiff) {
      case -1:
        ret = 'Yesterday';
        break;
      case 0:
        ret = 'Today';
        break;
      case 1:
        ret = 'Tomorrow';
        break;
      default:
        ret = userDate;
        break;
    }
    return ret;
  }
}
