import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import * as vehicleChecksCatCActionTypes from './vehicle-checks.cat-c.action';

import { NUMBER_OF_TELL_ME_QUESTIONS }
  from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS }
  from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational-trailer.constants';

export const initialState: CatC1EUniqueTypes.VehicleChecks = {
  tellMeQuestions: Array(NUMBER_OF_TELL_ME_QUESTIONS).fill({}),
  showMeQuestions: Array(NUMBER_OF_SHOW_ME_QUESTIONS).fill({}),
};

export function vehicleChecksCatC1EReducer(
  state: CatC1EUniqueTypes.VehicleChecks = initialState,
  action: vehicleChecksCatCActionTypes.Types): CatC1EUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatCActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map(
          (item, index) => index === action.index ? action.showMeQuestion : item,
        ),
      };
    case vehicleChecksCatCActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.showMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatCActionTypes.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map(
          (item, index) => index === action.index ? action.tellMeQuestion : item,
        ),
      };
    case vehicleChecksCatCActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.tellMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatCActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };    default:
      return state;
  }
}
