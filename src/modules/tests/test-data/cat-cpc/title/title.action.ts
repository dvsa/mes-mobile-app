import { Action } from '@ngrx/store';

export const POPULATE_TITLE = '[WRTC] [CatCPC] Populate title';

export class PopulateQuestionTitle implements Action {
  readonly type = POPULATE_TITLE;
  constructor(public payload: string) {
  }
}

export type Types =
  | PopulateQuestionTitle;
