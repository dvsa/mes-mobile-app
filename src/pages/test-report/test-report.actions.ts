import { Action } from '@ngrx/store';

export const TEST_REPORT_VIEW_DID_ENTER = '[TestReportPage] Test Report did enter';
export const TOGGLE_REMOVE_FAULT_MODE = '[TestReportPage] Toggle Remove Fault Mode';
export const TOGGLE_SERIOUS_FAULT_MODE = '[TestReportPage] Toggle Serious Fault Mode';
export const TOGGLE_DANGEROUS_FAULT_MODE = '[TestReportPage] Toggle Dangerous Fault Mode';
export const CALCULATE_TEST_RESULT = '[TestResultPage] Calculate Test Result';
export const VALIDATE_ETA = '[TestReportPage] Validate ETA';
export const TERMINATE_TEST_FROM_TEST_REPORT = '[TestReportPage] Terminate test';
export const START_TIMER = '[TestReportPage] Start Timer';

export class TestReportViewDidEnter implements Action {
  readonly type = TEST_REPORT_VIEW_DID_ENTER;
}

// The aim of isUserGenerated in the actions below is so we know if we should track the event in analytics.
// by default we don't as most of the time we programatically toggling the mode which we don't want to record
export class ToggleRemoveFaultMode implements Action {
  readonly type = TOGGLE_REMOVE_FAULT_MODE;
  constructor(public isUserGenerated: boolean = false) {}
}

export class ToggleSeriousFaultMode implements Action {
  readonly type = TOGGLE_SERIOUS_FAULT_MODE;
  constructor(public isUserGenerated: boolean = false) {}
}

export class ToggleDangerousFaultMode implements Action {
  readonly type = TOGGLE_DANGEROUS_FAULT_MODE;
  constructor(public isUserGenerated: boolean = false) {}
}

export class CalculateTestResult implements Action {
  readonly type = CALCULATE_TEST_RESULT;
}

export class TerminateTestFromTestReport implements Action {
  readonly type = TERMINATE_TEST_FROM_TEST_REPORT;
}

export class StartTimer implements Action {
  readonly type = START_TIMER;
}

export type Types =
  | TestReportViewDidEnter
  | ToggleSeriousFaultMode
  | ToggleDangerousFaultMode
  | ToggleRemoveFaultMode
  | CalculateTestResult
  | TerminateTestFromTestReport
  | StartTimer;
