
import { vehicleDetailsReducerFactory } from '../vehicle-details-reducer-factory';

import { vehicleDetailsReducer } from '../vehicle-details.reducer';
import { vehicleDetailsReducerCatBE } from '../cat-be/vehicle-details.reducer.cat-be';
import { TestCategories } from '../../../../shared/constants/test-categories';

describe('vehicle details reducer factory', () => {
  it('should create a cat B vehicle details reducer', () => {
    const reducer = vehicleDetailsReducerFactory(TestCategories.B);
    expect(reducer.name).toEqual(vehicleDetailsReducer.name);
  });

  it('should create a cat B+E vehicle details reducer', () => {
    const reducer = vehicleDetailsReducerFactory(TestCategories.BE);
    expect(reducer.name).toEqual(vehicleDetailsReducerCatBE.name);
  });

  it('should create a default (cat B) vehicle details reducer', () => {
    const reducer = vehicleDetailsReducerFactory(null);
    expect(reducer.name).toEqual(vehicleDetailsReducer.name);
  });
});
