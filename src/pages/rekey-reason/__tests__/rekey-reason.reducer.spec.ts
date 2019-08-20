import { initialState, rekeyReasonReducer } from '../rekey-reason.reducer';
import {
  SendCurrentTest,
  SendCurrentTestSuccess,
  SendCurrentTestFailure,
} from './../../../modules/tests/tests.actions';

describe('Rekey Reason Reducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = rekeyReasonReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[TestsEffects] Send Current Test', () => {
    it('should toggle uploading state', () => {
      const action = new SendCurrentTest();
      const result = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isUploading: true,
        hasUploadSucceeded: false,
        hasUploadFailed: false,
      });
    });
  });

  describe('[Tests] Send Test Success', () => {
    it('should toggle has upload succeeded state', () => {
      const action = new SendCurrentTestSuccess('1');
      const result = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isUploading: false,
        hasUploadSucceeded: true,
        hasUploadFailed: false,
      });
    });
  });

  describe('[Tests] Send Test Failure', () => {
    it('should toggle has upload failed state', () => {
      const action = new SendCurrentTestFailure('1');
      const result = rekeyReasonReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isUploading: false,
        hasUploadSucceeded: false,
        hasUploadFailed: true,
      });
    });
  });

});
