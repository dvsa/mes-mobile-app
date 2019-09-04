import  * as rekeyDateActions from './rekey-date.actions';
import { createFeatureSelector } from '@ngrx/store';
import { DateTime } from '../../../shared/helpers/date-time';

export const initialState: string = null;

export const rekeyDateReducer = (state = initialState, action: rekeyDateActions.Types) => {
  switch (action.type) {
    case rekeyDateActions.SET_REKEY_DATE:
      return state ? state : new DateTime().format('YYYY-MM-DDTHH:mm:ss');
    default:
      return state;
  }
};

export const getRekeyDate = createFeatureSelector<boolean>('rekeyDate');
