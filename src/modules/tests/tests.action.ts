import { Action } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

export const TESTS_SUBMIT_TEST = '[TestsSubmitTest] Submitted Test';

export class TestsSubmitTest implements Action {
  readonly type = TESTS_SUBMIT_TEST;
  constructor(slotId: number, test: StandardCarTestCATBSchema) {}
}

export type Types =
  | TestsSubmitTest;
