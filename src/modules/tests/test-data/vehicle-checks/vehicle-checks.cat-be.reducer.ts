
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/BE';
import * as vehicleChecksCatBEActions from './vehicle-checks.cat-be.actions';

export const initialState: VehicleChecks = {
  tellMeQuestions: [],
  showMeQuestion: [],
};

export function vehicleChecksCatBEReducer(
  state: VehicleChecks = initialState, action: vehicleChecksCatBEActions.Types) : VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatBEActions.ADD_TELL_ME_QUESTION:
      return state;
    case vehicleChecksCatBEActions.ADD_SHOW_ME_QUESTION:
      return state;
    default:
      return state;
  }
}
