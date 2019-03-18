import { Action } from '@ngrx/store';

export const UNAUTHENTICATED_MODE = '[GLOBAL] Unauthenticated Mode';

export class SetUnauthenticatedMode implements Action {
  readonly type = UNAUTHENTICATED_MODE;
  constructor(public unauthenticated: boolean) {}

}
