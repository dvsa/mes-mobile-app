import { Action } from '@ngrx/store';

export const MARK_AS_REKEY = '[Rekey Actions] Mark the test as being rekeyed';
export const END_REKEY = '[Rekey Actions] End rekey';

export class MarkAsRekey implements Action {
  readonly type = MARK_AS_REKEY;
}

export class EndRekey implements Action {
  readonly type = END_REKEY;
}

export type Types = MarkAsRekey
  | EndRekey;
