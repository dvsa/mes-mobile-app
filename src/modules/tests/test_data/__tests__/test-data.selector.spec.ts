import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { getDrivingFaultCount, hasSeriousFault, getTestRequirements, hasDangerousFault } from '../test-data.selector';
import { Competencies } from '../test-data.constants';

describe('TestDataSelectors', () => {
  const state: TestData = {
    drivingFaults: {
      controlsGears: 1,
    },
    seriousFaults: {
       awarenessPlanning: true,
    },
    dangerousFaults: {
      useOfSpeed: true,
    },
    testRequirements: {
      normalStart1: true,
      normalStart2: true,
      angledStart: true,
      hillStart: true,
    },
  };

  describe('getDrivingFaultCount', () => {
    it('should return the driving fault count', () => {
      expect(getDrivingFaultCount(state, Competencies.controlsGears)).toBe(1);
    });
    it('should return undefined when there hasnt been any driving faults', () => {
      expect(getDrivingFaultCount(state, Competencies.controlsParkingBrake)).toBeUndefined();
    });
  });

  describe('hasSeriousFault', () => {
    it('should return true if a competency has a serious fault', () => {
      expect(hasSeriousFault(state, Competencies.awarenessPlanning)).toBeTruthy();
    });
    it('should return false if a competency does not have a serious fault', () => {
      expect(hasSeriousFault(state, Competencies.controlsClutch)).toBeFalsy();
    });
  });

  describe('hasDangerousFault', () => {
    it('should return true if a competency has a dangerous fault', () => {
      expect(hasDangerousFault(state, Competencies.useOfSpeed)).toBeTruthy();
    });
    it('should return false if a competency does not have a dangerous fault', () => {
      expect(hasDangerousFault(state, Competencies.useOfMirrorsSignalling)).toBeFalsy();
    });
  });

  describe('getTestRequirements', () => {
    it('should return all the properties of testRequirements', () => {
      const result = getTestRequirements(state);

      expect(result.normalStart1).toBeTruthy();
      expect(result.normalStart2).toBeTruthy();
      expect(result.angledStart).toBeTruthy();
      expect(result.hillStart).toBeTruthy();
    });
  });
});
