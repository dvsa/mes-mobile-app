import { AppInfoModel } from '../app-info.model';

import { getVersionNumber, getEmployeeName } from '../app-info.selector';

describe('AppInfoSelector', () => {

  const state: AppInfoModel = {
    versionNumber: '1.0.0',
    employeeId: '1234567',
    employeeName: 'Fake Name',
  };

  describe('getVersionNumber', () => {
    it('should select version number from state', () => {
      const versionNumber = getVersionNumber(state);
      expect(versionNumber).toBe('1.0.0');
    });
  });

  describe('getEmployeeName', () => {
    it('should select the employee name from state', () => {
      const employeeName = getEmployeeName(state);
      expect(employeeName).toBe('Fake Name');
    });
  });

});
