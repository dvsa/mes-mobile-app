import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import * as vehicleChecksCatBeActionTypes from './vehicle-checks.cat-be.action';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';

export const initialState: CatBEUniqueTypes.VehicleChecks = {
  tellMeQuestions: [],
  showMeQuestions: [],
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
      // return {
      //   ...initialState,
      //   // showMeQuestions: setQuestionOutcome(initialState.showMeQuestions, action.index, action.showMeQuestionOutcome),
      // };
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