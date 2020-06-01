import { Action } from '@ngrx/store';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';
import { QuestionNumber } from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

export const POPULATE_QUESTIONS = '[CatCPC] Populate questions';

export const ANSWER_TOGGLED = '[CatCPC] Answer toggled';

export const POPULATE_ANSWER_SCORE = '[CatCPC] Populate answer score';

export class PopulateQuestions implements Action {
  readonly type = POPULATE_QUESTIONS;

  constructor(public payload: Question[]) {
  }
}

export class AnswerToggled implements Action {
  readonly type = ANSWER_TOGGLED;

  constructor(public questionNumber: QuestionNumber, public answerNumber: number) {
  }
}

export class PopulateAnswerScore implements Action {
  readonly type = POPULATE_ANSWER_SCORE;

  constructor(public questionNumber: QuestionNumber, public score: number) {
  }
}

export type Types =
  | AnswerToggled
  | PopulateQuestions
  | PopulateAnswerScore;
