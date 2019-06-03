import { Action } from '@ngrx/store';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';

export const POPULATE_TEST_SLOT_ATTRIBUTES = '[TestSlotAttributesEffects] Populate Test slot attributes';
export const WELSH_TEST_CHANGED = '[TestSlotAttributes] Welsh test changed';

export class PopulateTestSlotAttributes implements Action {
  readonly type = POPULATE_TEST_SLOT_ATTRIBUTES;
  constructor(public payload: TestSlotAttributes) {}
}

export class WelshTestChanged implements Action {
  readonly type = WELSH_TEST_CHANGED;
  constructor(public isWelsh: boolean) { }
}

export type Types =
  | PopulateTestSlotAttributes
  | WelshTestChanged;
