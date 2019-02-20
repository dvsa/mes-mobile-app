import { Action } from '@ngrx/store';

export const LOAD_AIRWATCH_CONFIG = '[AppComponent] Load Airwatch Config';
export const LOAD_AIRWATCH_CONFIG_SUCCESS = '[AirwatchConfigEffects] Load Airwatch Config Success';
export const LOAD_AIRWATCH_CONFIG_FAILURE = '[AirwatchConfigEffects] Load Airwatch Config Failure';

import { AirwatchConfigModel } from '../../providers/airwatch-config/airwatch-config.model';

export class LoadAirwatchConfig implements Action {
  readonly type = LOAD_AIRWATCH_CONFIG;
}

export class LoadAirwatchConfigSuccess implements Action {
  readonly type = LOAD_AIRWATCH_CONFIG_SUCCESS;
  constructor(public airwatchConfig: AirwatchConfigModel) {}
}

export class LoadAirwatchConfigFailure implements Action {
  readonly type = LOAD_AIRWATCH_CONFIG_FAILURE;
  constructor(public error: any) {}
}

export type Types =
  LoadAirwatchConfig |
  LoadAirwatchConfigSuccess |
  LoadAirwatchConfigFailure;
