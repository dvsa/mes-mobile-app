import { Action } from '@ngrx/store';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';

export const POPULATE_TEST_SLOT_ATTRIBUTES = '[TestSlotAttributesEffects] Populate Test slot attributes';
export const SET_START_TIME = '[Delegated Office Page] Set Start Time';

export class PopulateTestSlotAttributes implements Action {
  readonly type = POPULATE_TEST_SLOT_ATTRIBUTES;
  constructor(public payload: TestSlotAttributes) {}
}

export class SetStartDate implements Action {
  readonly type = SET_START_TIME;
  constructor(public payload: string) {}
}

export type Types =
  | PopulateTestSlotAttributes
  | SetStartDate;
