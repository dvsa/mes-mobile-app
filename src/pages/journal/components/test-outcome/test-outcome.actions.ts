import { Action } from '@ngrx/store';
import { TestSlot } from '../../../../shared/models/DJournal';

// TODO: This action should  be renamed and probably rethought
export const TEST_OUTCOME_START_TEST = '[TestOutcome] Test Outcome start test';

export class TestOutcomeStartTest implements Action {
  readonly type = TEST_OUTCOME_START_TEST;
  constructor(public payload: TestSlot) {}
}

export type Types =
  | TestOutcomeStartTest;
