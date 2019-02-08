import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any = 'LoginPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
  ) {
    platform.ready()
      .then(() => {
        statusBar.styleLightContent();
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#000000');
      })
  }
}
