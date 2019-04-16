import {
    getTestTime,
    getVehicleSlotType,
    getExtendedTest,
    getSpecialNeeds,
    getSlotId,
} from '../test-slot-attributes.selector';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { DateTime } from '../../../../shared/helpers/date-time';

const testTime = new DateTime().toString();
const formattedTime = DateTime.at(testTime).format('HH:mm');

describe('testSlotAttributes selector', () => {
  const testCentre: TestSlotAttributes = {
    slotId: 1234,
    specialNeeds: true,
    start: testTime,
    vehicleSlotType: 'B57mins',
    extendedTest: true,
    welshTest: true,
  };

  describe('getTestTime', () => {
    it('should return the time of the test', () => {
      expect(getTestTime(testCentre)).toBe(formattedTime);
    });
  });

  describe('getVehicleSlotType', () => {
    it('should return the vehicle slot type', () => {
      expect(getVehicleSlotType(testCentre)).toBe('B57mins');
    });
  });

  describe('getExtendedTest', () => {
    it('should return true if test is an extended test', () => {
      expect(getExtendedTest(testCentre)).toBeTruthy();
    });
  });

  describe('getSpecialNeeds', () => {
    it('should return true if special needs', () => {
      expect(getSpecialNeeds(testCentre)).toBeTruthy();
    });
  });

  describe('getSlotId', () => {
    it('should return the slot id of the test', () => {
      expect(getSlotId(testCentre)).toBe(1234);
    });
  });

});
