import { Action } from '@ngrx/store';

export const TEST_STATUS_STARTED = '[Test status] Started';

export class TestStatusStarted implements Action {
  readonly type = TEST_STATUS_STARTED;
}

export type Types =
  | TestStatusStarted;
