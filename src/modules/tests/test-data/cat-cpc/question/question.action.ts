import { Action } from '@ngrx/store';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';
import { POPULATE_COMBINATION } from '../combination/combination.action';


export const POPULATE_QUESTION_ONE = '[CatCPC] Populate answer one';

export const POPULATE_QUESTION_TWO = '[CatCPC] Populate answer two';

export const POPULATE_ANSWER_SCORE = '[CatCPC] Populate answer score';
export const POPULATE_QUESTION = '[CatCPC] Populate answer score';

export const POPULATE_QUESTION_CODE = '[CatCPC] Populate question code';

export const POPULATE_QUESTION_TITLE = '[CatCPC] Populate question title';

export const POPULATE_QUESTION_SUB_TITLE = '[CatCPC] Populate question sub title';

export const POPULATE_QUESTION_ADDITIONAL_ITEMS = '[CatCPC] Populate question additional items';

export class PopulateCombination implements Action {
  readonly type = POPULATE_COMBINATION;
  constructor(public payload: string) {
  }
}

export class PopulateQuestion implements Action {
  readonly type = POPULATE_QUESTION;

  constructor(public payload: Question, public questionNumber: number) {
  }
}

export class PopulateQuestionOne implements Action {
  readonly type = POPULATE_QUESTION_ONE;

  constructor(public payload: Question) {
  }
}

export class PopulateQuestionTwo implements Action {
  readonly type = POPULATE_QUESTION_TWO;

  constructor(public payload: Question) {
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
  | PopulateQuestion
  | PopulateAnswerScore
  | PopulateQuestionCode
  | PopulateQuestionTitle
  | PopulateQuestionSubTitle
  | PopulateQuestionOne
  | PopulateQuestionTwo
  | PopulateQuestionAdditionalItems;
