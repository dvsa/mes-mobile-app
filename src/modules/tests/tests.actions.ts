import { Action } from '@ngrx/store';
import { TestsModel } from './tests.model';
import { ActivityCode, StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

export const START_SENDING_COMPLETED_TESTS = '[TestsEffects] Start Sending Completed Test';
export const SEND_COMPLETED_TESTS = '[TestsEffects] Send Completed Tests';
export const SEND_COMPLETED_TEST_SUCCESS = '[TestsEffects] Send Completed Tests Success';
export const SEND_COMPLETED_TESTS_FAILURE = '[TestsEffects] Send Completed Tests Failure';

export const SEND_TEST = '[TestsEffects] Send Test';
export const SEND_TEST_SUCCESS = '[Tests] Send Test Success';
export const SEND_TEST_FAILURE = '[Tests] Send Test Failure';

export const PERSIST_TESTS = '[Tests] Persist';
export const LOAD_PERSISTED_TESTS = '[Tests] Load persisted';
export const LOAD_PERSISTED_TESTS_SUCCESS = '[Tests] Load persisted success';
export const SET_ACTIVITY_CODE = '[Tests] Set activity code';
export const START_TEST_REPORT_PRACTICE_TEST = '[Tests] Start practice test';

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

export class SendTest implements Action {
  readonly type = SEND_TEST;
  constructor(public payload: StandardCarTestCATBSchema) {}
}

export class SendTestSuccess implements Action {
  readonly type = SEND_TEST_SUCCESS;
  constructor(public slotId: string) {}
}

export class SendTestFailure implements Action {
  readonly type = SEND_TEST_FAILURE;
}

export type Types =
  | PersistTests
  | LoadPersistedTests
  | LoadPersistedTestsSuccess
  | SetActivityCode
  | StartTestReportPracticeTest
  | StartSendingCompletedTests
  | SendCompletedTests
  | SendCompletedTestSuccess
  | SendCompletedTestsFailure
  | SendTest
  | SendTestSuccess
  | SendTestFailure;
