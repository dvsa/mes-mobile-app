import { Action } from '@ngrx/store';

export const DEBRIEF_VIEW_DID_ENTER = '[DebriefPage] Debrief View Did Enter';
export const END_DEBRIEF = '[DebriefPage] End Debrief';

export class DebriefViewDidEnter implements Action {
  readonly type = DEBRIEF_VIEW_DID_ENTER;
}

export class EndDebrief implements Action {
  readonly type = END_DEBRIEF;
}

export type Types =
  | DebriefViewDidEnter
  | EndDebrief;
