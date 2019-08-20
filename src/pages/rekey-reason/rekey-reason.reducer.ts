
import * as testActions from './../../modules/tests/tests.actions';
import * as rekeyReasonActions from './rekey-reason.actions';
import { createFeatureSelector } from '@ngrx/store';
import { RekeyReasonModel } from './rekey-reason.model';

export const initialState: RekeyReasonModel = {
  isUploading: false,
  hasUploaded: false,
  hasTriedUploading: false,
};

export function rekeyReasonReducer(state = initialState, action: testActions.Types | rekeyReasonActions.Types) {
  switch (action.type) {
    case testActions.SEND_CURRENT_TEST:
      return {
        ...state,
        isUploading: true,
      };
    case testActions.SEND_CURRENT_TEST_SUCCESS:
      return {
        ...state,
        isUploading: false,
        hasUploaded: true,
      };
    case testActions.SEND_CURRENT_TEST_FAILURE:
      return {
        ...state,
        isUploading: false,
        hasTriedUploading: true,
      };
    case rekeyReasonActions.UPLOAD_REKEY_MODAL_VIEW_WILL_ENTER:
      return {
        ...state,
        isUploading: false,
        hasTriedUploading: false,
      };
    default:
      return state;
  }
}

export const getRekeyReasonState = createFeatureSelector<RekeyReasonModel>('rekeyReason');
