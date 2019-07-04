import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { testSlotsAttributesReducer } from '../test-slot-attributes.reducer';
import { PopulateTestSlotAttributes, WelshTestChanged } from '../test-slot-attributes.actions';
import { DateTime } from '../../../../shared/helpers/date-time';

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
  describe('[TestSlotAttributes] Welsh test changed', () => {
    it('should set the isWelsh indicator to true when passing isWelsh payload as true', () => {
      const isWelsh = true;
      const action = new WelshTestChanged(isWelsh);
      const result = testSlotsAttributesReducer(mockTestSlotAttributes, action);
      expect(result.welshTest).toEqual(true);
    });
    it('should set the isWelsh indicator to false when passing isWelsh payload as false', () => {
      const isWelsh = false;
      const action = new WelshTestChanged(isWelsh);
      const result = testSlotsAttributesReducer(mockTestSlotAttributes, action);
      expect(result.welshTest).toEqual(false);
    });
  });
});
