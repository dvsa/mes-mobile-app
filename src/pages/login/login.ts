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
import { getAirwatchConfig, getAirwatchError } from '../../modules/airwatch-config/airwatch-config.selector';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

interface PageState {
  airwatchError$: Observable<any>;
  airWatchConfig$: Observable<any>;
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePageComponent implements OnDestroy {

  subscription: Subscription;
  authenticationError: AuthenticationError;
  hasUserLoggedOut: boolean = false;

  pageState: PageState;
  error: string;
  config: string;

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
   // if (!this.hasUserLoggedOut && this.isIos()) {

    platform.ready().then(() => {
      this.store$.dispatch(new LoadAirwatchConfig());
    });

   // }

  /*  if (!this.isIos()) {
      this.navController.setRoot('JournalPage');
      this.splashScreen.hide();
    } */
  }

  ngOnInit():void {
    this.pageState = {
      airwatchError$: this.store$.pipe(
        select(getAirwatchConfigState),
        select(getAirwatchError),
      ),
      airWatchConfig$: this.store$.pipe(
        select(getAirwatchConfigState),
        select(getAirwatchConfig),
      ),
    };

    const { airwatchError$ , airWatchConfig$ } = this.pageState;

    const merged$ = merge(
      airwatchError$.pipe(map((result) => {
        this.error = JSON.stringify(result);
        this.splashScreen.hide();
      })),
      airWatchConfig$.pipe(map((result) => {
        this.config = JSON.stringify(result);
        this.splashScreen.hide();
      })),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy():void {
    if (this.isIos()) {
      this.subscription.unsubscribe();
    }
  }/*
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

      */
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
