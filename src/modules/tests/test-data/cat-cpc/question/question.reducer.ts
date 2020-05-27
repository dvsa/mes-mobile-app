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

enum QuestionNumber {
  ONE = 0,
  TWO = 1,
  THREE = 2,
  FOUR = 3,
}

export function question1Reducer(
  state: Question = initialState,
  action: questionActionTypes.Types): Question {
  return questionReducer(state, action, QuestionNumber.ONE);
}

export function question2Reducer(
  state: Question = initialState,
  action: questionActionTypes.Types): Question {
  return questionReducer(state, action, QuestionNumber.TWO);
}

export function question3Reducer(
  state: Question = initialState,
  action: questionActionTypes.Types): Question {
  return questionReducer(state, action, QuestionNumber.THREE);
}

export function question4Reducer(
  state: Question = initialState,
  action: questionActionTypes.Types): Question {
  return questionReducer(state, action, QuestionNumber.FOUR);
}

export const questionReducer = (
  state: Question = initialState,
  action: questionActionTypes.Types,
  questionNumber?: number,
): Question => {
  switch (action.type) {
    case questionActionTypes.POPULATE_QUESTION:
      return action.payload[questionNumber];
    case questionActionTypes.ANSWER_TOGGLED:
      return {
        ...state,
        [getAnswerNumberKey(action.answerNumber)]: {
          label: action.payload.label,
          selected: !action.payload.selected,
        },
      };
    case questionActionTypes.POPULATE_ANSWER_SCORE:
      return {
        ...state,
        score: action.score,
      };
    default:
      return state;
  }
};

const getAnswerNumberKey = (questionNumber: number): string => `answer${questionNumber}`;
