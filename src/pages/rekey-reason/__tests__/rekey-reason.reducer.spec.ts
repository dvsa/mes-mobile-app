import { initialState, rekeyReasonReducer } from '../rekey-reason.reducer';
import {
  SendCurrentTest,
  SendCurrentTestSuccess,
  SendCurrentTestFailure,
} from './../../../modules/tests/tests.actions';
import { RekeyReasonModel } from '../rekey-reason.model';
import { EndRekey } from '../../../modules/tests/rekey/rekey.actions';

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

});
