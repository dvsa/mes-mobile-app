import { Action } from '@ngrx/store';

export const DASHBOARD_VIEW_DID_ENTER = '[DashboardPage] Dashboard did enter';

export class DashboardViewDidEnter implements Action {
  readonly type = DASHBOARD_VIEW_DID_ENTER;
}

export type Types =
  | DashboardViewDidEnter;
