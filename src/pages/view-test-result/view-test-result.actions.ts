import { Action } from '@ngrx/store';

export const VIEW_TEST_RESULT_VIEW_DID_ENTER = '[View Test Result] View Test Result Did Enter';

export class ViewTestResultViewDidEnter implements Action {
  readonly type = VIEW_TEST_RESULT_VIEW_DID_ENTER;
  constructor(public applicationReference: string) {}
}

export type Types =
  | ViewTestResultViewDidEnter;
