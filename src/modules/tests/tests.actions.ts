import { Action } from '@ngrx/store';
import { TestsModel } from './tests.model';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';
import { HttpErrorResponse } from '@angular/common/http';

export const START_SENDING_COMPLETED_TESTS = '[TestsEffects] Start Sending Completed Test';
export const SEND_COMPLETED_TESTS = '[TestsEffects] Send Completed Tests';
export const SEND_COMPLETED_TEST_SUCCESS = '[TestsEffects] Send Completed Tests Success';
export const SEND_COMPLETED_TESTS_FAILURE = '[TestsEffects] Send Completed Tests Failure';

export const SEND_CURRENT_TEST = '[TestsEffects] Send Current Test';
export const SEND_CURRENT_TEST_SUCCESS = '[Tests] Send Test Success';
export const SEND_CURRENT_TEST_FAILURE = '[Tests] Send Test Failure';

export const PERSIST_TESTS = '[Tests] Persist';
export const LOAD_PERSISTED_TESTS = '[Tests] Load persisted';
export const LOAD_PERSISTED_TESTS_SUCCESS = '[Tests] Load persisted success';
export const START_TEST_REPORT_PRACTICE_TEST = '[Tests] Start practice test';

export const START_TEST = '[Tests] Start Test';
// Differs from START_TEST in that it won't trigger the journal -> test state copy effect
export const ACTIVATE_TEST = '[Tests] Activate Test';

export const SET_ACTIVITY_CODE = '[Tests] Set activity code';
export const TEST_OUTCOME_CHANGED = '[TestReportEffects] Test outcome changed';

export class PersistTests implements Action {
  readonly type = PERSIST_TESTS;
}

export class LoadPersistedTests implements Action {
  readonly type = LOAD_PERSISTED_TESTS;
}

export class LoadPersistedTestsSuccess implements Action {
  readonly type = LOAD_PERSISTED_TESTS_SUCCESS;
  constructor(public tests: TestsModel) {}
}

export class SetActivityCode implements Action {
  readonly type = SET_ACTIVITY_CODE;
  constructor(public payload: ActivityCode) {}
}

export class TestOutcomeChanged implements Action {
  readonly type = TEST_OUTCOME_CHANGED;
  constructor(public payload: string) {}
}

export class StartTest implements Action {
  readonly type = START_TEST;
  constructor(public slotId: number, public rekey: boolean = false) { }
}

export class ActivateTest implements Action {
  readonly type = ACTIVATE_TEST;
  constructor(public slotId: number, public rekey: boolean = false) { }
}

export class StartTestReportPracticeTest implements Action {
  readonly type = START_TEST_REPORT_PRACTICE_TEST;
  constructor(public slotId: string) { }
}

export class StartSendingCompletedTests implements Action {
  readonly type = START_SENDING_COMPLETED_TESTS;
}

export class SendCompletedTests implements Action {
  readonly type = SEND_COMPLETED_TESTS;
}

export class SendCompletedTestSuccess implements Action {
  readonly type = SEND_COMPLETED_TEST_SUCCESS;
  constructor(public completedTestId: string) {}
}

export class SendCompletedTestsFailure implements Action {
  readonly type = SEND_COMPLETED_TESTS_FAILURE;
}

export class SendCurrentTest implements Action {
  readonly type = SEND_CURRENT_TEST;
}

export class SendCurrentTestSuccess implements Action {
  readonly type = SEND_CURRENT_TEST_SUCCESS;
  constructor(public slotId: string) {}
}

export class SendCurrentTestFailure implements Action {
  readonly type = SEND_CURRENT_TEST_FAILURE;
  constructor(public slotId: string, public error: HttpErrorResponse) { }
}

export type Types =
  | PersistTests
  | LoadPersistedTests
  | LoadPersistedTestsSuccess
  | SetActivityCode
  | TestOutcomeChanged
  | StartTest
  | ActivateTest
  | StartTestReportPracticeTest
  | StartSendingCompletedTests
  | SendCompletedTests
  | SendCompletedTestSuccess
  | SendCompletedTestsFailure
  | SendCurrentTest
  | SendCurrentTestSuccess
  | SendCurrentTestFailure;
