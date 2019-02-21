import { airwatchConfigReducer, initialState } from '../airwatch-config.reducer';
import * as airwatchConfigActions from '../airwatch-config.actions';
import { airwatchConfigModelData } from '../__mocks__/airwatch-config.data.mocks';

describe('Airwatch Config Reducer', () => {

  describe('undefined action', () => {
    it('should return the exisiting state', () => {
      const action = { type: 'I_DONT_EXIST' } as any;
      const result = airwatchConfigReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[AppComponent] Load Airwatch Config Success', () => {
    it('should update state', () => {

      const action = new airwatchConfigActions.LoadAirwatchConfigSuccess(airwatchConfigModelData);
      const result = airwatchConfigReducer(initialState, action);

      expect(result.configUrl).toBe(airwatchConfigModelData.configUrl);
      expect(result.authenticationContext).toBe(airwatchConfigModelData.authenticationContext);
      expect(result.resourceUrl).toBe(airwatchConfigModelData.resourceUrl);
      expect(result.clientId).toBe(airwatchConfigModelData.clientId);
      expect(result.redirectUrl).toBe(airwatchConfigModelData.redirectUrl);
      expect(result.logoutUrl).toBe(airwatchConfigModelData.logoutUrl);
      expect(result.employeeIdKey).toBe(airwatchConfigModelData.employeeIdKey);
      expect(result.error).toBeUndefined();
    });
  });

  describe('[AppComponent] Load Airwatch Config Failure', () => {
    it('should update state', () => {
      const error: string = 'Error Doing Stuff';

      const action = new airwatchConfigActions.LoadAirwatchConfigFailure(error);
      const result = airwatchConfigReducer(initialState, action);

      expect(result.configUrl).toBeUndefined();
      expect(result.authenticationContext).toBeUndefined();
      expect(result.resourceUrl).toBeUndefined();
      expect(result.clientId).toBeUndefined();
      expect(result.redirectUrl).toBeUndefined();
      expect(result.logoutUrl).toBeUndefined();
      expect(result.employeeIdKey).toBeUndefined();
      expect(result.error).toBe('Error Doing Stuff');
    });
  });
});
