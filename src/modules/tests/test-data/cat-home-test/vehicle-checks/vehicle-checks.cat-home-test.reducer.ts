
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';

import * as vehicleChecksCatHomeTestActionTypes from './vehicle-checks.cat-home-test.action';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS,
} from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-home-test.constants';
import {
  NUMBER_OF_TELL_ME_QUESTIONS,
} from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-home-test.constants';

export type VehicleChecksUnion =
  | CatFUniqueTypes.VehicleChecks
  | CatGUniqueTypes.VehicleChecks
  | CatHUniqueTypes.VehicleChecks
  | CatKUniqueTypes.VehicleChecks;

export const initialState: CatFUniqueTypes.VehicleChecks = {
  tellMeQuestions: Array(NUMBER_OF_TELL_ME_QUESTIONS).fill({}),
  showMeQuestions: Array(NUMBER_OF_SHOW_ME_QUESTIONS).fill({}),
};
export function vehicleChecksCatHomeTestReducer(
  state: VehicleChecksUnion = initialState,
  action: vehicleChecksCatHomeTestActionTypes.Types): VehicleChecksUnion {
  switch (action.type) {
    case vehicleChecksCatHomeTestActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map(
          (item, index) => index === action.index ? action.showMeQuestion : item,
        ),
      };
    case vehicleChecksCatHomeTestActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.showMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatHomeTestActionTypes.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map(
          (item, index) => index === action.index ? action.tellMeQuestion : item,
        ),
      };
    case vehicleChecksCatHomeTestActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.tellMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatHomeTestActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };
    default:
      return state;
  }
}
