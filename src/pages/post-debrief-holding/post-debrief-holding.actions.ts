import { Action } from '@ngrx/store';

export const POST_DEBRIEF_HOLDING_VIEW_DID_ENTER = '[PostDebriefHoldingPage] PostDebriefHolding view did enter';

export class PostDebriefHoldingViewDidEnter implements Action {
  readonly type = POST_DEBRIEF_HOLDING_VIEW_DID_ENTER;
}

export type Types =
  | PostDebriefHoldingViewDidEnter;
