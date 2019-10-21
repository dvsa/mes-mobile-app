
import {
  initialState,
  vehicleChecksCatBeReducer,
} from '../vehicle-checks.cat-be.reducer';

describe('Vehicle Checks Cat B+E Reducer', () => {
  it('should return the initial state', () => {
    const result = vehicleChecksCatBeReducer(initialState, { type: 'some-type' });
    expect(result).toBe(initialState);
  });
});
