import { Action } from '@ngrx/store';

export const DELEGATED_REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER =
  '[DelegatedRekeyUploadOutcomePage] DelegatedRekeyUploadOutcome view did enter';

export class DelegatedRekeyUploadOutcomeViewDidEnter implements Action {
  readonly type = DELEGATED_REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER;
}

export type Types =
  DelegatedRekeyUploadOutcomeViewDidEnter;
