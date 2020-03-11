import { Action } from '@ngrx/store';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';

export const POPULATE_CANDIDATE_DETAILS_CAT_HOME = '[JournalEffects] [CatHome] Populate Candidate Details';

export class PopulateCandidateDetailsCatHome implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS_CAT_HOME;
  constructor(public payload: CatFUniqueTypes.Candidate) {}
}

export type Types =
  | PopulateCandidateDetailsCatHome;
