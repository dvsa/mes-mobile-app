import { Action } from '@ngrx/store';

export const POPULATE_TEST_CATEGORY = '[Journal Effects] populating test category';

export class PopulateTestCategory implements Action {
  readonly type = POPULATE_TEST_CATEGORY;
  constructor(public payload: string) {}
}

export type Types =
  | PopulateTestCategory;
