import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { fromPromise } from 'rxjs/observable/fromPromise';

import { AirwatchConfigModel } from './airwatch-config.model';
import { AppPreferences } from '@ionic-native/app-preferences';

@Injectable()
export class AirwatchConfigProvider {

  constructor(private appPreferences: AppPreferences) {}

  public getAirwatchConfig = (): Observable<AirwatchConfigModel> =>  {
    console.log('[AirWatch] Starting');
    return fromPromise(this.getConfig());
  }

  private getConfig = async(): Promise<AirwatchConfigModel> => {
    console.log('[Airwatch] Attempting to get Config');
    const config = {
      configUrl: await this.appPreferences.fetch('configUrl'),
      authenticationContext: await this.appPreferences.fetch('authenticationContext'),
      resourceUrl: await this.appPreferences.fetch('resourceUrl'),
      clientId: await this.appPreferences.fetch('clientId'),
      redirectUrl: await this.appPreferences.fetch('redirectUrl'),
      logoutUrl: await this.appPreferences.fetch('logoutUrl'),
      employeeIdKey: await this.appPreferences.fetch('employeeIdKey'),
    } as AirwatchConfigModel;
    console.log('[Airwatch] Got Config');
    return config;
  }
}
