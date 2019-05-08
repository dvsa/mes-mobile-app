import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController } from 'ionic-angular';
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
import { StartSendingLogs, LoadLog } from '../../modules/logs/logs.actions';
import { NetworkStateProvider } from '../../providers/network-state/network-state';
import { SecureStorage } from '@ionic-native/secure-storage';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { LoadPersistedTests } from '../../modules/tests/tests.actions';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePageComponent {

  authenticationError: AuthenticationError;
  deviceTypeError: DeviceError;
  loadingSpinner: Loading;
  hasUserLoggedOut: boolean = false;
  hasDeviceTypeError: boolean = false;
  unauthenticatedMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public splashScreen: SplashScreen,
    private store$: Store<StoreModel>,
    public networkStateProvider: NetworkStateProvider,
    public authenticationProvider: AuthenticationProvider,
    public appConfigProvider: AppConfigProvider,
    public analytics: AnalyticsProvider,
    public deviceProvider: DeviceProvider,
    public secureStorage: SecureStorage,
    public dataStore: DataStoreProvider,
    public loadingController: LoadingController,
  ) {
    super(platform, navCtrl, authenticationProvider, false);

    // Check to see if redirect to page was from a logout
    this.hasUserLoggedOut = navParams.get('hasLoggedOut');
    this.networkStateProvider.initialiseNetworkState();

    // Trigger Authentication if this isn't a logout and is an ios device
    if (!this.hasUserLoggedOut && this.isIos()) {
      this.login();
    }
    if (!this.isIos()) {
      this.appConfigProvider.initialiseAppConfig();
      this.navController.setRoot('JournalPage');
      this.splashScreen.hide();
    }
  }

  login = async (): Promise<any> => {
    this.handleLoadingUI(true);
    await this.platform.ready();

    this.initialiseAppConfig()
    .then(() => this.initialiseAuthentication())
    .then(() => this.authenticationProvider
      .login()
      .then(() => this.store$.dispatch(new LoadLog()))
      .then(() => this.initialisePersistentStorage())
      .then(() => this.appConfigProvider.loadRemoteConfig())
      .then(() => this.analytics.initialiseAnalytics())
      .then(() => this.store$.dispatch(new StartSendingLogs()))
      .then(() => this.handleLoadingUI(false))
      .then(() => this.validateDeviceType())
      .catch((error: AuthenticationError) => {
        this.handleLoadingUI(false);
        if (error === AuthenticationError.USER_CANCELLED) {
          this.analytics.logException(error, true);
        }
        if (error === AuthenticationError.USER_NOT_AUTHORISED) {
          this.authenticationProvider.logout();
        }
        this.authenticationError = error;
        console.log(error);
      })
      .then(() => this.hasUserLoggedOut = false)
      .then(() => this.splashScreen.hide()),
  );
  }

  async initialisePersistentStorage() {
    if (this.platform.is('ios')) {
      const storage = await this.secureStorage.create('MES');
      this.dataStore.setSecureContainer(storage);

      this.store$.dispatch(new LoadPersistedTests());
    }
  }

  initialiseAppConfig = (): Promise<void> => {
    return new Promise((resolve) => {
      this.appConfigProvider.initialiseAppConfig();
      resolve();
    });
  }

  initialiseAuthentication = (): Promise<void> => {
    return new Promise((resolve) => {
      this.authenticationProvider.initialiseAuthentication();
      this.authenticationProvider.determineAuthenticationMode();
      resolve();
    });
  }

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
      this.authenticationError.valueOf() !== AuthenticationError.NO_INTERNET &&
      this.authenticationError.valueOf() !== AuthenticationError.USER_NOT_AUTHORISED;
  }

  isUserNotAuthorised = (): boolean => {
    return !this.hasUserLoggedOut && this.authenticationError === AuthenticationError.USER_NOT_AUTHORISED;
  }

  handleLoadingUI = (isLoading: boolean): void => {
    if (isLoading) {
      this.loadingSpinner = this.loadingController.create({
        spinner: 'circles',
        content: 'App initialising...',
      });
      this.loadingSpinner.present();
      return;
    }
    if (this.loadingSpinner) {
      this.loadingSpinner.dismiss();
      this.loadingSpinner = null;
    }
  }
}
