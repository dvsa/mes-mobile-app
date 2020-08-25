import { DelegatedRekeyUploadStatusModel } from './delegated-rekey-upload-outcome.model';
import * as testActions from '../../modules/tests/tests.actions';
import * as delegatedRekeyActions from './delegated-rekey-upload-outcome.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: DelegatedRekeyUploadStatusModel = {
  uploadStatus: {
    isUploading: false,
    hasUploadSucceeded: false,
  },
};

export function delegatedRekeyUploadOutcomeReducer(state = initialState, action:
  testActions.Types | delegatedRekeyActions.Types) {
  switch (action.type) {
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
          hasUploadSucceeded: false,
        },
      };
    default:
      return state;
  }
}

export const getDelegatedRekeyUploadOutcomeState =
  createFeatureSelector<DelegatedRekeyUploadStatusModel>('delegatedRekeyUploadOutcome');
