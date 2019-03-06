import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationError } from '../../providers/authentication/authentication.constants';
import { DeviceError } from '../../providers/device/device.constants';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { DeviceProvider } from '../../providers/device/device';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePageComponent {

  authenticationError: AuthenticationError;
  deviceTypeError: DeviceError;
  hasUserLoggedOut: boolean = false;
  hasDeviceTypeError: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public splashScreen: SplashScreen,
    public appConfigProvider: AppConfigProvider,
    public analytics: AnalyticsProvider,
    public device: DeviceProvider,

  ) {
    super(platform, navCtrl, authenticationProvider, false);

    // Check to see if redirect to page was from a logout
    this.hasUserLoggedOut = navParams.get('hasLoggedOut');

    // Trigger Authentication if this isn't a logout and is an ios device
    if (!this.hasUserLoggedOut && this.isIos()) {
      this.login();
    }

    if (!this.isIos()) {
      this.navController.setRoot('JournalPage');
      this.splashScreen.hide();
    }
  }

  login = (): Promise<any> =>
    this.platform.ready()
    .then(() => {
      const validDevice = this.device.validDeviceType();
      if (!validDevice) {
        this.deviceTypeError = DeviceError.UNSUPPORTED_DEVICE;
        this.hasDeviceTypeError = true;
      } else {
        this.authenticationProvider
          .login()
          .then(() => this.appConfigProvider.loadRemoteConfig())
          .then(() => this.analytics.initialiseAnalytics())
          .then(() => this.navController.setRoot('JournalPage'))
          .catch((error: AuthenticationError) => {
            if (error === AuthenticationError.USER_CANCELLED) {
              this.analytics.logException(error, true);
            }
            this.authenticationError = error;
          })
          .then(() => this.hasUserLoggedOut = false)
          .then(() => this.splashScreen.hide());
      }
    },
    )
    .then(() => this.appConfigProvider.loadRemoteConfig())
    .then(() => this.analytics.initialiseAnalytics())
    .then(() => this.hasUserLoggedOut = false)
    .then(() => this.splashScreen.hide())

  isDeviceInvalid = (): boolean => {
    return !this.hasDeviceTypeError &&
      this.deviceTypeError &&
      this.deviceTypeError === DeviceError.UNSUPPORTED_DEVICE;
  }

  isInternetConnectionError = (): boolean => {
    return !this.hasUserLoggedOut && this.authenticationError === AuthenticationError.NO_INTERNET;
  }

  isUserCancelledError = (): boolean => {
    return !this.hasUserLoggedOut && this.authenticationError === AuthenticationError.USER_CANCELLED;
  }

  isUnknownError = (): boolean => {
    return !this.hasUserLoggedOut &&
      this.authenticationError &&
      this.authenticationError.valueOf() !== AuthenticationError.USER_CANCELLED &&
      this.authenticationError.valueOf() !== AuthenticationError.NO_INTERNET;
  }
}
