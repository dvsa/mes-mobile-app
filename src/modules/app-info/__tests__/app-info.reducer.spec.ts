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
        employeeId: null,
        employeeName: 'Unknown Name',
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

  describe('[LoginComponent] Load employee ID', () => {
    it('should save employeeId to state', () => {
      const employeeId = '6543632';
      const action = new appInfoActions.LoadEmployeeId(employeeId);
      const result = appInfoReducer(initialState, action);

      expect(result).toEqual({
        versionNumber: 'VERSION_NOT_LOADED',
        employeeId: '6543632',
        employeeName: 'Unknown Name',
      });
    });
  });

  describe('[LoginComponent] Load employee name success', () => {
    it('should save employeeNmae to state', () => {
      const employeeName = 'Fake Name';
      const action = new appInfoActions.LoadEmployeeNameSuccess(employeeName);
      const result = appInfoReducer(initialState, action);

      expect(result).toEqual({
        versionNumber: 'VERSION_NOT_LOADED',
        employeeId: null,
        employeeName: 'Fake Name',
      });
    });
  });
});
