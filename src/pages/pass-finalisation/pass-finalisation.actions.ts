import { Action } from '@ngrx/store';

export const PASS_FINALISTATION_VIEW_DID_ENTER = '[PassFinalisationPage] Pass Finalisation view did enter';
export const PASS_FINALISTATION_VALIDATION_ERROR = '[PassFinalisationPage] Validation error';

export class PassFinalisationViewDidEnter implements Action {
  readonly type = PASS_FINALISTATION_VIEW_DID_ENTER;
}

export class PassFinalisationValidationError implements Action {
  readonly type = PASS_FINALISTATION_VALIDATION_ERROR;
  constructor(public errorMessage: string) {}
}

export type Types =
  | PassFinalisationViewDidEnter
  | PassFinalisationValidationError;
