import { Action } from '@ngrx/store';

export const MANOEUVRES_PAGE_VALIDATION_ERROR = '[ManoeuvresPage] Manoeuvres page Validation Error';
export const MANOEUVRES_VIEW_DID_ENTER = '[ManoeuvresPage] Manoeuvres page view did enter';

export class ManoeuvresViewDidEnter implements Action {
  readonly type = MANOEUVRES_VIEW_DID_ENTER;
}

export class ManoeuvresPageValidationError implements Action {
  readonly type = MANOEUVRES_PAGE_VALIDATION_ERROR;
  constructor(public errorMessage: string) { }
}
