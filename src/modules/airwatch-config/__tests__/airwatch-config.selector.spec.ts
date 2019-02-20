import { AirwatchConfigStateModel } from '../airwatch-config.model';
import { getConfigUrl } from '../airwatch-config.selector';

describe('AirwatchConfig Selector', () => {
  const state : AirwatchConfigStateModel = {
    configUrl: 'https://www.example.com/api/v1/config/dev',
  };

  describe('getConfigUrl', () => {
    it('should return the config url', () => {
      const result = getConfigUrl(state);
      expect(result).toBe(state.configUrl);
    });
  });
});
