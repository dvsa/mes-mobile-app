import { Action } from '@ngrx/store';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';

export const POPULATE_TEST_SLOT_ATTRIBUTES = '[TestSlotAttributesEffects] Populate Test slot attributes';

export class PopulateTestSlotAttributes implements Action {
  readonly type = POPULATE_TEST_SLOT_ATTRIBUTES;
  constructor(public payload: TestSlotAttributes) {}
}

export type Types =
  | PopulateTestSlotAttributes;

export const extractTestSlotAttributes = (slotData): TestSlotAttributes => {
  return {
    welshTest: slotData.booking.application.welshTest,
    slotId: slotData.slotDetail.slotId,
    start: slotData.slotDetail.start,
    specialNeeds: slotData.booking.application.specialNeeds,
    vehicleSlotType: slotData.vehicleSlotType,
    extendedTest: slotData.booking.application.extendedTest,
  };
};
