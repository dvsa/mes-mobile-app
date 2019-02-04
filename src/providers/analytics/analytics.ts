import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import { IAnalyticsProvider } from './analytics.model';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';

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

  logEvent(category: string, event: string, params?: any) {
    this.platform.ready().then(() => {
      this.ga
        .startTrackerWithId(this.googleAnalyticsKey)
        .then(() => {
          this.ga.trackEvent(category, event).then((resp) => {});
        })
        .catch((error) => console.log('Error starting Google Analytics', error));
    });
  }

  logError(message: string) {}

  setUserId(userId: string) {}
}
