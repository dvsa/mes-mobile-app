import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import * as vehicleChecksCatBeActionTypes from './vehicle-checks.cat-c.action';
import {
  NUMBER_OF_TELL_ME_QUESTIONS as numberOfTellMeQuestions,
}
  from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS as numberOfShowMeQuestions,
}
  from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';

export const initialState: CatBEUniqueTypes.VehicleChecks = {
  tellMeQuestions: Array(numberOfTellMeQuestions).fill({}),
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
    case vehicleChecksCatBeActionTypes.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map(
          (item, index) => index === action.index ? action.tellMeQuestion : item,
        ),
      };
    case vehicleChecksCatBeActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.tellMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatBeActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };    default:
      return state;
  }
}
