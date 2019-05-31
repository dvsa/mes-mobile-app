import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge } from 'lodash';

import { AppConfig } from './app-config.model';
import { environment } from '../../environment/environment';
import { EnvironmentFile } from '../../environment/models/environment.model';
import { DataStoreProvider } from '../data-store/data-store';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { AppConfigError } from './app-config.constants';
import { AuthenticationError } from './../authentication/authentication.constants';
import { Platform } from 'ionic-angular';

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

  private appConfig: AppConfig;

  constructor(
    private httpClient: HttpClient,
    public networkState: NetworkStateProvider,
    public dataStore: DataStoreProvider,
    public platform: Platform,
  ) { }

  public initialiseAppConfig = (): Promise<void> => {
    try {
      if (this.platform.is('ios')) {
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

  public getAppConfig = (): AppConfig => this.appConfig;

  public loadRemoteConfig = (): Promise<any> =>
    this.getRemoteData()
      .then(data => this.mapRemoteConfig(data))
      .catch((error) => {
        if (error && error.status === 403) {
          return Promise.reject(AuthenticationError.USER_NOT_AUTHORISED);
        }
        return Promise.reject(AppConfigError.UNKNOWN_ERROR);
      })

  public loadManagedConfig = (): void => {

    if (cordova && cordova.plugins.AppConfig) {
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
      }
    }
  }

  private getRemoteData = (): Promise<any> =>
    new Promise((resolve, reject) => {
      if (this.networkState.getNetworkState() === ConnectionStatus.ONLINE) {
        this.httpClient.get<any>(this.environmentFile.configUrl)
          .subscribe(
            (data) => {
              this.dataStore.setItem('CONFIG', JSON.stringify(data));
              resolve(data);
            },
            error => reject(error),
          );
      } else {
        this.getCachedRemoteConfig()
          .then(data => resolve(data))
          .catch(error => reject(error));
      }
    })

  private getCachedRemoteConfig = (): Promise<any> => {
    return this.dataStore.getItem('CONFIG')
      .then(response => JSON.parse(response))
      .catch(error => error);
  }

  private mapInAppConfig = (data: EnvironmentFile) =>
    this.appConfig = merge({}, this.appConfig, {
      configUrl: data.configUrl,
      daysToCacheJournalData: data.daysToCacheJournalData,
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
      journal: {
        journalUrl: data.journal.journalUrl,
        autoRefreshInterval: data.journal.autoRefreshInterval || 15000,
        numberOfDaysToView: data.journal.numberOfDaysToView,
        allowTests: data.journal.allowTests,
        allowedTestCategories: data.journal.allowedTestCategories,
        enableTestReportPracticeMode: data.journal.enableTestReportPracticeMode,
        enableEndToEndPracticeMode: data.journal.enableEndToEndPracticeMode,
        enableLogoutButton: data.journal.enableLogoutButton,
      },
      tests: {
        testSubmissionUrl: data.tests.testSubmissionUrl,
        autoSendInterval: data.tests.autoSendInterval,
      },
      logs: {
        url: data.logs.url,
        autoSendInterval: data.logs.autoSendInterval,
      },
    } as AppConfig)
}
