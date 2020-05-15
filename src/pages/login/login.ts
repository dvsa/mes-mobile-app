import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Loading,
  LoadingController,
  AlertController,
} from 'ionic-angular';
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
import { StartSendingLogs, LoadLog, SaveLog, SendLogs } from '../../modules/logs/logs.actions';
import { LoadEmployeeId, LoadConfigSuccess, LoadEmployeeName } from '../../modules/app-info/app-info.actions';
import { NetworkStateProvider } from '../../providers/network-state/network-state';
import { SecureStorage } from '@ionic-native/secure-storage';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { LoadPersistedTests, StartSendingCompletedTests } from '../../modules/tests/tests.actions';
import { AppConfigError } from '../../providers/app-config/app-config.constants';
import { LogsProvider } from '../../providers/logs/logs';
import { LogType } from '../../shared/models/log.model';
import { DASHBOARD_PAGE } from '../page-names.constants';
import { LogHelper } from '../../providers/logs/logsHelper';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePageComponent {

  appInitError: AuthenticationError | AppConfigError;
  deviceTypeError: DeviceError;
  loadingSpinner: Loading;
  hasUserLoggedOut: boolean = false;
  hasDeviceTypeError: boolean = false;
  unauthenticatedMode: boolean = false;

  constructor(
    public navController: NavController,
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
    public alertCtrl: AlertController,
    public logProvider: LogsProvider,
    private logHelper: LogHelper,
  ) {
    super(platform, navController, authenticationProvider, false);

    // Check to see if redirect to page was from a logout
    this.hasUserLoggedOut = navParams.get('hasLoggedOut');
    this.networkStateProvider.initialiseNetworkState();

    // Trigger Authentication if this isn't a logout and is an ios device
    if (!this.hasUserLoggedOut && this.isIos()) {
      this.login();
    }
    if (!this.isIos()) {
      this.appConfigProvider.initialiseAppConfig();
      this.navController.setRoot(DASHBOARD_PAGE);
      this.splashScreen.hide();
    }
  }

  login = async (): Promise<any> => {

    this.handleLoadingUI(true);

    try {

      await this.platform.ready();
      await this.initialiseAppConfig();

      this.store$.dispatch(new StartSendingLogs());

      this.appInitializedLog();

      this.initialiseAuthentication();

      await this.initialisePersistentStorage();

      const isAuthenticated = await this.authenticationProvider.isAuthenticated();

      if (!isAuthenticated) {
        await this.authenticationProvider.login();
      }

      await this.authenticationProvider.setEmployeeId();

      this.store$.dispatch(new LoadEmployeeId(this.authenticationProvider.getEmployeeId()));

      this.store$.dispatch(new LoadLog());

      await this.appConfigProvider.loadRemoteConfig();
      this.store$.dispatch(new LoadConfigSuccess());

      this.store$.dispatch(new LoadPersistedTests());
      this.store$.dispatch(new LoadEmployeeName());

      this.analytics.initialiseAnalytics();

      this.store$.dispatch(new StartSendingCompletedTests());

      this.handleLoadingUI(false);
      this.validateDeviceType();
    } catch (error) {

      this.handleLoadingUI(false);

      if (error === AuthenticationError.USER_CANCELLED) {
        this.analytics.logException(error, true);
        this.dispatchLog(`user cancelled login`);
      }
      if (error === AuthenticationError.USER_NOT_AUTHORISED) {

        const token = await this.authenticationProvider.getAuthenticationToken();
        const examiner = this.authenticationProvider.getEmployeeId() || 'unavailable';
        if (token) {
          this.dispatchLog(`user ${examiner} not authorised: TOKEN ${token}`);
        } else {
          this.dispatchLog(`user ${examiner} not authorised: Could not get token`);
        }
        this.authenticationProvider.logout();
      }
      this.appInitError = error;
      console.log(error);

    }
    this.hasUserLoggedOut = false;
    this.splashScreen.hide();
  }

  dispatchLog(message: string) {
    this.store$.dispatch(new SaveLog(this.logHelper.createLog(LogType.ERROR, 'User login', message)));
    this.store$.dispatch(new SendLogs());
  }

  appInitializedLog() {
    this.store$.dispatch(new SaveLog(
      this.logHelper.createLog(
        LogType.INFO,
        'App has MDM provided config and is ready to proceed with authentication',
        'App has initialised',
      ),
    ));
  }

  async initialisePersistentStorage(): Promise<void> {
    if (this.platform.is('ios')) {
      try {
        const storage = await this.secureStorage.create('MES');
        this.dataStore.setSecureContainer(storage);

        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  initialiseAppConfig = (): Promise<void> => {
    return this.appConfigProvider.initialiseAppConfig();
  }

  initialiseAuthentication = (): void => {
    this.authenticationProvider.initialiseAuthentication();
    this.authenticationProvider.determineAuthenticationMode();
  }

  validateDeviceType = (): void => {
    const validDevice = this.deviceProvider.validDeviceType();
    if (!validDevice) {
      this.deviceTypeError = DeviceError.UNSUPPORTED_DEVICE;
      this.hasDeviceTypeError = true;
      this.analytics.logException(`${this.deviceTypeError}-${this.deviceProvider.getDeviceType()}`, true);
    } else {
      this.navController.setRoot(DASHBOARD_PAGE);
    }
  }

  isInternetConnectionError = (): boolean => {
    return !this.hasUserLoggedOut && this.appInitError === AuthenticationError.NO_INTERNET;
  }

  isUserCancelledError = (): boolean => {
    return !this.hasUserLoggedOut && this.appInitError === AuthenticationError.USER_CANCELLED;
  }

  isUnknownError = (): boolean => {
    return !this.hasUserLoggedOut &&
      this.appInitError &&
      this.appInitError.valueOf() !== AuthenticationError.USER_CANCELLED &&
      this.appInitError.valueOf() !== AuthenticationError.NO_INTERNET &&
      this.appInitError.valueOf() !== AuthenticationError.USER_NOT_AUTHORISED &&
      this.appInitError.valueOf() !== AppConfigError.INVALID_APP_VERSION;
  }

  isUserNotAuthorised = (): boolean => {
    return !this.hasUserLoggedOut && this.appInitError === AuthenticationError.USER_NOT_AUTHORISED;
  }

  isInvalidAppVersionError = (): boolean => {
    return !this.hasUserLoggedOut && this.appInitError === AppConfigError.INVALID_APP_VERSION;

  }

  showErrorDetails() {
    const alert = this.alertCtrl.create({
      title: 'Error details',
      subTitle: JSON.stringify(this.appInitError),
      buttons: ['OK'],
    });
    alert.present();
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
