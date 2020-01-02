import { Action } from '@ngrx/store';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';

export const POPULATE_CANDIDATE_DETAILS_CAT_C = '[CatC] [JournalEffects] Populate Candidate Details';

export class PopulateCandidateDetailsCatBE implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS_CAT_C;
  constructor(public payload: CatCUniqueTypes.Candidate) {}
}

export type Types =
  | PopulateCandidateDetailsCatBE;
