import { Action } from '@ngrx/store';

export const POPULATE_TOTAL_PERCENTAGE = '[CatCPC] Populate total percentage';

export class PopulateTestScore implements Action {
  readonly type = POPULATE_TOTAL_PERCENTAGE;
  constructor(public payload: number) {
  }
}

export type Types =
  | PopulateTestScore;
