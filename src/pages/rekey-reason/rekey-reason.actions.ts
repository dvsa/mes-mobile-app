import { Action } from '@ngrx/store';

export const REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export const UPLOAD_REKEY_MODAL_VIEW_WILL_ENTER = '[RekeyReasonPage] Upload Rekey Modal view will enter';

export class RekeyReasonViewDidEnter implements Action {
  readonly type = REKEY_REASON_VIEW_DID_ENTER;
}

export class UploadRekeyModalViewWillEnter implements Action {
  readonly type = UPLOAD_REKEY_MODAL_VIEW_WILL_ENTER;
}
export type Types =
  | RekeyReasonViewDidEnter
  | UploadRekeyModalViewWillEnter;
