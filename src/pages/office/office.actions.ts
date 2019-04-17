import { Action } from '@ngrx/store';

export const OFFICE_VIEW_DID_ENTER = '[OfficePage] Office view did enter';
export const OFFICE_VIEW_ADD_DANGEROUS_FAULT_COMMENT = '[OfficePage] Office view add dangerous fault comment';
export const OFFICE_VIEW_ADD_DRIVING_FAULT_COMMENT = '[OfficePage] Office view add driving fault comment';
export class OfficeViewDidEnter implements Action {
  readonly type = OFFICE_VIEW_DID_ENTER;
}

export class OfficeViewAddDangerousFaultComment implements Action {
  readonly type = OFFICE_VIEW_ADD_DANGEROUS_FAULT_COMMENT;
  constructor(public payload: string) {}
}
export class OfficeViewAddDrivingFaultComment implements Action {
  readonly type = OFFICE_VIEW_ADD_DRIVING_FAULT_COMMENT;
  constructor(public propertyName, public payload: string) {}
}

export type OfficeActionTypes =
  | OfficeViewDidEnter
  | OfficeViewAddDangerousFaultComment
  | OfficeViewAddDrivingFaultComment;
