
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: VehicleChecks = {
  tellMeQuestions: [],
  showMeQuestion: [],
};

export function vehicleChecksCatBEReducer(
  state: VehicleChecks = initialState, action: Action) : VehicleChecks {
  switch (action.type) {
    default:
      return state;
  }
}
