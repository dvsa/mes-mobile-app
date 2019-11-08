import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import * as vehicleChecksCatBeActionTypes from './vehicle-checks.cat-be.action';
import {
  NUMBER_OF_TELL_ME_QUESTIONS as numberOfTellMeQuestions,
}
  from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS as numberOfShowMeQuestions,
}
  from '../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';

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
        ...initialState,
        showMeQuestions: setQuestionResult(initialState.showMeQuestions, action.index, action.showMeQuestion),
      };
    case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
<<<<<<< HEAD
      return {
        ...initialState,
        // showMeQuestions: setQuestionOutcome(initialState.showMeQuestions, action.index, action.showMeQuestionOutcome),
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
=======
      // return {
      //   ...initialState,
      //   // showMeQuestions: setQuestionOutcome(initialState.showMeQuestions, action.index, action.showMeQuestionOutcome),
      // };
>>>>>>> debugging
    default:
      return state;
  }
}

function setQuestionResult(questions: QuestionResult[], index: number, outcome: QuestionResult) {
  console.log(`show me question at index[${index}] is now:- ${JSON.stringify(outcome)}`);
  questions[index] = outcome;
  return questions;
}

// function setQuestionOutcome(questions: QuestionResult[], index: 0|1|2, outcome: QuestionResult) {
//   questions[index] = outcome
//   return questions
// }