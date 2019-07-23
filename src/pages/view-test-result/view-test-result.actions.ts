import { Action } from '@ngrx/store';

export const VIEW_TEST_RESULT_VIEW_DID_ENTER = '[View Test Result] View Test Result Did Enter';

export class ViewTestResultViewDidEnter implements Action {
  readonly type = VIEW_TEST_RESULT_VIEW_DID_ENTER;
}

export type Types =
  | ViewTestResultViewDidEnter;
