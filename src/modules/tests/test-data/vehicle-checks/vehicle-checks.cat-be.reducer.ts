import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import * as vehicleChecksCatBeActionTypes from './vehicle-checks.cat-be.action';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS as numberOfShowMeQuestions,
}
  from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';

export const initialState: CatBEUniqueTypes.VehicleChecks = {
  tellMeQuestions: [{}, {}],
  showMeQuestions: Array(numberOfShowMeQuestions).fill({}),
};

export function vehicleChecksCatBEReducer(
  state: CatBEUniqueTypes.VehicleChecks = initialState,
  action: vehicleChecksCatBeActionTypes.Types): CatBEUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map(
          (item, index) => index === action.index ? action.showMeQuestion : item,
        ),
      };
    case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.showMeQuestionOutcome,
        } : item),
      };
    default:
      return state;
  }
}
