import { Action } from '@ngrx/store';
import { Examiner } from '@dvsa/mes-test-schema/categories/common';

export const POPULATE_EXAMINER = '[ExaminerlEffects] Populate Examiner';

export class PopulateExaminer implements Action {
  readonly type = POPULATE_EXAMINER;
  constructor(public payload: Examiner) {}
}

export type Types =
  | PopulateExaminer;
