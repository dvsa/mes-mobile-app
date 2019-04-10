import { Action } from '@ngrx/store';

export const TEST_STATUS_STARTED = '[Test status] Started';
export const TEST_STATUS_DECIDED = '[Test status] Decided';

export class TestStatusStarted implements Action {
  readonly type = TEST_STATUS_STARTED;
}

export class TestStatusDecided implements Action {
  readonly type = TEST_STATUS_DECIDED;
}

export type Types =
  | TestStatusStarted
  | TestStatusDecided;
