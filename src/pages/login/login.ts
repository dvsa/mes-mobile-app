import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationError } from '../../providers/authentication/authentication.constants';
import { DeviceError } from '../../providers/device/device.constants';
import { DeviceProvider } from '../../providers/device/device';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { StoreModel } from '../../shared/models/store.model';
import { StartSendingLogs } from '../../modules/logs/logs.actions';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
// import { SetUnauthenticatedMode } from '../../providers/network-state/network-state.actions';
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
  unauthenticatedMode: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public splashScreen: SplashScreen,
    private store$: Store<StoreModel>,
    public authenticationProvider: AuthenticationProvider,
    public appConfigProvider: AppConfigProvider,
    public analytics: AnalyticsProvider,
    public deviceProvider: DeviceProvider,
    public networkStateProvider: NetworkStateProvider,
  ) {
    super(platform, navCtrl, authenticationProvider, false);

    // this.store$.select(s => s.networkState).subscribe(data => this.unauthenticatedMode = data.unauthenticatedMode);

    // Check to see if redirect to page was from a logout
    this.hasUserLoggedOut = navParams.get('hasLoggedOut');

    // Trigger Authentication if this isn't a logout and is an ios device
    if (!this.hasUserLoggedOut && this.isIos()) {
      // TODO check network state, and if not connected dispatch an event to set unauthenticated mode
      console.log(`in login ${networkStateProvider.getNetworkState}`);
      if (networkStateProvider.getNetworkState() === ConnectionStatus.OFFLINE) {
        console.log('offline dispatching set unauthenticatedmode');
       // this.store$.dispatch(new SetUnauthenticatedMode(true));
      } else {
        this.login();
      }
    }
    if (!this.isIos() || this.unauthenticatedMode) {
      this.navController.setRoot('JournalPage');
      this.splashScreen.hide();
    }
  }

  login = (): Promise<any> =>
    this.platform.ready()
    .then(() => {
      this.authenticationProvider
      .login()
      .then(() => this.appConfigProvider.loadRemoteConfig())
      .then(() => this.analytics.initialiseAnalytics())
      .then(() => this.store$.dispatch(new StartSendingLogs()))
      .then(() => this.validateDeviceType())
      .catch((error: AuthenticationError) => {
        if (error === AuthenticationError.USER_CANCELLED) {
          this.analytics.logException(error, true);
        }
        this.authenticationError = error;
        console.log(error);
      })
      .then(() => this.hasUserLoggedOut = false)
      .then(() => this.splashScreen.hide());
    },
    )

  validateDeviceType = (): void => {
    const validDevice = this.deviceProvider.validDeviceType();
    if (!validDevice) {
      this.deviceTypeError = DeviceError.UNSUPPORTED_DEVICE;
      this.hasDeviceTypeError = true;
      this.analytics.logException(`${this.deviceTypeError}-${this.deviceProvider.getDeviceType()}`, true);
    } else {
      this.navController.setRoot('JournalPage');
    }
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
