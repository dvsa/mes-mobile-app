import { initialState, rekeyReasonReducer } from '../rekey-reason.reducer';
import {
  SendCurrentTest,
  SendCurrentTestSuccess,
  SendCurrentTestFailure,
} from './../../../modules/tests/tests.actions';
import { RekeyReasonModel } from '../rekey-reason.model';
import { EndRekey } from '../../../modules/tests/rekey/rekey.actions';
import {
  ValidateTransferRekey,
  ValidateTransferRekeyFailed,
  ResetStaffNumberValidationError,
} from '../rekey-reason.actions';

describe('Rekey Reason Reducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result: RekeyReasonModel = rekeyReasonReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[[Rekey Actions] End rekey', () => {
    it('should rexet the state', () => {
      const action = new EndRekey();
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('[TestsEffects] Send Current Test', () => {
    it('should toggle uploading state', () => {
      const action = new SendCurrentTest();
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          isUploading: true,
        },
      });
    });
  });

  describe('[Tests] Send Test Success', () => {
    it('should toggle has upload succeeded state', () => {
      const action = new SendCurrentTestSuccess();
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadSucceeded: true,
        },
      });
    });
  });

  describe('[Tests] Send Test Failure', () => {
    it('should toggle has upload failed state', () => {
      const action = new SendCurrentTestFailure(false);
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadFailed: true,
        },
      });
    });
  });

  describe('[Tests] Send Test Failure', () => {
    it('should toggle has upload failed state and duplicate', () => {
      const action = new SendCurrentTestFailure(true);
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadFailed: true,
          isDuplicate: true,
        },
      });
    });
  });

  describe('[RekeyReasonPage] Validate transfer rekey', () => {
    it('should toggle is uploading status to true', () => {
      const action = new ValidateTransferRekey();
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          isUploading: true,
        },
      });
    });
  });

  describe('[RekeyReasonPage] Validate transfer rekey failed', () => {
    it('should not set upload as failed when staff validation failed', () => {
      const action = new ValidateTransferRekeyFailed(true);
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadFailed: false,
          hasStaffNumberFailedValidation: true,
        },
      });
    });
    it('should set upload as failed when failed staff validation not set', () => {
      const action = new ValidateTransferRekeyFailed(false);
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasUploadFailed: true,
          hasStaffNumberFailedValidation: false,
        },
      });
    });
  });

  describe('[RekeyReasonPage] Reset staff number validation error', () => {
    it('should reset staff validation failed', () => {
      const action = new ResetStaffNumberValidationError();
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          ...initialState.uploadStatus,
          hasStaffNumberFailedValidation: false,
        },
      });
    });
  });

});
