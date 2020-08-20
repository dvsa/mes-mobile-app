import { DelegatedRekeyUploadStatusModel } from './delegated-rekey-upload-outcome.model';
import * as testActions from '../../modules/tests/tests.actions';
import * as delegatedRekeyActions from './delegated-rekey-upload-outcome.actions';

export const initialState: DelegatedRekeyUploadStatusModel = {
  uploadStatus: {
    isUploading: false,
    hasUploadSucceeded: false,
    hasUploadFailed: false,
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
          hasUploadFailed: true,
        },
      };
    case delegatedRekeyActions.DELEGATED_REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
        },
      };
    case delegatedRekeyActions.VALIDATE_TRANSFER_DELEGATED_REKEY:
      return {
        ...state,
        uploadStatus: {
          ...initialState.uploadStatus,
          isUploading: true,
        },
      };
    default:
      return state;
  }
}
