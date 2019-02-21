import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';

import { StoreModel } from '../common/store.model';
import { LoadAppInfo } from '../modules/app-info/app-info.actions';
import { LoadAirwatchConfig } from '../modules/airwatch-config/airwatch-config.actions';

@Component({
  templateUrl: 'app.html',
})
export class App {
  rootPage: any = 'LoginPage';

  constructor(
    private store$: Store<StoreModel>,
    private statusBar: StatusBar,
    platform: Platform,
  ) {
    platform.ready()
      .then(() => {
        this.configureStatusBar();
        this.loadAppInfo();
        this.loadAirwatchConfig();
      });
  }

  configureStatusBar() {
    this.statusBar.styleLightContent();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#000000');
  }

  loadAppInfo() {
    this.store$.dispatch(new LoadAppInfo());
  }

  loadAirwatchConfig() {
    this.store$.dispatch(new LoadAirwatchConfig());
  }
}
