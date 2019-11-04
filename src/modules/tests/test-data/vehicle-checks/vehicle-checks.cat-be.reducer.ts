
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: CatBEUniqueTypes.VehicleChecks = {
  tellMeQuestions: [],
  showMeQuestions: [],
};

export function vehicleChecksCatBEReducer(
  state: CatBEUniqueTypes.VehicleChecks = initialState, action: Action) : CatBEUniqueTypes.VehicleChecks {
  switch (action.type) {
    default:
      return state;
  }
}
