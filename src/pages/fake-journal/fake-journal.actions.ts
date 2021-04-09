import { Action } from '@ngrx/store';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const START_E2E_PRACTICE_TEST = '[Tests] Start Full Practice Test';

export class StartE2EPracticeTest implements Action {
  readonly type = START_E2E_PRACTICE_TEST;
  constructor(
    public slotId: string,
    public category: TestCategory) { }
}

export type Types =
  | StartE2EPracticeTest;
