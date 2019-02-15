import { Action } from '@ngrx/store';

export const TEST_OUTCOME_START_TEST = '[TestOutcomePage] Test Outcome start test';

export class TestOutcomeStartTest implements Action {
  readonly type = TEST_OUTCOME_START_TEST;
}

export type Types =
  | TestOutcomeStartTest;
