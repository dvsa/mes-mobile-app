import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import * as safetyQuestionsCatDActionTypes from './safety-questions.cat-d.action';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

const initialState: CatDUniqueTypes.SafetyQuestions = {
  questions: [
    {
      description: 'Fire Extinguisher',
      outcome: undefined as QuestionOutcome,
    },
    {
      description: 'Emergency exit',
      outcome: undefined as QuestionOutcome,
    },
    {
      description: 'Fuel cutoff',
      outcome: undefined as QuestionOutcome,
    },
  ],
  faultComments: '',
};

export function safetyQuestionsCatDReducer(
  state: CatDUniqueTypes.SafetyQuestions = initialState,
  action: safetyQuestionsCatDActionTypes.Types): CatDUniqueTypes.SafetyQuestions {
  switch (action.type) {
    case safetyQuestionsCatDActionTypes.SAFETY_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        questions: state.questions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.safetyQuestionOutcome,
        } : item),
      };
    case safetyQuestionsCatDActionTypes.ADD_SAFETY_QUESTION_COMMENT:
      return {
        ...state,
        faultComments: action.comment,
      };
    default:
      return state;
  }
}
