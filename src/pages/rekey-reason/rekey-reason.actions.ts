import { Action } from '@ngrx/store';

export const REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export const REKEY_REASON_FIND_USER = '[RekeyReasonPage] Rekey Reason find user exists';
export const REKEY_REASON_FIND_USER_SUCCESS = '[RekeyReasonPage] Rekey Reason find user is success';
export const REKEY_REASON_FIND_USER_FAILURE = '[RekeyReasonPage] Rekey Reason find user is failure';


export class RekeyReasonViewDidEnter implements Action {
  readonly type = REKEY_REASON_VIEW_DID_ENTER;
}

export class RekeyReasonFindUser implements Action {
  readonly type = REKEY_REASON_FIND_USER;
  constructor(public staffNumber: string) { }
}

export class RekeyReasonFindUserSuccess implements Action {
  readonly type = REKEY_REASON_FIND_USER_SUCCESS;
}

export class RekeyReasonFindUserFailure implements Action {
  readonly type = REKEY_REASON_FIND_USER_FAILURE;
}

export type Types =
  RekeyReasonViewDidEnter |
  RekeyReasonFindUser |
  RekeyReasonFindUserSuccess |
  RekeyReasonFindUserFailure;
