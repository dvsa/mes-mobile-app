import { Action } from '@ngrx/store';

export const PASS_FINALISTATION_VIEW_DID_ENTER = '[PassFinalisationPage] Pass Finalisation view did enter';


export class PassFinalisationViewDidEnter implements Action {
  readonly type = PASS_FINALISTATION_VIEW_DID_ENTER;
}

export type Types = 
  | PassFinalisationViewDidEnter;
