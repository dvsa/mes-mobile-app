import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';
import { AppConfigProvider } from '../providers/app-config/app-config';

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authenticationService: AuthenticationServiceProvider,
    appConfig: AppConfigProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      appConfig.refreshConfigSettings();

      // Attempt to login if on an ios device
      if (platform.is('ios')) {
        authenticationService
          .login()
          .then(() => {
            splashScreen.hide();
            this.rootPage = 'JournalPage';
          })
          .catch(() => {
            splashScreen.hide();
            this.rootPage = 'LoginPage';
          });
      } else {
        this.rootPage = 'JournalPage';
      }
    });
  }
}
