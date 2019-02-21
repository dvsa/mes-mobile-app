import { createFeatureSelector } from '@ngrx/store';

import { AirwatchConfigStateModel } from './airwatch-config.model';
import * as airwatchConfigActions from './airwatch-config.actions';

export const initialState: AirwatchConfigStateModel = {
  configUrl: undefined,
  authenticationContext: undefined,
  resourceUrl: undefined,
  clientId: undefined,
  redirectUrl: undefined,
  logoutUrl: undefined,
  employeeIdKey: undefined,
};

export function airwatchConfigReducer(state = initialState, action: airwatchConfigActions.Types) {
  switch (action.type) {
    case airwatchConfigActions.LOAD_AIRWATCH_CONFIG_SUCCESS:
      return {
        ...state,
        configUrl: action.airwatchConfig.configUrl,
        authenticationContext: action.airwatchConfig.authenticationContext,
        resourceUrl: action.airwatchConfig.resourceUrl,
        clientId: action.airwatchConfig.clientId,
        redirectUrl: action.airwatchConfig.redirectUrl,
        logoutUrl: action.airwatchConfig.logoutUrl,
        employeeIdKey: action.airwatchConfig.employeeIdKey,
      } as AirwatchConfigStateModel;
    case airwatchConfigActions.LOAD_AIRWATCH_CONFIG_FAILURE:
      return {
        ...state,
        error: action.error,
      } as AirwatchConfigStateModel;
    default:
      return state;
  }
}

export const getAirwatchConfigState = createFeatureSelector<AirwatchConfigStateModel>('airwatchConfig');
