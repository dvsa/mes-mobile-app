import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge } from 'lodash';

import { AppConfig } from './app-config.model';
import { environment } from '../../environment/environment';
import { EnvironmentFile } from '../../environment/models/environment.model';

@Injectable()
export class AppConfigProvider {

  environmentFile: EnvironmentFile = environment;

  private appConfig: AppConfig;

  constructor(private httpClient: HttpClient) {
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
      this.httpClient.get<any>(this.environmentFile.configUrl)
        .subscribe(
          data => resolve(data),
          error => reject(error),
        );
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
      journal: {
        journalUrl: data.journal.journalUrl,
        autoRefreshInterval: data.journal.autoRefreshInterval || 15000,
        numberOfDaysToView: data.journal.numberOfDaysToView,
      },
      logging: {
        url: data.logging.url,
        autoSendInterval: data.logging.autoSendInterval,
      },
    } as AppConfig)
}
