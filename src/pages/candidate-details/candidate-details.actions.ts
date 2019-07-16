import { Action } from '@ngrx/store';

export const CANDIDATE_DETAILS_VIEW_DID_ENTER = '[CandidateDetailsPage] Candidate details view did enter';
export const CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED = '[CandidateDetailsPage] Candidate details slot change viewed';

export class CandidateDetailsViewDidEnter implements Action {
  readonly type = CANDIDATE_DETAILS_VIEW_DID_ENTER;
  constructor(public slotId: number) {
  }
}

export class CandidateDetailsSlotChangeViewed implements Action {
  readonly type = CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED;
  constructor(public slotId: number) {
  }
}

export type Types =
  | CandidateDetailsViewDidEnter
  | CandidateDetailsSlotChangeViewed;
