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
    } as AirwatchConfigModel;
  }
}
