import { Action } from '@ngrx/store';

export const POPULATE_TEST_SCHEMA_VERSION = '[Journal Effects] populating test schema version';

export class PopulateTestSchemaVersion implements Action {
  readonly type = POPULATE_TEST_SCHEMA_VERSION;
  constructor(public payload: string) {}
}

export type Types =
  | PopulateTestSchemaVersion;
