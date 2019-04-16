import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { testSlotsAttributesReducer } from '../test-slot-attributes.reducer';
import { PopulateTestSlotAttributes } from '../test-slot-attributes.actions';
import { DateTime } from '../../../../shared/helpers/date-time';

const testTime = new DateTime().toString();

describe('testSlotAttributes reducer', () => {
  it('should return the testSlotAttributes for populate test centre actions', () => {
    const mockTestSlotAttributes: TestSlotAttributes = {
      slotId: 1234,
      specialNeeds: true,
      start: testTime,
      vehicleSlotType: 'B57mins',
      extendedTest: true,
      welshTest: true,
    };
    const result = testSlotsAttributesReducer(null, new PopulateTestSlotAttributes(mockTestSlotAttributes));

    expect(result).toBe(mockTestSlotAttributes);
  });
});
