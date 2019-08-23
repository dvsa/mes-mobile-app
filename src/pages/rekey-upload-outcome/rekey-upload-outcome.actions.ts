import { Action } from '@ngrx/store';

export const REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER = '[RekeyUploadOutcomePage] RekeyUploadOutcome view did enter';

export class RekeyUploadOutcomeViewDidEnter implements Action {
  readonly type = REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER;
}

export type Types =
  | RekeyUploadOutcomeViewDidEnter;
