import { Action } from '@ngrx/store';
import { TestsModel } from '../tests.reducer';

export const TEST_STATUS_STARTED = '[Test status] Started';
export const TEST_STATUS_DECIDED = '[Test status] Decided';
export const TEST_STATUS_LOAD = '[Test status] Load';
export const TEST_STATUS_RESTORE = '[Test status] Restore';

export class TestStatusStarted implements Action {
  readonly type = TEST_STATUS_STARTED;
}

export class TestStatusDecided implements Action {
  readonly type = TEST_STATUS_DECIDED;
}

export class TestStatusLoad implements Action {
  readonly type = TEST_STATUS_LOAD;
}

export class TestStatusRestore implements Action {
  readonly type = TEST_STATUS_RESTORE;
  constructor(public tests: TestsModel) {}
}

export type Types =
  | TestStatusStarted
  | TestStatusDecided
  | TestStatusLoad
  | TestStatusRestore;
