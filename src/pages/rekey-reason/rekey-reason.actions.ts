import { Action } from '@ngrx/store';

export const REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export const REKEY_REASON_VALIDATE_TRANSFER = '[RekeyReasonPage] Rekey Reason validate transfer';
export const REKEY_REASON_VALIDATE_TRANSFER_FAILED = '[RekeyReasonPage] Rekey Reason validate transfer failed';

export class RekeyReasonViewDidEnter implements Action {
  readonly type = REKEY_REASON_VIEW_DID_ENTER;
}

export class RekeyReasonValidateTransfer implements Action {
  readonly type = REKEY_REASON_VALIDATE_TRANSFER;
}

export class RekeyReasonValidateTransferFailed implements Action {
  readonly type = REKEY_REASON_VALIDATE_TRANSFER_FAILED;
}

export type Types =
  RekeyReasonViewDidEnter |
  RekeyReasonValidateTransfer |
  RekeyReasonValidateTransferFailed;
