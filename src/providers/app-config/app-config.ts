import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { IEnvironment } from '../../environment/environment.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class AppConfigProvider implements IEnvironment {

  /* tslint:disable */
  environmentFile: any;

  private _googleAnalyticsId: string;
  private _userIdDimensionIndex: number;
  /* tslint:enable */

  get googleAnalyticsId(): string { return this._googleAnalyticsId }
  get userIdDimensionIndex(): number { return this._userIdDimensionIndex; }


  constructor(private httpClient: HttpClient) {
    this.environmentFile = environment;
  }

  public refreshConfigSettings = (): Observable<any> => {
    if (this.environmentFile.isRemote) {
      return this.getRemoteData();
    }
    this.getLocalData();
  }

  private getRemoteData = (): Observable<any> => {
    return this.httpClient.get<any>(this.environmentFile.remoteSettingsUrl).map((res) => {
      this._googleAnalyticsId = res.body.data.googleAnalyticsId;
      this._userIdDimensionIndex = res.body.data.userIdDimensionIndex;
      return;
    });
  }

  private getLocalData = () => {
    this._googleAnalyticsId = this.environmentFile.googleAnalyticsId;
    this._userIdDimensionIndex = this.environmentFile.userIdDimensionIndex;
  }
}
