import { Action } from '@ngrx/store';

export const REKEY_UPLOADED_VIEW_DID_ENTER = '[RekeyUploadedPage] RekeyUploaded view did enter';

export class RekeyUploadedViewDidEnter implements Action {
  readonly type = REKEY_UPLOADED_VIEW_DID_ENTER;
}

export type Types =
  | RekeyUploadedViewDidEnter;
