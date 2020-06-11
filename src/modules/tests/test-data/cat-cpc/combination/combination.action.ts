import { Action } from '@ngrx/store';
import { CombinationCodes } from '@dvsa/mes-test-schema/categories/CPC';

export const POPULATE_COMBINATION = '[WRTC] [CatCPC] Populate Combination';

export class PopulateCombination implements Action {
  readonly type = POPULATE_COMBINATION;
  constructor(public payload: CombinationCodes) {
  }
}

export type Types =
  | PopulateCombination;
