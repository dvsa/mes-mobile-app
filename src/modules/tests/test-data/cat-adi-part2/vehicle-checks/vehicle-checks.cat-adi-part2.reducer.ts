import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import * as vehicleChecksCatADI2ActionTypes from './vehicle-checks.cat-adi-part2.action';
import {
  NUMBER_OF_TELL_ME_QUESTIONS as numberOfTellMeQuestions,
}
from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-adi-part2.constants';

export const initialState: CatADI2UniqueTypes.VehicleChecks = {
  tellMeQuestions: Array(numberOfTellMeQuestions).fill({}),
};

export function vehicleChecksCatADI2Reducer(
  state: CatADI2UniqueTypes.VehicleChecks = initialState,
  action: vehicleChecksCatADI2ActionTypes.Types): CatADI2UniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatADI2ActionTypes.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map(
          (item, index) => index === action.index ? action.tellMeQuestion : item,
        ),
      };
    case vehicleChecksCatADI2ActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.tellMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatADI2ActionTypes.ADD_TELL_ME_COMMENT:
      return {
        ...state,
        tellMeComments: action.comment,
      };    default:
      return state;
  }
}