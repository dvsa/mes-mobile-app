import { getAirwatchConfig } from '../airwatch-config.selector';
import { airwatchConfigStateModelData } from '../__mocks__/airwatch-config.data.mocks';

describe('AirwatchConfig Selector', () => {

  describe('getAirwatchConfig', () => {
    it('should return the config from airwatch', () => {
      const result = getAirwatchConfig(airwatchConfigStateModelData);
      expect(result.configUrl).toBe(airwatchConfigStateModelData.configUrl);
      expect(result.authenticationContext).toBe(airwatchConfigStateModelData.authenticationContext);
      expect(result.resourceUrl).toBe(airwatchConfigStateModelData.resourceUrl);
      expect(result.clientId).toBe(airwatchConfigStateModelData.clientId);
      expect(result.redirectUrl).toBe(airwatchConfigStateModelData.redirectUrl);
      expect(result.logoutUrl).toBe(airwatchConfigStateModelData.logoutUrl);
      expect(result.employeeIdKey).toBe(airwatchConfigStateModelData.employeeIdKey);
    });
  });
});
