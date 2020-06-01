import { Action } from '@ngrx/store';

export const POPULATE_COMBINATION = '[WRTC] [CatCPC] Populate Combination';

export class PopulateCombination implements Action {
  readonly type = POPULATE_COMBINATION;
  constructor(public payload: string) {
  }
}

export type Types =
  | PopulateCombination;
