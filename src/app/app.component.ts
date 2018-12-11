import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AuthenticationServiceProvider } from "../providers/authentication-service/authentication-service";

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any = 'LoginPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authenticationService: AuthenticationServiceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();

      // Attempt to login if on an ios device
      if (platform.is('ios')) {
        authenticationService.login();
      }
    });
  }
}
