import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthenticationProvider } from '../providers/authentication/authentication';
import { AppConfigProvider } from '../providers/app-config/app-config';

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    appConfig: AppConfigProvider,
    private splashScreen: SplashScreen,
    private authenticationProvider: AuthenticationProvider,
  ) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#000000');
      appConfig.refreshConfigSettings();

      // Attempt to login if on an ios device
      if (platform.is('ios')) {
        this.login();
      } else {
        this.rootPage = 'JournalPage';
      };
    });
  }

  login = (): Promise<any> => this.authenticationProvider.login()
    .then(() => {
      this.splashScreen.hide();
      this.rootPage = 'JournalPage';
    })
    .catch(() => {
      this.splashScreen.hide();
      this.rootPage = 'LoginPage';
    })

}
