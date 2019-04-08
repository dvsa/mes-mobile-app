import { Action } from '@ngrx/store';

export const POPULATE_CANDIDATE_DETAILS = '[JournalEffects] Populate Candidate Details';

export class PopulateCandidateDetails implements Action {
  readonly type = POPULATE_CANDIDATE_DETAILS;
  constructor(public payload: any) {}
}

export type Types =
  | PopulateCandidateDetails;
