import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { fromPromise } from 'rxjs/observable/fromPromise';

import { AirwatchConfigModel } from './airwatch-config.model';
import { AppPreferences } from '@ionic-native/app-preferences';

@Injectable()
export class AirwatchConfigProvider {

  constructor(private appPreferences: AppPreferences) {}

  public getAirwatchConfig = (): Observable<AirwatchConfigModel> =>  {
    return fromPromise(this.getConfig());
  }

  private getConfig = async(): Promise<AirwatchConfigModel> => {
    return {
      configUrl: await this.appPreferences.fetch('configUrl'),
      authenticationContext: await this.appPreferences.fetch('authenticationContext'),
      resourceUrl: await this.appPreferences.fetch('resourceUrl'),
      clientId: await this.appPreferences.fetch('clientId'),
      redirectUrl: await this.appPreferences.fetch('redirectUrl'),
      logoutUrl: await this.appPreferences.fetch('logoutUrl'),
      employeeIdKey: await this.appPreferences.fetch('employeeIdKey'),
    } as AirwatchConfigModel;
  }
}
