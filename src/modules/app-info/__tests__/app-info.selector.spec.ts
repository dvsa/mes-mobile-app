import { AppInfoModel } from '../app-info.model';

import { getVersionNumber } from '../app-info.selector';

describe('AppInfoSelector', () => {

  const state: AppInfoModel = {
    versionNumber: '1.0.0',
  };

  describe('getVersionNumber', () => {
    it('should select version number from state', () => {
      const versionNumber = getVersionNumber(state);
      expect(versionNumber).toBe('1.0.0');
    });
  });

});
