import {
  getTestTime,
  getSlotId,
  isWelshTest,
  isSpecialNeeds,
  isExtendedTest,
} from '../test-slot-attributes.selector';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { DateTime } from '../../../../shared/helpers/date-time';

const testTime = new DateTime().toString();
const formattedTime = DateTime.at(testTime).format('HH:mm');

describe('testSlotAttributes selector', () => {
  const testSlotAttributes: TestSlotAttributes = {
    slotId: 1234,
    specialNeeds: true,
    start: testTime,
    vehicleTypeCode: 'C',
    extendedTest: true,
    welshTest: true,
  };

  describe('getTestTime', () => {
    it('should return the time of the test', () => {
      expect(getTestTime(testSlotAttributes)).toBe(formattedTime);
    });
  });

  describe('isExtendedTest', () => {
    it('should return true if test is an extended test', () => {
      expect(isExtendedTest(testSlotAttributes)).toBeTruthy();
    });
  });

  describe('isSpecialNeeds', () => {
    it('should return true if special needs', () => {
      expect(isSpecialNeeds(testSlotAttributes)).toBeTruthy();
    });
  });

  describe('getSlotId', () => {
    it('should return the slot id of the test', () => {
      expect(getSlotId(testSlotAttributes)).toBe(1234);
    });
  });

  describe('isWelshTest', () => {
    it('should return if the test is welsh', () => {
      expect(isWelshTest(testSlotAttributes)).toBeTruthy();
    });
  });

});
