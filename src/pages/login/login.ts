import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationError } from '../../providers/authentication/authentication.constants';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { StoreModel } from '../../shared/models/store.model';
import { StartSendingLogs } from '../../modules/logs/logs.actions';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePageComponent {

  authenticationError: AuthenticationError;
  hasUserLoggedOut: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public splashScreen: SplashScreen,
    private store$: Store<StoreModel>,
    public authenticationProvider: AuthenticationProvider,
    public appConfigProvider: AppConfigProvider,
    public analytics: AnalyticsProvider,
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
      .then(() =>
        this.authenticationProvider
          .login()
          .then(() => this.appConfigProvider.loadRemoteConfig())
          .then(() => this.analytics.initialiseAnalytics())
          .then(() => this.store$.dispatch(new StartSendingLogs()))
          .then(() => this.navController.setRoot('JournalPage'))
          .catch((error: AuthenticationError) => {
            if (error === AuthenticationError.USER_CANCELLED) {
              this.analytics.logException(error, true);
            }
            this.authenticationError = error;
          }),
      )
      .then(() => this.hasUserLoggedOut = false)
      .then(() => this.splashScreen.hide())

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
