import { Action } from '@ngrx/store';
import { JournalData } from '@dvsa/mes-test-schema/categories/B';

export const POPULATE_JOURNAL_DATA = '[JournalEffects] Populate Journal Data';

export class PopulateJournalData implements Action {
  readonly type = POPULATE_JOURNAL_DATA;
  constructor(public payload: JournalData) {}
}

export type Types =
  | PopulateJournalData;
