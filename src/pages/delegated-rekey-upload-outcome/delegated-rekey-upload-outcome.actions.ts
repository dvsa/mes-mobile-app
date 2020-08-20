import { Action } from '@ngrx/store';

export const DELEGATED_REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER =
  '[DelegatedRekeyUploadOutcomePage] DelegatedRekeyUploadOutcome view did enter';
export const VALIDATE_TRANSFER_DELEGATED_REKEY = '[DelegatedRekeyUploadOutcomePage] Validate transfer delegated rekey';
export const VALIDATE_TRANSFER_DELEGATED_REKEY_FAILED =
  '[DelegatedRekeyUploadOutcomePage] Validate transfer delegated rekey failed';

export class DelegatedRekeyUploadOutcomeViewDidEnter implements Action {
  readonly type = DELEGATED_REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER;
}

export class ValidateTransferDelegatedRekey implements Action {
  readonly type = VALIDATE_TRANSFER_DELEGATED_REKEY;
}

export class ValidateTransferDelegatedRekeyFailed implements Action {
  readonly type = VALIDATE_TRANSFER_DELEGATED_REKEY_FAILED;
  constructor(public staffNumberNotFound: boolean) { }
}

export type Types =
  DelegatedRekeyUploadOutcomeViewDidEnter |
  ValidateTransferDelegatedRekey |
  ValidateTransferDelegatedRekeyFailed;
