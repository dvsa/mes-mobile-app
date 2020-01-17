import { Action } from '@ngrx/store';
import { Candidate } from '@dvsa/mes-test-schema/categories/common';

export const POPULATE_CANDIDATE_DETAILS_CAT_A_MOD2 = '[CatAMod2] [JournalEffects] Populate Candidate Details';

export class PopulateCandidateDetailsCatAMod2 implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS_CAT_A_MOD2;
  constructor(public payload: Candidate) {}
}

export type Types =
  | PopulateCandidateDetailsCatAMod2;
