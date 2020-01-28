import { Action } from '@ngrx/store';
import { TestCentre } from '@dvsa/mes-test-schema/categories/common';

export const POPULATE_TEST_CENTRE = '[TestCentreEffects] Populate test centre';

export class PopulateTestCentre implements Action {
  readonly type = POPULATE_TEST_CENTRE;
  constructor(public payload: TestCentre) {}
}

export type TestCentreActionTypes =
  | PopulateTestCentre;
