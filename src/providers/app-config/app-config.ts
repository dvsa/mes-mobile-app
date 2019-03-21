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

@Injectable()
export class AppConfigProvider {

  environmentFile: EnvironmentFile = environment;

  private appConfig: AppConfig;

  constructor(
    private httpClient: HttpClient,
    public networkState: NetworkStateProvider,
    public dataStore: DataStoreProvider,
    ) {}

  public initialiseAppConfig = (): void => {
    this.mapInAppConfig(this.environmentFile);

    if (!this.environmentFile.isRemote) {
      this.mapRemoteConfig(this.environmentFile);
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
      journal: {
        journalUrl: data.journal.journalUrl,
        autoRefreshInterval: data.journal.autoRefreshInterval || 15000,
        numberOfDaysToView: data.journal.numberOfDaysToView,
        allowTests: data.journal.allowTests,
        allowedTestCategories: data.journal.allowedTestCategories,
      },
      logs: {
        url: data.logs.url,
        autoSendInterval: data.logs.autoSendInterval,
      },
    } as AppConfig)
}
