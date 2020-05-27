import { Action } from '@ngrx/store';

export const POPULATE_SUB_TITLE = '[WRTC] [CatCPC] Populate sub title';

export class PopulateQuestionSubTitle implements Action {
  readonly type = POPULATE_SUB_TITLE;
  constructor(public payload: string) {
  }
}

export type Types =
  | PopulateQuestionSubTitle;
