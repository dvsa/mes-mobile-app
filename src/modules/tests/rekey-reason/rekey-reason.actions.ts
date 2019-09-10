import { Action } from '@ngrx/store';

export const REKEY_REASON_VIEW_DID_LEAVE = '[RekeyReasonPage] Rekey Reason view did leave';
export const REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export const IPAD_ISSUE_SELECTED = '[RekeyReasonPage] Rekey Reason Ipad Issue Selected';
export const IPAD_ISSUE_TECH_FAULT = '[RekeyReasonPage] Rekey Reason Ipad Issue Tech Fault Selected';
export const IPAD_ISSUE_LOST = '[RekeyReasonPage] Rekey Reason Ipad Issue Lost Selected';
export const IPAD_ISSUE_STOLEN = '[RekeyReasonPage] Rekey Reason Ipad Issue Stolen Selected';
export const IPAD_ISSUE_BROKEN = '[RekeyReasonPage] Rekey Reason Ipad Issue Broken Selected';
export const TRANSFER_SELECTED = '[RekeyReasonPage] Rekey Reason Transfer Selected';
export const OTHER_SELECTED = '[RekeyReasonPage] Rekey Reason Other Selected';
export const OTHER_REASON_UPDATED = '[RekeyReasonPage] Rekey Reason Other Reason Updated';

export class RekeyReasonViewDidLeave implements Action {
  readonly type = REKEY_REASON_VIEW_DID_LEAVE;
}
export class RekeyReasonViewDidEnter implements Action {
  readonly type = REKEY_REASON_VIEW_DID_ENTER;
}

export class IpadIssueSelected implements Action {
  readonly type = IPAD_ISSUE_SELECTED;
  constructor(public selectedValue: boolean) { }
}

export class IpadIssueTechFaultSelected implements Action {
  readonly type = IPAD_ISSUE_TECH_FAULT;
}

export class IpadIssueLostSelected implements Action {
  readonly type = IPAD_ISSUE_LOST;
}

export class IpadIssueStolenSelected implements Action {
  readonly type = IPAD_ISSUE_STOLEN;
}

export class IpadIssueBrokenSelected implements Action {
  readonly type = IPAD_ISSUE_BROKEN;
}

export class TransferSelected implements Action {
  readonly type = TRANSFER_SELECTED;
  constructor(public selectedValue: boolean) { }
}

export class OtherSelected implements Action {
  readonly type = OTHER_SELECTED;
  constructor(public selectedValue: boolean) { }
}

export class OtherReasonUpdated implements Action {
  readonly type = OTHER_REASON_UPDATED;
  constructor(public otherReason: string) { }
}

export type Types =
  | RekeyReasonViewDidLeave
  | RekeyReasonViewDidEnter
  | IpadIssueSelected
  | IpadIssueTechFaultSelected
  | IpadIssueLostSelected
  | IpadIssueStolenSelected
  | IpadIssueBrokenSelected
  | TransferSelected
  | OtherSelected
  | OtherReasonUpdated;
