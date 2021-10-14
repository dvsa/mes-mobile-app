import { Action } from '@ngrx/store';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';

export const MANOEUVRES_PAGE_VALIDATION_ERROR = '[ManoeuvresPage] Validation Error';
export const MANOEUVRES_VIEW_DID_ENTER = '[ManoeuvresPage] View did enter';
export const MANOEUVRES_PAGE_SUBMISSION = '[ManoeuvresPage] Clicked Submit in modal';
export const MANOEUVRES_PAGE_CANCEL_SUBMISSION = '[ManoeuvresPage] Click Cancel in modal';
export const MANOEUVRES_OPEN_ACTIVITY_CODE_MODAL = '[ManoeuvresPage] Open activity code modal';
export const MANOEUVRES_ACTIVITY_CODE_SELECTED = '[ManoeuvresPage] Activity code selected';

export class ManoeuvresViewDidEnter implements Action {
  readonly type = MANOEUVRES_VIEW_DID_ENTER;
}

export class ManoeuvresPageValidationError implements Action {
  readonly type = MANOEUVRES_PAGE_VALIDATION_ERROR;
  constructor(public errorMessage: string) { }
}

export class ManoeuvresViewPageCancelSubmission implements Action {
  readonly type = MANOEUVRES_PAGE_CANCEL_SUBMISSION;
}

export class ManoeuvresViewPageSubmission implements Action {
  readonly type = MANOEUVRES_PAGE_SUBMISSION;
}

export class ManoeuvresActivityCodeModalOpened implements Action {
  readonly type = MANOEUVRES_OPEN_ACTIVITY_CODE_MODAL;
}

export class ManoeuvresActivityCodeSelected implements Action {
  readonly type = MANOEUVRES_ACTIVITY_CODE_SELECTED;
  constructor(public activityCode: ActivityCode) { }
}
