import { createFeatureSelector } from '@ngrx/store';

import { AirwatchConfigStateModel } from './airwatch-config.model';
import * as airwatchConfigActions from './airwatch-config.actions';

const initialState: AirwatchConfigStateModel = {
   configUrl: undefined,
  error: undefined,
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
  }
}

export const getAirwatchConfigState = createFeatureSelector<AirwatchConfigStateModel>('airwatchConfig');
