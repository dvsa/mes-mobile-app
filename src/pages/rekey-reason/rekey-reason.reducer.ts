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
    hasStaffNumberFailedValidation: false,
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
    case rekeyReasonActions.REKEY_REASON_VIEW_DID_ENTER:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
        },
      };
    case rekeyReasonActions.VALIDATE_TRANSFER_REKEY:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
          isUploading: true,
        },
      };
    case rekeyReasonActions.VALIDATE_TRANSFER_REKEY_FAILED:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadFailed: !action.staffNumberNotFound,
          hasStaffNumberFailedValidation: action.staffNumberNotFound,
        },
      };
    case rekeyReasonActions.RESET_STAFF_NUMBER_VALIDATION_ERROR:
      return {
        ...state,
        uploadStatus: {
          ...state.uploadStatus,
          hasStaffNumberFailedValidation: false,
        },
      };
    default:
      return state;
  }
}

export const getRekeyReasonState = createFeatureSelector<RekeyReasonModel>('rekeyReason');
