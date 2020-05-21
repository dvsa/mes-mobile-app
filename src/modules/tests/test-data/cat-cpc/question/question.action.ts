import { Action } from '@ngrx/store';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';

export const POPULATE_ANSWER = '[CatCPC] Populate answer';

export const POPULATE_ANSWER_SCORE = '[CatCPC] Populate answer score';

export const POPULATE_QUESTION_CODE = '[CatCPC] Populate question code';

export const POPULATE_QUESTION_TITLE = '[CatCPC] Populate question title';

export const POPULATE_QUESTION_SUB_TITLE = '[CatCPC] Populate question sub title';

export const POPULATE_QUESTION_ADDITIONAL_ITEMS = '[CatCPC] Populate question additional items';

export class PopulateAnswer implements Action {
  readonly type = POPULATE_ANSWER;

  constructor(public payload: Question, public questionNumber: number) {
  }
}

export class PopulateAnswerScore implements Action {
  readonly type = POPULATE_ANSWER_SCORE;

  constructor(public score: number) {
  }
}

export class PopulateQuestionCode implements Action {
  readonly type = POPULATE_QUESTION_CODE;

  constructor(public code: string) {
  }
}

export class PopulateQuestionTitle implements Action {
  readonly type = POPULATE_QUESTION_TITLE;

  constructor(public title: string) {
  }
}

export class PopulateQuestionSubTitle implements Action {
  readonly type = POPULATE_QUESTION_SUB_TITLE;

  constructor(public subtitle: string) {
  }
}

export class PopulateQuestionAdditionalItems implements Action {
  readonly type = POPULATE_QUESTION_ADDITIONAL_ITEMS;

  constructor(public additionalItems: string[]) {
  }
}

export type Types =
  | PopulateAnswer
  | PopulateAnswerScore
  | PopulateQuestionCode
  | PopulateQuestionTitle
  | PopulateQuestionSubTitle
  | PopulateQuestionAdditionalItems;
