import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import * as testSlotAttributesActions from './test-slot-attributes.actions';

export const initialState: TestSlotAttributes = {
  welshTest: null,
  slotId: null,
  start: '',
  vehicleTypeCode: '',
  extendedTest: false,
  specialNeeds: false,
};

export function testSlotsAttributesReducer(
  state = initialState,
  action: testSlotAttributesActions.TestSlotAttributesActionTypes,
): TestSlotAttributes {
  switch (action.type) {
    case testSlotAttributesActions.POPULATE_TEST_SLOT_ATTRIBUTES:
      return action.payload;
    default:
      return state;
  }
}

export const getTestSlotAttributes = createFeatureSelector<TestSlotAttributes>('testSlotAttributes');
