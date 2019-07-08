import { Action } from '@ngrx/store';

export const OFFICE_VIEW_DID_ENTER = '[OfficePage] Office view did enter';
export const COMPLETE_TEST = '[OfficePage] Complete Test';
export const DEFER_WRITE_UP = '[OfficePage] Defer Write-up';

export class OfficeViewDidEnter implements Action {
  readonly type = OFFICE_VIEW_DID_ENTER;
}

export class CompleteTest implements Action {
  readonly type = COMPLETE_TEST;
}

export class DeferWriteUp implements Action {
  readonly type = DEFER_WRITE_UP;
}

export type OfficeActionTypes =
  | CompleteTest
  | OfficeViewDidEnter;
