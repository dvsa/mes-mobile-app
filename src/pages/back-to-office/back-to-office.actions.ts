import { Action } from '@ngrx/store';

export const BACK_TO_OFFICE_VIEW_DID_ENTER = '[BackToOfficePage] BackToOffice view did enter';
export const DEFER_WRITE_UP = '[BackToOfficePage] Defer write-up';

export class BackToOfficeViewDidEnter implements Action {
  readonly type = BACK_TO_OFFICE_VIEW_DID_ENTER;
}

export class DeferWriteUp implements Action {
  readonly type = DEFER_WRITE_UP;
}

export type Types =
  | BackToOfficeViewDidEnter
  | DeferWriteUp;
