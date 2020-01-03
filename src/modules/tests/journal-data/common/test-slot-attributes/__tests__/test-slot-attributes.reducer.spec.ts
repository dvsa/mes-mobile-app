import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';
import { testSlotsAttributesReducer } from '../test-slot-attributes.reducer';
import { PopulateTestSlotAttributes } from '../test-slot-attributes.actions';
import { DateTime } from '../../../../../../shared/helpers/date-time';

const testTime = new DateTime().toString();

describe('testSlotAttributes reducer', () => {
  const mockTestSlotAttributes: TestSlotAttributes = {
    slotId: 1234,
    specialNeeds: true,
    start: testTime,
    vehicleTypeCode: 'C',
    extendedTest: true,
    welshTest: null,
  };
  it('should return the testSlotAttributes for populate test centre actions', () => {
    const result = testSlotsAttributesReducer(null, new PopulateTestSlotAttributes(mockTestSlotAttributes));
    expect(result).toBe(mockTestSlotAttributes);
  });
});
