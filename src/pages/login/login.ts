import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationError } from '../../providers/authentication/authentication.constants';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { StoreModel } from '../../common/store.model';
import { LoadAirwatchConfig } from '../../modules/airwatch-config/airwatch-config.actions';
import { getAirwatchConfigState } from '../../modules/airwatch-config/airwatch-config.reducer';
import { getAirwatchConfig } from '../../modules/airwatch-config/airwatch-config.selector';
import { AirwatchConfigStateModel } from '../../modules/airwatch-config/airwatch-config.model';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePageComponent implements OnDestroy {

  subscription: Subscription;
  authenticationError: AuthenticationError;
  hasUserLoggedOut: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public splashScreen: SplashScreen,
    public appConfigProvider: AppConfigProvider,
    public analytics: AnalyticsProvider,
    private store$: Store<StoreModel>,
  ) {
    super(platform, navCtrl, authenticationProvider, false);

    // Check to see if redirect to page was from a logout
    this.hasUserLoggedOut = navParams.get('hasLoggedOut');

    // Trigger Authentication if this isn't a logout and is an ios device
    if (!this.hasUserLoggedOut && this.isIos()) {
      this.store$.dispatch(new LoadAirwatchConfig());

      this.subscription = this.store$.pipe(
        select(getAirwatchConfigState),
        map(getAirwatchConfig),
        map(this.login),
      ).subscribe();
    }

    if (!this.isIos()) {
      this.navController.setRoot('JournalPage');
      this.splashScreen.hide();
    }
  }

  ngOnDestroy():void {
    if (this.isIos()) {
      this.subscription.unsubscribe();
    }
  }

  login = (config: AirwatchConfigStateModel): Promise<any> =>
    this.platform.ready()
      .then(() =>
        this.authenticationProvider
          .login()
          .then(() => this.appConfigProvider.loadRemoteConfig(config.configUrl))
          .then(() => this.analytics.initialiseAnalytics())
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
