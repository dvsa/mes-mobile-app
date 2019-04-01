import { Action } from '@ngrx/store';

export const TEST_REPORT_VIEW_DID_ENTER = '[TestReportPage] Test Report did enter';

export const TOGGLE_SERIOUS_FAULT_MODE = '[TestReportPage] Toggle Serious Fault Mode';

export class TestReportViewDidEnter implements Action {
  readonly type = TEST_REPORT_VIEW_DID_ENTER;
}

export class ToggleSeriousFaultMode implements Action {
  readonly type = TOGGLE_SERIOUS_FAULT_MODE;
}

export type Types =
  | TestReportViewDidEnter
  | ToggleSeriousFaultMode;
