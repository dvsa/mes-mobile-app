import { Action } from '@ngrx/store';
import { Application } from '@dvsa/mes-journal-schema';

export const POPULATE_APPLICATION_REFERENCE = '[JournalEffects] Populate Application Reference';

export class PopulateApplicationReference implements Action {
  readonly type = POPULATE_APPLICATION_REFERENCE;
  constructor(public payload: Application) {}
}

export type ApplicationReferenceActionTypes =
  | PopulateApplicationReference;
