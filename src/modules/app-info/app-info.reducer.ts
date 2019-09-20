import { createFeatureSelector } from '@ngrx/store';

import { AppInfoModel } from './app-info.model';
import * as appInfoActions from './app-info.actions';

export const initialState: AppInfoModel = {
  versionNumber: 'VERSION_NOT_LOADED',
  employeeId: null,
  employeeName: 'Unknown Name',
};

export function appInfoReducer(state = initialState, action: appInfoActions.Types) {
  switch (action.type) {
    case appInfoActions.LOAD_APP_INFO_SUCCESS:
      return {
        ...state,
        versionNumber: action.versionNumber,
      };
    case appInfoActions.LOAD_APP_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case appInfoActions.LOAD_EMPLOYEE_ID:
      return {
        ...state,
        employeeId: action.employeeId,
      };
    case appInfoActions.SET_DATE_CONFIG_LOADED:
      return {
        ...state,
        dateConfigLoaded: action.refreshDate,
      };
    case appInfoActions.LOAD_EMPLOYEE_NAME_SUCCESS:
      return  {
        ...state,
        employeeName: action.employeeName,
      };
    default:
      return state;
  }
}

export const getAppInfoState = createFeatureSelector<AppInfoModel>('appInfo');
