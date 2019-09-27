import  * as rekeyActions from '../rekey/rekey.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: boolean = false;

export const rekeyReducer = (
  state = initialState,
  action: rekeyActions.Types,
): boolean => {
  switch (action.type) {
    case rekeyActions.MARK_AS_REKEY:
      return true;
    case rekeyActions.MARK_AS_NON_REKEY:
      return false;
    default:
      return state;
  }
};

export const getRekeyIndicator = createFeatureSelector<boolean>('rekey');
