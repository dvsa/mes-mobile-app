import { SafetyAndBalanceQuestions } from '@dvsa/mes-test-schema/categories/AM2';
import * as vehicleChecksCatAMod2ActionTypes from './safety-and-balance.cat-a-mod2.actions';

import { NUMBER_OF_SAFETY_QUESTIONS as numberOfSafetyQuestions }
  from '../../../../../shared/constants/safety-questions.cat-a-mod2.constants';
import { NUMBER_OF_BALANCE_QUESTIONS as numberOfBalanceQuestions }
  from '../../../../../shared/constants/balance-questions.cat-a-mod2.constants';

export const initialState: SafetyAndBalanceQuestions = {
  safetyQuestions: Array(numberOfSafetyQuestions).fill({}),
  balanceQuestions: Array(numberOfBalanceQuestions).fill({}),
};

export function safetyAndBalanceCatAMod2Reducer(
  state: SafetyAndBalanceQuestions = initialState,
  action: vehicleChecksCatAMod2ActionTypes.Types,
): SafetyAndBalanceQuestions {
  switch (action.type) {
    case vehicleChecksCatAMod2ActionTypes.SAFETY_QUESTION_SELECTED:
      return {
        ...state,
        safetyQuestions: state.safetyQuestions.map((item, index) =>
          index === action.index ? action.safetyQuestion : item,
        ),
      };
    case vehicleChecksCatAMod2ActionTypes.SAFETY_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        safetyQuestions: state.safetyQuestions.map((item, index) =>
          index === action.index
            ? {
              ...item,
              outcome: action.safetyQuestionOutcome,
            }
            : item,
        ),
      };
    case vehicleChecksCatAMod2ActionTypes.BALANCE_QUESTION_SELECTED:
      return {
        ...state,
        balanceQuestions: state.balanceQuestions.map((item, index) =>
          index === action.index ? action.balanceQuestion : item,
        ),
      };
    case vehicleChecksCatAMod2ActionTypes.BALANCE_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        balanceQuestions: state.balanceQuestions.map((item, index) =>
          index === action.index
            ? {
              ...item,
              outcome: action.balanceQuestionOutcome,
            }
            : item,
        ),
      };
    case vehicleChecksCatAMod2ActionTypes.ADD_SAFETY_COMMENT:
      return {
        ...state,
        safetyComments: action.comment,
      };
    case vehicleChecksCatAMod2ActionTypes.ADD_BALANCE_COMMENT:
      return {
        ...state,
        balanceComments: action.comment,
      };
    default:
      return state;
  }
}
