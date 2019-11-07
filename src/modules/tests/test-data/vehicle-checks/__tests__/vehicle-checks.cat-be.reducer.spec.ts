// import * as VehicelChecksCatBeActions from '../vehicle-checks.cat-be.action';

import {
  initialState,
  vehicleChecksCatBEReducer,
} from '../vehicle-checks.cat-be.reducer';

describe('Vehicle Checks Cat B+E Reducer', () => {
  it('should return the initial state', () => {
    const result = vehicleChecksCatBEReducer(initialState, null);
    expect(result).toBe(initialState);
  });
});
