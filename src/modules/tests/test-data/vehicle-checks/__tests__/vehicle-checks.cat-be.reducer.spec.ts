
import {
  initialState,
  vehicleChecksCatBEReducer,
} from '../vehicle-checks.cat-be.reducer';

import * as vehicleChecksCatBE from '../vehicle-checks.cat-be.actions';

describe('Vehicle Checks CatBE Reducer', () => {
  it('should return the initial state', () => {
    const result = vehicleChecksCatBEReducer(initialState, new vehicleChecksCatBE.AddShowMeQuestion());
    expect(result).toBe(initialState);
  });
});
