import { Action } from '@ngrx/store';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';

export const POPULATE_CANDIDATE_DETAILS_CAT_D = '[CatD] [JournalEffects] Populate Candidate Details';

export class PopulateCandidateDetailsCatD implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS_CAT_D;
  constructor(public payload: CatDUniqueTypes.Candidate) {}
}

export type Types =
  | PopulateCandidateDetailsCatD;
