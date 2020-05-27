import { Action } from '@ngrx/store';

export const POPULATE_ADDITIONAL_ITEMS = '[WRTC] [CatCPC] Populate additional items';

export class PopulateAdditionalItems implements Action {
  readonly type = POPULATE_ADDITIONAL_ITEMS;
  constructor(public payload: string[]) {
  }
}

export type Types =
  | PopulateAdditionalItems;
