import { Action } from '@ngrx/store';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export const POPULATE_CANDIDATE_DETAILS_CAT_BE = '[CatBE] [JournalEffects] Populate Candidate Details';

export class PopulateCandidateDetailsCatBE implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS_CAT_BE;
  constructor(public payload: CatBEUniqueTypes.Candidate) {}
}

export type Types =
  | PopulateCandidateDetailsCatBE;
