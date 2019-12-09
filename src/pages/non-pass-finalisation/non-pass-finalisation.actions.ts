import { Action } from '@ngrx/store';

export const NON_PASS_FINALISATION_VIEW_DID_ENTER = '[NonPassFinalisationPage] NonPassFinalisation view did enter';
export const NON_PASS_FINALISATION_VALIDATION_ERROR = '[NonPassFinalisationPage] Validation Error';

export class NonPassFinalisationViewDidEnter implements Action {
  readonly type = NON_PASS_FINALISATION_VIEW_DID_ENTER;
}

export class NonPassFinalisationValidationError implements Action {
  readonly type = NON_PASS_FINALISATION_VALIDATION_ERROR;
  constructor(public errorMessage: string) {}
}

export type Types =
  | NonPassFinalisationViewDidEnter
  | NonPassFinalisationValidationError;
