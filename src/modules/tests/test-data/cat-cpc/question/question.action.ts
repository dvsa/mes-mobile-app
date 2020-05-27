import { Action } from '@ngrx/store';
import { Answer, Question } from '@dvsa/mes-test-schema/categories/CPC';

export const POPULATE_QUESTION = '[CatCPC] Populate questions';

export const ANSWER_TOGGLED = '[CatCPC] Answer toggled';

export const POPULATE_ANSWER_SCORE = '[CatCPC] Populate answer score';

export class PopulateQuestion implements Action {
  readonly type = POPULATE_QUESTION;

  constructor(public payload: Question[]) {
  }
}

export class QuestionAnswerToggled implements Action {
  readonly type = ANSWER_TOGGLED;

  constructor(public payload: Answer, public answerNumber: number) {
  }
}

export class PopulateAnswerScore implements Action {
  readonly type = POPULATE_ANSWER_SCORE;

  constructor(public score: number) {
  }
}

export type Types =
  | QuestionAnswerToggled
  | PopulateQuestion
  | PopulateAnswerScore;
