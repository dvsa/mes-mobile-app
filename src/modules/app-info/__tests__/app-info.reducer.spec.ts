import { initialState, appInfoReducer } from '../app-info.reducer';

import * as appInfoActions from '../app-info.actions';

describe('App Info Reducer', () => {
  describe('undefined action', () => {
    it('should return the existing state', () => {
      const action = { type: 'NOOP' } as any;
      const result = appInfoReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[AppInfoEffects] Load App Info Success', () => {
    it('should save version number to state', () => {
      const versionNumber = '3.12.7';
      const action = new appInfoActions.LoadAppInfoSuccess(versionNumber);
      const result = appInfoReducer(initialState, action);

      expect(result).toEqual({
        versionNumber,
      });
    });
  });

  describe('[AppInfoEffects] Load App Info Failure', () => {
    it('should save failure reason to state', () => {
      const error = 'cordova_not_available';
      const action = new appInfoActions.LoadAppInfoFailure(error);
      const result = appInfoReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
      });
    });
  });
});
