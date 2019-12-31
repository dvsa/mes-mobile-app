import { createFeatureSelector } from '@ngrx/store';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import * as activityCodeActions from './activity-code.actions';

export const initialState: ActivityCode = null;

export function activityCodeReducer(state = initialState, action: activityCodeActions.Types): ActivityCode {
  switch (action.type) {
    case activityCodeActions.SET_ACTIVITY_CODE:
      return action.payload;
    default:
      return state;
  }
}

export const getActivityCode = createFeatureSelector<ActivityCode>('activityCode');
