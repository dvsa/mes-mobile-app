import { Question } from '@dvsa/mes-test-schema/categories/CPC';
import { Action, combineReducers } from '@ngrx/store';
// import { nullReducer } from '../../../../../shared/classes/null.reducer';
import { answerReducer } from '../answer/answer.reducer';
import { questionCodeReducer } from '../question-code/question-code.reducer';
import { scoreReducer } from '../score/score.reducer';
import { subTitleReducer } from '../sub-title/sub-title.reducer';
import { titleReducer } from '../title/title.reducer';
import { additionalItemsReducer } from '../additional-items/additional-items.reducer';

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
  action: Action,
): Required<Question> {
  return combineReducers({
    questionCode: questionCodeReducer,
    title: titleReducer,
    subtitle: subTitleReducer,
    additionalItems: additionalItemsReducer,
    answer1: answerReducer,
    answer2: answerReducer,
    answer3: answerReducer,
    answer4: answerReducer,
    score: scoreReducer,
  })(state as Required<Question>, action);
}

// export function questionReducer(
//   state: Question = null,
//   action: questionActionTypes.Types): Question {
//   switch (action.type) {
//     case questionActionTypes.POPULATE_QUESTION_ONE:
//       return {
//         ...state,
//         questionCode: ''
//       };
//     case questionActionTypes.POPULATE_QUESTION_TWO:
//       return action.payload;
//     default:
//       return state;
//   }
// }

// const getAnswerNumberKey = (questionNumber: number): string => `answer${questionNumber}`;
//
// const getQuestionNumberKey = (questionNumber: number): string => `question${questionNumber}`;
