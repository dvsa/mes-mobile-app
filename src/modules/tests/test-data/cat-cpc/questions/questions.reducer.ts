import { Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';
import * as questionActionTypes from './questions.action';
import { QuestionNumber } from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

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
const additionalAnswers = {
  answer5: null,
  answer6: null,
  answer7: null,
  answer8: null,
  answer9: null,
  answer10: null,
};
const initialStateQ5: Question5 = {
  ...initialState,
  ...additionalAnswers,
};

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

export function question5Reducer(
  state: Question5 = initialStateQ5,
  action: questionActionTypes.Types): Question5 {
  return questionReducer(state, action, QuestionNumber.FIVE) as Question5;
}

const questionReducer = (
  state: Question = initialState,
  action: questionActionTypes.Types,
  questionNumber: number,
): Question | Question5 => {
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
