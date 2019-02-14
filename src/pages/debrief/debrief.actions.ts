import { Action } from '@ngrx/store';

export const DEBRIEF_VIEW_DID_ENTER = '[DebriefPage] Debrief view did enter';

export class DebriefViewDidEnter implements Action {
  readonly type = DEBRIEF_VIEW_DID_ENTER;
}

export type Types =
  | DebriefViewDidEnter;
