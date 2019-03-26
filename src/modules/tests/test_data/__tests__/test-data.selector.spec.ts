import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { getDrivingFaultCount } from '../test-data.selector';
import { Competencies } from '../test-data.constants';

describe('TestDataSelectors', () => {
  const state: TestData = {
    drivingFaults: {
      controlsGears: 1,
    },
    testRequirements: {
      normalStart1: false,
      normalStart2: false,
      angledStart: false,
      hillStart: false,
    },
    eco: {},
  };

  describe('getDrivingFaultCount', () => {
    it('should return the driving fault count', () => {
      expect(getDrivingFaultCount(state, Competencies.controlsGears)).toBe(1);
    });
    it('should return undefined when there hasnt been any driving faults', () => {
      expect(getDrivingFaultCount(state, Competencies.controlsParkingBrake)).toBeUndefined();
    });
  });
});
