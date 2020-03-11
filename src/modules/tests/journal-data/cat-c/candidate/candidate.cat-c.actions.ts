import { Action } from '@ngrx/store';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';

export const POPULATE_CANDIDATE_DETAILS_CAT_C = '[JournalEffects] [CatC] Populate Candidate Details';

export class PopulateCandidateDetailsCatC implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS_CAT_C;
  constructor(public payload: CatCUniqueTypes.Candidate) {}
}

export type Types =
  | PopulateCandidateDetailsCatC;
