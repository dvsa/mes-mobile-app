import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { IEnvironment } from '../../environment/environment.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class AppConfigProvider implements IEnvironment {
  isRemote: boolean;
  googleAnalyticsId: string;
  userIdDimensionIndex: number;
  dynamicAppSettingsUrl: string;

  constructor(private httpClient: HttpClient) {}

  getGoogleAnalyticsKey = (): string => {
    return this.googleAnalyticsId;
  }

  getGoogleAnalyticsUserIdDimension = (): number => {
    return this.userIdDimensionIndex;
  }

  refreshConfigSettings = (): Observable<any> => {
    this.readEnvironments();
    if (this.isRemote) {
      return this.getRemoteData();
    }
  }

  getRemoteData = (): Observable<any> => {
    return this.httpClient.get<any>(this.dynamicAppSettingsUrl).map((res) => {
      this.googleAnalyticsId = res.body.data.googleAnalyticsId;
      this.userIdDimensionIndex = res.body.data.userIdDimensionIndex;
      return;
    });
  }

  readEnvironments = () => {
    this.isRemote = environment.isRemote;
    this.dynamicAppSettingsUrl = environment.remoteSettingsUrl;
    this.googleAnalyticsId = environment.googleAnalyticsId;
    this.userIdDimensionIndex = environment.userIdDimensionIndex;
  }
}
