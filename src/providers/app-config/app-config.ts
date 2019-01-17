import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from './app-config.model';
import { environment } from '../../environment/environment';
import { map } from 'rxjs/operators';
import { EnvironmentFile } from '../../environment/models/environment.model';

@Injectable()
export class AppConfigProvider {

  environmentFile: EnvironmentFile = environment;

  private appConfig: AppConfig;

  constructor(private httpClient: HttpClient) {
    this.refreshConfigSettings();
  }

  public refreshConfigSettings = (): Observable<any> => {
    if (this.environmentFile.isRemote) {
      return this.getRemoteData();
    }
    this.getLocalData();
  }

  public getAppConfig(): AppConfig {
    return this.appConfig;
  }

  private getRemoteData = (): Observable<any> => {
    return this.httpClient.get<any>(this.environmentFile.remoteSettingsUrl)
      .pipe(
        map((res) => {
          this.mapConfig(res.body.data);
        })
      );
  }

  private getLocalData = () => {
    this.mapConfig(this.environmentFile);
  }

  private mapConfig = (data: any) => {
    this.appConfig = {
      googleAnalyticsId: data.googleAnalyticsId,
      userIdDimensionIndex: data.userIdDimensionIndex,
      authentication: {
        context: data.authentication.context,
        redirectUrl: data.authentication.redirectUrl,
        resourceUrl: data.authentication.resourceUrl,
        clientId: data.authentication.clientId,
        logoutUrl: data.authentication.logoutUrl,
        openIdConnectUrl: data.authentication.openIdConnectUrl,
        identityPoolId: data.authentication.identityPoolId,
        employeeIdKey: data.authentication.employeeIdKey
      },
      aws: {
        region: data.aws.region,
      },
      journal: {
        journalUrl: data.journal.journalUrl,
        backgroundRefreshTime: data.journal.backgroundRefreshTime
      }
    }
  }
}
