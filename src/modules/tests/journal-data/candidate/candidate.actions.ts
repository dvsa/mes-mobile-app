import { Action } from '@ngrx/store';
import { Candidate } from '@dvsa/mes-test-schema/categories/common';

export const POPULATE_CANDIDATE_DETAILS = '[JournalEffects] Populate Candidate Details';

export class PopulateCandidateDetails implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS;
  constructor(public payload: Candidate) {}
}

export type Types =
  | PopulateCandidateDetails;
