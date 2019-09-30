
import { TestCategories } from '../../../shared/constants/test-categories';
import { vehicleDetailsReducer } from './vehicle-details.reducer';
import { vehicleDetailsReducerCatBE } from './cat-be/vehicle-details.reducer.cat-be';

export function vehicleDetailsReducerFactory(category: string | null) {
  switch (category) {
    case TestCategories.B:
      return vehicleDetailsReducer;
    case TestCategories.BE:
      console.log('printing out the name', vehicleDetailsReducerCatBE.name);
      return vehicleDetailsReducerCatBE;
    default:
      return vehicleDetailsReducer;
  }
}
