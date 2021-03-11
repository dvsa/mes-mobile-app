import { Action } from '@ngrx/store';

export const CONFIRM_TEST_DETAILS_VIEW_DID_ENTER = '[ConfirmTestDetailsPage] Confirm Test Details did enter';

export class ConfirmTestDetailsViewDidEnter implements Action {
  readonly type = CONFIRM_TEST_DETAILS_VIEW_DID_ENTER;
}
