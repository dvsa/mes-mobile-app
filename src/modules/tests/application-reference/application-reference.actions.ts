import { Action } from '@ngrx/store';
import { Application } from '../../../shared/models/DJournal';

export const POPULATE_APPLICATION_REFERENCE = '[JournalEffects] Populate Application Reference';

export class PopulateApplicationReference implements Action {
  readonly type = POPULATE_APPLICATION_REFERENCE;
  constructor(public payload: Application) {}
}

export type Types =
  | PopulateApplicationReference;
