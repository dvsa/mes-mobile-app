import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AppConfig } from './app-config.model';
import { EnviromentFile } from '../../environment/models/environment.model';
import { environment } from '../../environment/environment.dev';

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
      }
      return;
    });
  }

  private getLocalData = () => {
    this.appConfig = {
      googleAnalyticsId: this.environmentFile.googleAnalyticsId,
      userIdDimensionIndex: this.environmentFile.userIdDimensionIndex,
    }
  }
}
