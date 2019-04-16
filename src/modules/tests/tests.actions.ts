import { Action } from '@ngrx/store';

import { TestsModel } from './tests.reducer';

export const PERSIST_TESTS = '[Tests] Persist';
export const LOAD_PERSISTED_TESTS = '[Tests] Load persisted';
export const LOAD_PERSISTED_TESTS_SUCCESS = '[Tests] Load persisted success';

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

export type Types =
  | PersistTests
  | LoadPersistedTests
  | LoadPersistedTestsSuccess;
