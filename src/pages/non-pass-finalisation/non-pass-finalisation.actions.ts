import { Action } from '@ngrx/store';

export const NON_PASS_FINALISATION_VIEW_DID_ENTER = '[NonPassFinalisationPage] NonPassFinalisation view did enter';

export class NonPassFinalisationViewDidEnter implements Action {
  readonly type = NON_PASS_FINALISATION_VIEW_DID_ENTER;
}

export type Types =
  | NonPassFinalisationViewDidEnter;
