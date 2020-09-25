import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { merge, get } from 'lodash';

import { AppConfig } from './app-config.model';
import { environment } from '../../environment/environment';
import { EnvironmentFile } from '../../environment/models/environment.model';
import { DataStoreProvider } from '../data-store/data-store';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { AppConfigError } from './app-config.constants';
import { AuthenticationError } from './../authentication/authentication.constants';
import { Platform } from 'ionic-angular';
import { timeout } from 'rxjs/operators';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { StoreModel } from '../../shared/models/store.model';
import { Store } from '@ngrx/store';
import { LogHelper } from '../logs/logsHelper';
import { AppInfoProvider } from '../app-info/app-info';
import { SchemaValidatorProvider } from '../schema-validator/schema-validator';
import { ValidationResult, ValidationError } from '@hapi/joi';

declare let cordova: any;

/**
 *  How Loading Config Works
 *
 *  IOS Devices
 *
 *  If the device is IOS it will attempt to create a Environment file in from configuration provided from MDM
 *  using loadManagedConfig().
 *
 *  If this fails then it will use the Enviroment configuration
 *  provided by the enviroment file at ../../enviroment/enviroment which is required for the app to build
 *
 *  In the Login page for an IOS device the App Config initialiseAppConfig() is ran
 *  followed by loadRemoteConfig() which makes an api call to the configuration microservice
 *  and then calls mapRemoteConfig()
 *
 *  If loading the remote config fails we fall back to getCachedRemoteConfig() which should load
 *  the configuration from a previous run of the app from the on device database.
 *
 *  Non IOS Devices
 *
 *  Non ios devcies will always use the enviroment file at ../../enviroment/enviroment
 *
 *  In the Login page for a non IOS device initialiseAppConfig() is run which also calls mapRemoteConfig() to
 *  load more config from the enviroment file.
 *
 *  As on non-IOS devices we can't authenticate with AWS so the enviroment file should always have the setting
 *  isRemote set to false
 */

@Injectable()
export class AppConfigProvider {

  environmentFile: EnvironmentFile = environment;
  isDebugMode: boolean = false;

  private appConfig: AppConfig;

  constructor(
    private httpClient: HttpClient,
    public networkState: NetworkStateProvider,
    public dataStore: DataStoreProvider,
    public platform: Platform,
    private store$: Store<StoreModel>,
    private logHelper: LogHelper,
    private appInfoProvider: AppInfoProvider,
    private schemaValidatorProvider: SchemaValidatorProvider,
  ) { }

