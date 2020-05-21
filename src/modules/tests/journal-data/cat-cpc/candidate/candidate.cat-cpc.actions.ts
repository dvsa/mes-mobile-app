import { Action } from '@ngrx/store';
import { Candidate } from '@dvsa/mes-test-schema/categories/CPC';

export const POPULATE_CANDIDATE_DETAILS_CAT_CPC = '[JournalEffects] [Cat CPC] Populate Candidate Details';

export class PopulateCandidateDetailsCatCPC implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS_CAT_CPC;
  constructor(public payload: Candidate) {}
}

export type Types =
  | PopulateCandidateDetailsCatCPC;
