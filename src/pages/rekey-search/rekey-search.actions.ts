import { Action } from '@ngrx/store';

export const REKEY_SEARCH_VIEW_DID_ENTER = '[RekeySearch] Rekey Search Did Enter';

export class RekeySearchViewDidEnter implements Action {
  readonly type = REKEY_SEARCH_VIEW_DID_ENTER;
}

export type Types =
  | RekeySearchViewDidEnter;
