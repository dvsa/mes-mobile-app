import { Action } from '@ngrx/store';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/Common';

export const POPULATE_TEST_CATEGORY = '[Journal Effects] populating test category';

export class PopulateTestCategory implements Action {
  readonly type = POPULATE_TEST_CATEGORY;
  constructor(public payload: CategoryCode) {}
}

export type Types =
  | PopulateTestCategory;
