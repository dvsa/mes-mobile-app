import { Action } from '@ngrx/store';

// TODO: These actions are not relatable to an action in the app. Rename needed.

export const TEST_STATUS_STARTED = '[Test status] Started';
export const TEST_STATUS_DECIDED = '[Test status] Decided';
export const TEST_STATUS_COMPLETED = '[Tests status] Completed';
export const TEST_STATUS_SUBMITTED = '[Tests status] Submitted';

export class TestStatusStarted implements Action {
  readonly type = TEST_STATUS_STARTED;
}

export class TestStatusDecided implements Action {
  readonly type = TEST_STATUS_DECIDED;
}

export class TestStatusCompleted implements Action {
  readonly type = TEST_STATUS_COMPLETED;
}

export class TestStatusSubmitted implements Action {
  readonly type = TEST_STATUS_SUBMITTED;
}

export type Types =
  | TestStatusStarted
  | TestStatusDecided
  | TestStatusCompleted
  | TestStatusSubmitted;