  public initialiseAppConfig = async (): Promise<void> => {
    try {
      if (this.platform.is('ios')) {
        await this.getDebugMode();
        this.loadManagedConfig();
      }
      this.mapInAppConfig(this.environmentFile);

      if (!this.environmentFile.isRemote) {
        this.mapRemoteConfig(this.environmentFile);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(AppConfigError.MDM_ERROR);
    }
  }

  public getAppConfig = (): AppConfig => {
    if (!this.appConfig) {
      this.initialiseAppConfig();
    }

    return this.appConfig;
  }

  public loadRemoteConfig = (): Promise<any> =>
    this.getRemoteData()
      .then((data: any) => {
        const result: ValidationResult<any> = this.schemaValidatorProvider.validateRemoteConfig(data);

        if (result.error !== null) {
          return Promise.reject(result.error);
        }

        return data;
      })
      .then(data => this.mapRemoteConfig(data))
      .catch((error: HttpErrorResponse | ValidationError) => {
        if (error instanceof HttpErrorResponse) {
          this.store$.dispatch(new SaveLog(
            this.logHelper.createLog(LogType.ERROR, 'Loading remote config', error.message)),
          );
          if (error && error.status === 403) {
            return Promise.reject(AuthenticationError.USER_NOT_AUTHORISED);
          }
          if (error && error.error === AppConfigError.INVALID_APP_VERSION) {
            return Promise.reject(AppConfigError.INVALID_APP_VERSION);
          }
          return Promise.reject(AppConfigError.UNKNOWN_ERROR);
        }

        this.store$.dispatch(new SaveLog(
          this.logHelper.createLog(LogType.ERROR, 'Validating remote config', error.details[0].message)),
        );
        return Promise.reject(AppConfigError.VALIDATION_ERROR);
      })

  public loadManagedConfig = (): void => {

    if (get(cordova, 'plugins.AppConfig', false)) {
      const appConfigPlugin = cordova.plugins.AppConfig;

      const newEnvFile = {
        configUrl: appConfigPlugin.getValue('configUrl'),
        daysToCacheJournalData: appConfigPlugin.getValue('daysToCacheJournalData'),
        daysToCacheLogs: appConfigPlugin.getValue('daysToCacheLogs'),
        isRemote: true,
        logsPostApiKey: appConfigPlugin.getValue('logsPostApiKey'),
        logsApiUrl: appConfigPlugin.getValue('logsApiUrl'),
        logsAutoSendInterval: appConfigPlugin.getValue('logsAutoSendInterval'),
        authentication: {
          clientId: appConfigPlugin.getValue('clientId'),
          context: appConfigPlugin.getValue('authenticationContext'),
          employeeIdKey: appConfigPlugin.getValue('employeeIdKey'),
          logoutUrl: appConfigPlugin.getValue('logoutUrl'),
          redirectUrl: appConfigPlugin.getValue('redirectUrl'),
          resourceUrl: appConfigPlugin.getValue('resourceUrl'),
        },
      } as EnvironmentFile;

      // Check to see if we have any config
      if (newEnvFile.configUrl) {
        this.environmentFile = newEnvFile;
        return;
      }

      if (!this.isDebugMode) {
        throw AppConfigError.MISSING_REMOTE_CONFIG_URL_ERROR;
      }
    }
  }

  private getRemoteData = (): Promise<any> =>
    new Promise((resolve, reject) => {
      if (this.networkState.getNetworkState() === ConnectionStatus.ONLINE) {
        this.appInfoProvider.getMajorAndMinorVersionNumber()
        .then((version:string) => {
          const url = `${this.environmentFile.configUrl}?app_version=${version}`;
          this.httpClient.get<any>(url)
            .pipe(timeout(30000))
            .subscribe(
              (data) => {
                this.dataStore.setItem('CONFIG', JSON.stringify(data));
                resolve(data);
              },
              (error: HttpErrorResponse) => {
                if (this.shouldGetCachedConfig(error.error)) {
                  this.logError('Getting remote config failed, using cached data', error.error);
                  this.getCachedRemoteConfig()
                    .then(data => resolve(data))
                    .catch(error => reject(error));
                } else {
                  this.logError('Getting remote config failed, not using cached data', error.error);
                  reject(error);
                }
              },
          );
        });
      } else {
        this.getCachedRemoteConfig()
          .then(data => resolve(data))
          .catch(error => reject(error));
      }
    })

  private shouldGetCachedConfig = (errorMessage: string): boolean =>
    errorMessage  !== AuthenticationError.USER_NOT_AUTHORISED &&
    errorMessage !== AppConfigError.INVALID_APP_VERSION

  private logError = (description: string, error: string): void =>
    this.store$.dispatch(new SaveLog(this.logHelper.createLog(LogType.ERROR, description, error)))

  private getCachedRemoteConfig = (): Promise<any> => {
    return this.dataStore.getItem('CONFIG')
      .then(response => JSON.parse(response))
      .catch(error => error);
  }

  private mapInAppConfig = (data: EnvironmentFile) =>
    this.appConfig = merge({}, this.appConfig, {
      configUrl: data.configUrl,
      daysToCacheLogs: data.daysToCacheLogs,
      logoutClearsTestPersistence: data.logoutClearsTestPersistence,
      logsPostApiKey: data.logsPostApiKey,
      logsApiUrl: data.logsApiUrl,
      logsAutoSendInterval: data.logsAutoSendInterval,
      authentication: {
        context: data.authentication.context,
        redirectUrl: data.authentication.redirectUrl,
        resourceUrl: data.authentication.resourceUrl,
        clientId: data.authentication.clientId,
        logoutUrl: data.authentication.logoutUrl,
        employeeIdKey: data.authentication.employeeIdKey,
      },
    } as AppConfig)

  private mapRemoteConfig = (data: any) =>
    this.appConfig = merge({}, this.appConfig, {
      googleAnalyticsId: data.googleAnalyticsId,
      approvedDeviceIdentifiers: data.approvedDeviceIdentifiers,
      timeTravelDate: data.timeTravelDate,
      role: data.role,
      authentication: {
        employeeNameKey: data.employeeNameKey,
      },
      journal: {
        journalUrl: data.journal.journalUrl,
        searchBookingUrl: data.journal.searchBookingUrl,
        delegatedExaminerSearchBookingUrl: data.journal.delegatedExaminerSearchBookingUrl,
        autoRefreshInterval: data.journal.autoRefreshInterval || 15000,
        numberOfDaysToView: data.journal.numberOfDaysToView,
        daysToCacheJournalData: data.journal.daysToCacheJournalData,
        allowTests: data.journal.allowTests,
        allowedTestCategories: data.journal.allowedTestCategories,
        enableTestReportPracticeMode: data.journal.enableTestReportPracticeMode,
        enableEndToEndPracticeMode: data.journal.enableEndToEndPracticeMode,
        enableLogoutButton: data.journal.enableLogoutButton,
        testPermissionPeriods: data.journal.testPermissionPeriods,
      },
      tests: {
        testSubmissionUrl: data.tests.testSubmissionUrl,
        autoSendInterval: data.tests.autoSendInterval,
      },
      user: {
        findUserUrl: data.user.findUserUrl,
      },
      requestTimeout: data.requestTimeout,
    } as AppConfig)

  getDebugMode = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (get(cordova, 'plugins.IsDebug', false)) {
        cordova.plugins.IsDebug.getIsDebug((isDebug: boolean) => {
          this.isDebugMode = isDebug;
          console.log('Detected that app is running in debug mode');
          resolve();
        }, (err: any) => {
          reject();
        });
      } else {
        resolve();
      }
    });
  }
}
