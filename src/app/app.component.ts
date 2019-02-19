import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Store } from '@ngrx/store';

import { AppInfoModel } from '../app-info/app-info.model';
import { LoadAppInfo } from '../app-info/app-info.actions';

@Component({
  templateUrl: 'app.html',
})
export class App {
  rootPage: any = 'LoginPage';

  constructor(
    private store$: Store<AppInfoModel>,
    platform: Platform,
    statusBar: StatusBar,
  ) {
    platform.ready()
      .then(() => {
        statusBar.styleLightContent();
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#000000');
        this.store$.dispatch(new LoadAppInfo());
      });
  }
}
