import * as testActions from './../../modules/tests/tests.actions';
import * as rekeyActions from './../../modules/tests/rekey/rekey.actions';
import * as rekeyReasonActions from './rekey-reason.actions';
import { createFeatureSelector } from '@ngrx/store';
import { RekeyReasonModel } from './rekey-reason.model';

export const initialState: RekeyReasonModel = {
  uploadStatus: {
    isUploading: false,
    hasUploadSucceeded: false,
    hasUploadFailed: false,
    isDuplicate: false,
  },
};

export function rekeyReasonReducer(state = initialState, action:
  testActions.Types | rekeyActions.Types | rekeyReasonActions.Types) {
  switch (action.type) {
    case rekeyActions.END_REKEY:
      return {
        ...initialState,
      };
    case testActions.SEND_CURRENT_TEST:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
          isUploading: true,
        },
      };
    case testActions.SEND_CURRENT_TEST_SUCCESS:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadSucceeded: true,
        },
      };
    case testActions.SEND_CURRENT_TEST_FAILURE:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadFailed: true,
          isDuplicate: action.isDuplicateUpload,
        },
      };
    default:
      return state;
  }
}

export const getRekeyReasonState = createFeatureSelector<RekeyReasonModel>('rekeyReason');
