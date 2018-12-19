import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthenticationProvider } from '../providers/authentication/authentication';

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authenticationProvider: AuthenticationProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);

      // Attempt to login if on an ios device
      if (platform.is('ios')) {
        authenticationProvider
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
