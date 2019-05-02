import { Action } from '@ngrx/store';

export const TEST_REPORT_VIEW_DID_ENTER = '[TestReportPage] Test Report did enter';
export const TOGGLE_REMOVE_FAULT_MODE = '[TestReportPage] Toggle Remove Fault Mode';
export const TOGGLE_SERIOUS_FAULT_MODE = '[TestReportPage] Toggle Serious Fault Mode';
export const TOGGLE_DANGEROUS_FAULT_MODE = '[TestReportPage] Toggle Dangerous Fault Mode';
export const VALIDATE_TEST_RESULT = '[TestReportPage] Validated Test Report';

export class TestReportViewDidEnter implements Action {
  readonly type = TEST_REPORT_VIEW_DID_ENTER;
}
export class ToggleRemoveFaultMode implements Action {
  readonly type = TOGGLE_REMOVE_FAULT_MODE;
}

export class ToggleSeriousFaultMode implements Action {
  readonly type = TOGGLE_SERIOUS_FAULT_MODE;
}

export class ToggleDangerousFaultMode implements Action {
  readonly type = TOGGLE_DANGEROUS_FAULT_MODE;
}

export class ValidateTestResult implements Action {
  constructor(public payload: boolean) {}

  readonly type = VALIDATE_TEST_RESULT;
}

export type Types =
  | TestReportViewDidEnter
  | ToggleSeriousFaultMode
  | ToggleDangerousFaultMode
  | ToggleRemoveFaultMode
  | ValidateTestResult;
