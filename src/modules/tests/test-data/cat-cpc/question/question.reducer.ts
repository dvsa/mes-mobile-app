import { Question } from '@dvsa/mes-test-schema/categories/CPC';
import * as questionActionTypes from './question.action';

const initialState: Question = {
  questionCode: null,
  title: null,
  subtitle: null,
  additionalItems: [],
  answer1: null,
  answer2: null,
  answer3: null,
  answer4: null,
  score: null,
};

export function questionReducer(
  state: Question = initialState,
  action: questionActionTypes.Types): Question {
  switch (action.type) {
    case questionActionTypes.POPULATE_ANSWER:
      return {
        ...state,
        [getAnswerNumberKey(action.questionNumber)]: action.payload,
      };
    case questionActionTypes.POPULATE_ANSWER_SCORE:
      return {
        ...state,
        score: action.score,
      };
    case questionActionTypes.POPULATE_QUESTION_CODE:
      return {
        ...state,
        questionCode: action.code,
      };
    case questionActionTypes.POPULATE_QUESTION_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case questionActionTypes.POPULATE_QUESTION_SUB_TITLE:
      return {
        ...state,
        subtitle: action.subtitle,
      };
    case questionActionTypes.POPULATE_QUESTION_ADDITIONAL_ITEMS:
      return {
        ...state,
        additionalItems: action.additionalItems,
      };
    default:
      return state;
  }
}

const getAnswerNumberKey = (questionNumber: number): string => `answer${questionNumber}`;
