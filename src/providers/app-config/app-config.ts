import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge } from 'lodash';

import { AppConfig } from './app-config.model';
import { environment } from '../../environment/environment';
import { EnvironmentFile } from '../../environment/models/environment.model';
import { DataStoreProvider } from '../data-store/data-store';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';

@Injectable()
export class AppConfigProvider {

  environmentFile: EnvironmentFile = environment;

  private appConfig: AppConfig;

  constructor(
    private httpClient: HttpClient,
    public networkState: NetworkStateProvider,
    public dataStore: DataStoreProvider,
    ) {
    this.mapInAppConfig(this.environmentFile);

    if (!this.environmentFile.isRemote) {
      this.mapRemoteConfig(this.environmentFile);
    }
  }

  public getAppConfig = (): AppConfig => this.appConfig;

  public loadRemoteConfig = (): Promise<any> =>
    this.getRemoteData()
      .then(data => this.mapRemoteConfig(data))
      .catch(error => console.log('Error Getting Remote Config', error))

  private getRemoteData = (): Promise<any> =>
    new Promise((resolve, reject) => {
      if (this.networkState.getNetworkState() === ConnectionStatus.ONLINE) {
        this.httpClient.get<any>(this.environmentFile.configUrl)
        .subscribe(
          (data) => {
            console.log(`trying to set CONFIG ${JSON.stringify(data)}`);
            this.dataStore.setItem('CONFIG', JSON.stringify(data));
            console.log('datastore updated');
            resolve(data);
          },
          error => reject(error),
        );
      } else {
        console.log('get offline config');
        this.getOfflineConfig()
        .then(data => resolve(data))
        .catch(error => reject(error));
      }
    })

  private getOfflineConfig = (): Promise<any> =>
    new Promise((resolve, reject) => {
      console.log('getting offline CONFIG');
      this.dataStore.getItem('CONFIG')
      .then((response) => {
        let jsonString: string;
        jsonString = response;
        resolve(JSON.parse(jsonString));
      })
      .catch(error => reject(error));
    })

  private mapInAppConfig = (data: EnvironmentFile) =>
    this.appConfig = merge({}, this.appConfig, {
      configUrl: data.configUrl,
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
      },
      logs: {
        url: data.logs.url,
        autoSendInterval: data.logs.autoSendInterval,
      },
    } as AppConfig)
}
