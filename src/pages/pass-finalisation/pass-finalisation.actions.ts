import { Action } from '@ngrx/store';

export const PASS_FINALISTATION_VIEW_DID_ENTER = '[PassFinalisationPage] Pass Finalisation view did enter';
export const VALIDATION_ERROR = '[PassFinalisationPage] Validation error';

export class PassFinalisationViewDidEnter implements Action {
  readonly type = PASS_FINALISTATION_VIEW_DID_ENTER;
}

export class ValidationError implements Action {
  readonly type = VALIDATION_ERROR;
  constructor(public errorMessage: string) {}
}

export type Types =
  | PassFinalisationViewDidEnter
  | ValidationError;
