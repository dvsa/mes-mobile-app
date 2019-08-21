import { Action } from '@ngrx/store';

export const REKEY_REASON_VIEW_DID_LEAVE = '[RekeyReasonPage] Rekey Reason view did leave';
export const REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export const REKEY_REASON_IPAD_ISSUE_SELECTED = '[RekeyReasonPage] Rekey Reason Ipad Issue Selected';
export const REKEY_REASON_IPAD_ISSUE_TECH_FAULT = '[RekeyReasonPage] Rekey Reason Ipad Issue Tech Fault Selected';
export const REKEY_REASON_IPAD_ISSUE_LOST = '[RekeyReasonPage] Rekey Reason Ipad Issue Lost Selected';
export const REKEY_REASON_IPAD_ISSUE_STOLEN = '[RekeyReasonPage] Rekey Reason Ipad Issue Stolen Selected';
export const REKEY_REASON_IPAD_ISSUE_BROKEN = '[RekeyReasonPage] Rekey Reason Ipad Issue Broken Selected';
export const REKEY_REASON_TRANSFER_SELECTED = '[RekeyReasonPage] Rekey Reason Transfer Selected';
export const REKEY_REASON_TRANSFER_STAFF_UPDATED = '[RekeyReasonPage] Rekey Reason Transfer Staff Number Updated';
export const REKEY_REASON_OTHER_SELECTED = '[RekeyReasonPage] Rekey Reason Other Selected';
export const REKEY_REASON_OTHER_REASON_UPDATED = '[RekeyReasonPage] Rekey Reason Other Reason Updated';

export class RekeyReasonViewDidLeave implements Action {
  readonly type = REKEY_REASON_VIEW_DID_LEAVE;
}
export class RekeyReasonViewDidEnter implements Action {
  readonly type = REKEY_REASON_VIEW_DID_ENTER;
}

export class IpadIssueSelected implements Action {
  readonly type = REKEY_REASON_IPAD_ISSUE_SELECTED;
  constructor(public selectedValue: boolean) { }
}

export class IpadIssueTechFault implements Action {
  readonly type = REKEY_REASON_IPAD_ISSUE_TECH_FAULT;
  constructor(public selectedValue: boolean) { }
}

export class IpadIssueLost implements Action {
  readonly type = REKEY_REASON_IPAD_ISSUE_LOST;
  constructor(public selectedValue: boolean) { }
}

export class IpadIssueStolen implements Action {
  readonly type = REKEY_REASON_IPAD_ISSUE_STOLEN;
  constructor(public selectedValue: boolean) { }
}

export class IpadIssueBroken implements Action {
  readonly type = REKEY_REASON_IPAD_ISSUE_BROKEN;
  constructor(public selectedValue: boolean) { }
}

export class TransferSelected implements Action {
  readonly type = REKEY_REASON_TRANSFER_SELECTED;
  constructor(public selectedValue: boolean) { }
}

export class TransferStaffNumber implements Action {
  readonly type = REKEY_REASON_TRANSFER_STAFF_UPDATED;
  constructor(public staffNumber: number) { }
}

export class OtherSelected implements Action {
  readonly type = REKEY_REASON_OTHER_SELECTED;
  constructor(public selectedValue: boolean) { }
}

export class OtherReasonUpdated implements Action {
  readonly type = REKEY_REASON_OTHER_REASON_UPDATED;
  constructor(public otherReason: string) { }
}

export type Types =
  | RekeyReasonViewDidLeave
  | RekeyReasonViewDidEnter
  | IpadIssueSelected
  | IpadIssueTechFault
  | IpadIssueLost
  | IpadIssueStolen
  | IpadIssueBroken
  | TransferSelected
  | TransferStaffNumber
  | OtherSelected
  | OtherReasonUpdated;
