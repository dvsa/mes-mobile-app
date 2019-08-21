import { initialState, rekeyReasonReducer } from '../rekey-reason.reducer';
import {
  SendCurrentTest,
  SendCurrentTestSuccess,
  SendCurrentTestFailure,
} from './../../../modules/tests/tests.actions';
import { RekeyReasonModel } from '../rekey-reason.model';

describe('Rekey Reason Reducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result: RekeyReasonModel = rekeyReasonReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[TestsEffects] Send Current Test', () => {
    it('should toggle uploading state', () => {
      const action = new SendCurrentTest();
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          isUploading: true,
          hasUploadSucceeded: false,
          hasUploadFailed: false,
        },
      });
    });
  });

  describe('[Tests] Send Test Success', () => {
    it('should toggle has upload succeeded state', () => {
      const action = new SendCurrentTestSuccess('1');
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          isUploading: false,
          hasUploadSucceeded: true,
          hasUploadFailed: false,
        },
      });
    });
  });

  describe('[Tests] Send Test Failure', () => {
    it('should toggle has upload failed state', () => {
      const action = new SendCurrentTestFailure('1');
      const result: RekeyReasonModel = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        uploadStatus: {
          isUploading: false,
          hasUploadSucceeded: false,
          hasUploadFailed: true,
        },
      });
    });
  });

});
