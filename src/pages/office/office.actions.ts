import { Action } from '@ngrx/store';

export const OFFICE_VIEW_DID_ENTER = '[OfficePage] Office view did enter';
export const COMPLETE_TEST = '[OfficePage] Complete Test';
export const SAVING_WRITE_UP_FOR_LATER = '[OfficePage] Saving write-up for later';
export const OFFICE_VALIDATION_ERROR = '[OfficePage] Validation error';
export const HEALTH_DECLARATION_CHANGED = '[Office] Health declaration changed';

export class OfficeViewDidEnter implements Action {
  readonly type = OFFICE_VIEW_DID_ENTER;
}

export class CompleteTest implements Action {
  readonly type = COMPLETE_TEST;
}

export class SavingWriteUpForLater implements Action {
  readonly type = SAVING_WRITE_UP_FOR_LATER;
}

export class OfficeValidationError implements Action {
  readonly type = OFFICE_VALIDATION_ERROR;
  constructor(public errorMessage: string) {}
}

export class HealthDeclarationChanged implements Action {
  readonly type = HEALTH_DECLARATION_CHANGED;
  constructor(public healthDeclarationSigned: boolean) { }
}

export type OfficeActionTypes =
  | CompleteTest
  | OfficeViewDidEnter
  | SavingWriteUpForLater
  | HealthDeclarationChanged;
