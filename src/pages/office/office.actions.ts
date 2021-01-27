import { Action } from '@ngrx/store';

export const TEST_START_DATE_CHANGED = '[OfficePage] Test Start Date Changed';
export const OFFICE_VIEW_DID_ENTER = '[OfficePage] Office view did enter';
export const COMPLETE_TEST = '[OfficePage] Complete Test';
export const SAVING_WRITE_UP_FOR_LATER = '[OfficePage] Saving write-up for later';
export const OFFICE_VALIDATION_ERROR = '[OfficePage] Validation error';

export class TestStartDateChanged implements Action {
  readonly type = TEST_START_DATE_CHANGED;
  constructor(
    public previousStartDate: string,
    public customStartDate: string,
  ) {}
}

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

export type OfficeActionTypes =
  | TestStartDateChanged
  | CompleteTest
  | OfficeViewDidEnter
  | SavingWriteUpForLater;
