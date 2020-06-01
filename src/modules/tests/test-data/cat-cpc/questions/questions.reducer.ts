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
  questionNumber: QuestionNumber,
): Question | Question5 => {
  switch (action.type) {
    case questionActionTypes.POPULATE_QUESTIONS:
      return action.payload[questionNumber];
    case questionActionTypes.ANSWER_TOGGLED:
      const key: string = getAnswerNumberKey(action.answerNumber);
      return (action.questionNumber === questionNumber) ? {
        ...state,
        [key]: {
          label: state[key].label,
          selected: !state[key].selected,
        },
      } : state;
    case questionActionTypes.POPULATE_ANSWER_SCORE:
      return (action.questionNumber === questionNumber) ? {
        ...state,
        score: action.score,
      } : state;
    default:
      return state;
  }
};

const getAnswerNumberKey = (questionNumber: number): string => `answer${questionNumber}`;
