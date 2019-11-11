import {CatBEUniqueTypes} from '@dvsa/mes-test-schema/categories/BE';
import * as vehicleChecksCatBeActionTypes from './vehicle-checks.cat-be.action';
import {replaceAt} from '../../../../shared/helpers/replace-at';


export const initialState: CatBEUniqueTypes.VehicleChecks = {
  tellMeQuestions: [{}, {}],
  showMeQuestions: [{}, {}, {}],
};

export function vehicleChecksCatBEReducer(
  state: CatBEUniqueTypes.VehicleChecks = initialState,
  action: vehicleChecksCatBeActionTypes.Types): CatBEUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestions: replaceAt(state.showMeQuestions, action.index, action.showMeQuestion),
        };
    case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.showMeQuestionOutcome
        } : item)
      };
    default:
      return state;
  }
}
