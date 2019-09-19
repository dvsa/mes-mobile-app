import { Action } from '@ngrx/store';

export const REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export const VALIDATE_TRANSFER_REKEY = '[RekeyReasonPage] Validate transfer rekey';
export const VALIDATE_TRANSFER_REKEY_FAILED = '[RekeyReasonPage] Validate transfer rekey failed';
export const RESET_STAFF_NUMBER_VALIDATION_ERROR = '[RekeyReasonPage] Reset staff number validation error';

export class RekeyReasonViewDidEnter implements Action {
  readonly type = REKEY_REASON_VIEW_DID_ENTER;
}

export class ValidateTransferRekey implements Action {
  readonly type = VALIDATE_TRANSFER_REKEY;
}

export class ValidateTransferRekeyFailed implements Action {
  readonly type = VALIDATE_TRANSFER_REKEY_FAILED;
  constructor(public staffNumberNotFound: boolean) { }
}

export class ResetStaffNumberValidationError implements Action {
  readonly type = RESET_STAFF_NUMBER_VALIDATION_ERROR;
}

export type Types =
  RekeyReasonViewDidEnter |
  ValidateTransferRekey |
  ValidateTransferRekeyFailed |
  ResetStaffNumberValidationError;
