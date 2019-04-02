import { Action } from '@ngrx/store';

export const BACK_TO_OFFICE_VIEW_DID_ENTER = '[BackToOfficePage] BackToOffice view did enter';

export class BackToOfficeViewDidEnter implements Action {
  readonly type = BACK_TO_OFFICE_VIEW_DID_ENTER;
}

export type Types =
  | BackToOfficeViewDidEnter;
