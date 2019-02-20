import { airwatchConfigReducer, initialState } from '../airwatch-config.reducer';
import * as airwatchConfigActions from '../airwatch-config.actions';
import { AirwatchConfigModel } from '../../../providers/airwatch-config/airwatch-config.model';

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
      const data = {
        configUrl: 'https://example.com/api/v1/config/dev',
      } as AirwatchConfigModel;

      const action = new airwatchConfigActions.LoadAirwatchConfigSuccess(data);
      const result = airwatchConfigReducer(initialState, action);

      expect(result.configUrl).toBe('https://example.com/api/v1/config/dev');
      expect(result.error).toBeUndefined();

    });
  });

  describe('[AppComponent] Load Airwatch Config Failure', () => {
    it('should update state', () => {
      const error: string = 'Error Doing Stuff';

      const action = new airwatchConfigActions.LoadAirwatchConfigFailure(error);
      const result = airwatchConfigReducer(initialState, action);

      expect(result.configUrl).toBeUndefined();
      expect(result.error).toBe('Error Doing Stuff');

    });
  });
});
