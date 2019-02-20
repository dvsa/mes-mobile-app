import { createFeatureSelector } from '@ngrx/store';

import { AppInfoModel } from './app-info.model';
import * as appInfoActions from './app-info.actions';

export const initialState: AppInfoModel = {
  versionNumber: 'z.z.z',
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
    default:
      return state;
  }
}

export const getAppInfoState = createFeatureSelector<AppInfoModel>('appInfo');
