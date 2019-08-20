import * as testActions from './../../modules/tests/tests.actions';
import * as rekeyReasonActions from './rekey-reason.actions';
import { createFeatureSelector } from '@ngrx/store';
import { RekeyReasonModel } from './rekey-reason.model';

export const initialState: RekeyReasonModel = {
  isUploading: false,
  hasUploadSucceeded: false,
  hasUploadFailed: false,
};

export function rekeyReasonReducer(state = initialState, action: testActions.Types | rekeyReasonActions.Types) {
  switch (action.type) {
    case testActions.SEND_CURRENT_TEST:
      return {
        ...state,
        isUploading: true,
        hasUploadSucceeded: false,
        hasUploadFailed: false,
      };
    case testActions.SEND_CURRENT_TEST_SUCCESS:
      return {
        ...state,
        isUploading: false,
        hasUploadSucceeded: true,
        hasUploadFailed: false,
      };
    case testActions.SEND_CURRENT_TEST_FAILURE:
      return {
        ...state,
        isUploading: false,
        hasUploadSucceeded: false,
        hasUploadFailed: true,
      };
    default:
      return state;
  }
}

export const getRekeyReasonState = createFeatureSelector<RekeyReasonModel>('rekeyReason');
