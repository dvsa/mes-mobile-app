
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import * as vehicleChecksCatBeActionTypes from './vehicle-checks.cat-be.action';

export const initialState: CatBEUniqueTypes.VehicleChecks = {
  tellMeQuestions: [],
  showMeQuestions: [],
};

export function vehicleChecksCatBEReducer(
  state: CatBEUniqueTypes.VehicleChecks = initialState, action: vehicleChecksCatBeActionTypes.VehicleChecksCatBeActionTypes) : CatBEUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...initialState,
        showMeQuestions: [
          action.showMeQuestion,
        ],
      };
    case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
      initialState.showMeQuestions[0].outcome = action.showMeQuestionOutcome;
      return initialState;
    default:
      return state;
  }
}
