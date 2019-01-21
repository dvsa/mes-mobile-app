import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationError } from '../../providers/authentication/authentication.constants';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePageComponent {

  authenticationError: AuthenticationError;
  hasUserLoggedOut: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public splashScreen: SplashScreen,
    private openNativeSettings: OpenNativeSettings,
  ) {
    super(platform, navCtrl, authenticationProvider, false);

    // Check to see if redirect to page was from a logout
    this.hasUserLoggedOut = navParams.get('hasLoggedOut');

    // Trigger Authentication if this isn't a logout and is an ios device
    if (!this.hasUserLoggedOut && this.isIos()) {
      this.login();
    }
  }

  login = (): Promise<any> =>
    this.platform.ready()
      .then(() =>
        this.authenticationProvider
          .login()
          .then(() => this.navController.setRoot('JournalPage'))
          .catch((error: AuthenticationError) => this.authenticationError = error)
      )
      .then(() => this.hasUserLoggedOut = false)
      .then(() => this.splashScreen.hide());

  isInternetConnectionError = (): boolean => {
    return !this.hasUserLoggedOut && this.authenticationError === AuthenticationError.NO_INTERNET;
  }

  isUserCancelledError = (): boolean => {
    return !this.hasUserLoggedOut && this.authenticationError === AuthenticationError.USER_CANCELLED;
  }

  isUnknownError = (): boolean => {
    return !this.hasUserLoggedOut && this.authenticationError === undefined;
  }

  openWifiSetting = (): void => {
    this.openNativeSettings.open('wifi');
  }
}
