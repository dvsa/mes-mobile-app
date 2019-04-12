import { Action } from '@ngrx/store';
import { Examiner } from '@dvsa/mes-test-schema/categories/B';

export const POPULATE_EXAMINER = '[JournalEffects] Populate Examiner';

export class PopulateExaminer implements Action {
  readonly type = POPULATE_EXAMINER;
  constructor(public payload: Examiner) {}
}

export type Types =
  | PopulateExaminer;
