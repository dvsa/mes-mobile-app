import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppVersion } from '@ionic-native/app-version';
import { Store } from '@ngrx/store';

import { AppInfoModel } from './app-info.model';
import { LoadAppInfo } from './app-info.actions';

@Component({
  templateUrl: 'app.html',
})
export class App {
  rootPage: any = 'LoginPage';

  constructor(
    private appVersion: AppVersion,
    private store$: Store<AppInfoModel>,
    platform: Platform,
    statusBar: StatusBar,
  ) {
    platform.ready()
      .then(() => {
        statusBar.styleLightContent();
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#000000');
        this.loadAppVersion();
      });
  }

  loadAppVersion = async (): Promise<void> => {
    try {
      const versionNumber = await this.appVersion.getVersionNumber();
      const appName = await this.appVersion.getAppName();
      const packageName = await this.appVersion.getPackageName();
      const versionCode = await this.appVersion.getVersionCode();

      this.store$.dispatch(new LoadAppInfo());

      console.log('App Version Number', versionNumber);
      console.log('App Name', appName);
      console.log('Package Name', packageName);
      console.log('Version Code', versionCode);
    } catch (err) {
      console.log('Could not get app config', err);
    }
  }
}
