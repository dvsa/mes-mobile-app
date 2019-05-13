import { Action } from '@ngrx/store';
import { TestsModel } from './tests.model';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';

export const START_SENDING_TESTS = '[Tests] Start Sending Test Results';
export const SEND_TESTS = '[Tests] Send Test Result';
export const SEND_TESTS_SUCCESS = '[Tests] Send Tests Result Success';
export const SEND_TESTS_FAILURE = '[Tests] Send Test Results Failure';

export const PERSIST_TESTS = '[Tests] Persist';
export const LOAD_PERSISTED_TESTS = '[Tests] Load persisted';
export const LOAD_PERSISTED_TESTS_SUCCESS = '[Tests] Load persisted success';
export const SET_ACTIVITY_CODE = '[Tests] Set activity code';
export const START_PRACTICE_TEST = '[Tests] Start practice test';

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

export class StartPracticeTest implements Action {
  readonly type = START_PRACTICE_TEST;
  constructor(public slotId: string) { }
}

export class StartSendingTests implements Action {
  readonly type = START_SENDING_TESTS;
}

export class SendTests implements Action {
  readonly type = SEND_TESTS;
}

export class SendTestsSuccess implements Action {
  readonly type = SEND_TESTS_SUCCESS;
}

export class SendTestsFailure implements Action {
  readonly type = SEND_TESTS_FAILURE;
}

export type Types =
  | PersistTests
  | LoadPersistedTests
  | LoadPersistedTestsSuccess
  | SetActivityCode
  | StartPracticeTest
  | StartSendingTests
  | SendTests
  | SendTestsSuccess
  | SendTestsFailure;
