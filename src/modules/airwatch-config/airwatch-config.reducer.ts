import { createFeatureSelector } from '@ngrx/store';

import { AirwatchConfigStateModel } from './airwatch-config.model';
import * as airwatchConfigActions from './airwatch-config.actions';

export const initialState: AirwatchConfigStateModel = {
   configUrl: undefined,
};

export function airwatchConfigReducer(state = initialState, action: airwatchConfigActions.Types) {
  switch (action.type) {
    case airwatchConfigActions.LOAD_AIRWATCH_CONFIG_SUCCESS:
      return {
        ...state,
        configUrl: action.airwatchConfig.configUrl,
      };
    case airwatchConfigActions.LOAD_AIRWATCH_CONFIG_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getAirwatchConfigState = createFeatureSelector<AirwatchConfigStateModel>('airwatchConfig');
