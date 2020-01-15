import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import * as vehicleChecksCatCActionTypes from './vehicle-checks.cat-c.action';

import { NUMBER_OF_TELL_ME_QUESTIONS }
  from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS }
  from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational.constants';

export const initialState: CatC1UniqueTypes.VehicleChecks = {
  tellMeQuestions: Array(NUMBER_OF_TELL_ME_QUESTIONS).fill({}),
  showMeQuestions: Array(NUMBER_OF_SHOW_ME_QUESTIONS).fill({}),
};

export function vehicleChecksCatC1Reducer(
  state: CatC1UniqueTypes.VehicleChecks = initialState,
  action: vehicleChecksCatCActionTypes.Types): CatC1UniqueTypes.VehicleChecks {
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
