import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AppConfig } from './app-config.model';
import { EnviromentFile } from '../../environment/models/environment.model';
import { environment } from '../../environment/environment';

@Injectable()
export class AppConfigProvider {

  environmentFile: EnviromentFile = environment;

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
    return this.httpClient.get<any>(this.environmentFile.remoteSettingsUrl).map((res) => {
      this.appConfig = {
        googleAnalyticsId: res.body.data.googleAnalyticsId,
        userIdDimensionIndex: res.body.data.userIdDimensionIndex,
        authentication: {
          context: res.body.data.authentication.context ,
          redirectUrl:  res.body.data.authentication.redirectUrl,
          resourceUrl: res.body.data.authentication.resourceUrl,
          clientId: res.body.data.authentication.clientId,
        },
      }
      return;
    });
  }

  private getLocalData = () => {
    this.appConfig = {
      googleAnalyticsId: this.environmentFile.googleAnalyticsId,
      userIdDimensionIndex: this.environmentFile.userIdDimensionIndex,
      authentication: {
        context: this.environmentFile.authentication.context,
        redirectUrl: this.environmentFile.authentication.redirectUrl,
        resourceUrl: this.environmentFile.authentication.resourceUrl,
        clientId: this.environmentFile.authentication.clientId,
      },
    }
  }
}
