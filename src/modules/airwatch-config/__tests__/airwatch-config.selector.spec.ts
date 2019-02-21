import { getConfigUrl, getAuthenticationConfig } from '../airwatch-config.selector';
import { airwatchConfigStateModelData } from '../__mocks__/airwatch-config.data.mocks';

describe('AirwatchConfig Selector', () => {

  describe('getConfigUrl', () => {
    it('should return the config url', () => {
      const result = getConfigUrl(airwatchConfigStateModelData);
      expect(result).toBe(airwatchConfigStateModelData.configUrl);
    });
  });
  describe('getAuthenticationConfig', () => {
    it('should return the config required for authentication', () => {
      const result = getAuthenticationConfig(airwatchConfigStateModelData);
      expect(result.context).toBe(airwatchConfigStateModelData.authenticationContext);
      expect(result.resourceUrl).toBe(airwatchConfigStateModelData.resourceUrl);
      expect(result.clientId).toBe(airwatchConfigStateModelData.clientId);
      expect(result.redirectUrl).toBe(airwatchConfigStateModelData.redirectUrl);
      expect(result.logoutUrl).toBe(airwatchConfigStateModelData.logoutUrl);
      expect(result.employeeIdKey).toBe(airwatchConfigStateModelData.employeeIdKey);
    });
  });
});
