
import {
  initialState,
  vehicleChecksCatBEReducer,
} from '../vehicle-checks.cat-be.reducer';

describe('Vehicle Checks CatBE Reducer', () => {
  it('should return the initial state', () => {
    const result = vehicleChecksCatBEReducer(initialState, { type: 'some-type' });
    expect(result).toBe(initialState);
  });
});
