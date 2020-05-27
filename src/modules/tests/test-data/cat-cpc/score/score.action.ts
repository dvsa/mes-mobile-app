import { Action } from '@ngrx/store';

export const POPULATE_SCORE = '[CatCPC] Populate question score';

export class PopulateScore implements Action {
  readonly type = POPULATE_SCORE;
  constructor(public payload: number) {
  }
}

export type Types =
  | PopulateScore;
