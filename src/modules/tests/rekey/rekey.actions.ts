import { Action } from '@ngrx/store';

export const MARK_AS_REKEY = '[Rekey Actions] Mark the test as being rekeyed';

export class MarkAsRekey implements Action {
  readonly type = MARK_AS_REKEY;
}

export type Types = MarkAsRekey;
