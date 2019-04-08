import { Action } from '@ngrx/store';

export const POPULATE_APPLICATION_REFERENCE = '[JournalEffects] Populate Application Reference';

export class PopulateApplicationReference implements Action {
  readonly type = POPULATE_APPLICATION_REFERENCE;
  constructor(public payload: any) {}
}

export type Types =
  | PopulateApplicationReference;
