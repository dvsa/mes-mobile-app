import { Action } from '@ngrx/store';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';

export const POPULATE_TEST_SLOT_ATTRIBUTES = '[TestSlotAttributesEffects] Populate Test slot attributes';

export class PopulateTestSlotAttributes implements Action {
  readonly type = POPULATE_TEST_SLOT_ATTRIBUTES;
  constructor(public payload: TestSlotAttributes) {}
}

export type TestSlotAttributesActionTypes =
  | PopulateTestSlotAttributes;
