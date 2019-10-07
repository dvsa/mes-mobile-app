
import { vehicleDetailsReducer } from './vehicle-details.reducer';
import { vehicleDetailsReducerCatBE } from './cat-be/vehicle-details.reducer.cat-be';
import { TestCategory } from '../../../shared/models/test-category';

export function vehicleDetailsReducerFactory(category: string | null) {
  switch (category) {
    case TestCategory.B:
      return vehicleDetailsReducer;
    case TestCategory.BE:
      console.log('printing out the name', vehicleDetailsReducerCatBE.name);
      return vehicleDetailsReducerCatBE;
    default:
      return vehicleDetailsReducer;
  }
}
