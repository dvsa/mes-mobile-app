import { Action } from '@ngrx/store';

export const TERMINATE_TEST_VIEW_DID_ENTER = '[TerminateTestPage] Terminate test did enter';

export class TerminateTestViewDidEnter implements Action {
  readonly type = TERMINATE_TEST_VIEW_DID_ENTER;
}

export type Types =
  | TerminateTestViewDidEnter;
