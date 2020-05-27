import { Action } from '@ngrx/store';

export const POPULATE_QUESTION_CODE = '[WRTC] [CatCPC] Populate question code';

export class PopulateQuestionCode implements Action {
  readonly type = POPULATE_QUESTION_CODE;
  constructor(public payload: string) {
  }
}

export type Types =
  | PopulateQuestionCode;
