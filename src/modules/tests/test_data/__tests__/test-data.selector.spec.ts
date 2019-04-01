import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { getDrivingFaultCount, getManoeuvres, hasSeriousFault } from '../test-data.selector';
import { Competencies } from '../test-data.constants';

describe('TestDataSelectors', () => {
  const state: TestData = {
    drivingFaults: {
      controlsGears: 1,
    },
    seriousFaults: {
       awarenessPlanning: true,
    },
    manoeuvres: {
      selectedReverseParkCarpark: true,
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

  describe('manoenvres', () => {
    it('should return the manoeuvres', () => {
      expect(getManoeuvres(state)).toEqual({
        selectedReverseParkCarpark: true,
      });
    });
    it('should return undefined when there hasnt been any driving faults', () => {
      state.manoeuvres = {};
      expect(getManoeuvres(state)).toEqual({});
      expect(getManoeuvres(state).selectedReverseParkCarpark).toEqual(undefined);

    });
  });
});
