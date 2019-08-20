import { Action } from '@ngrx/store';

export const REKEY_REASON_VIEW_DID_LEAVE = '[RekeyReasonPage] Rekey Reason view did leave';
export const REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';

export class RekeyReasonViewDidLeave implements Action {
  readonly type = REKEY_REASON_VIEW_DID_LEAVE;
}
export class RekeyReasonViewDidEnter implements Action {
  readonly type = REKEY_REASON_VIEW_DID_ENTER;
}

export type Types =
  | RekeyReasonViewDidLeave
  | RekeyReasonViewDidEnter;
