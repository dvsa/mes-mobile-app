import {
  CatHomeTestData,
  getManoeuvres,
  getVehicleChecks,
  hasVehicleChecksBeenCompletedCatHomeTest,
} from '../test-data.cat-home.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

describe('TestDataSelectors', () => {
  const state: CatHomeTestData = {
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
      uphillStartDesignatedStart: true,
    },
    ETA: {
      physical: false,
      verbal: false,
    },
    eco: {
      adviceGivenControl: false,
      adviceGivenPlanning: false,
    },
    manoeuvres: {
      reverseLeft: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
    },
    vehicleChecks: {
      tellMeQuestions: [
        {
          code: '',
          outcome: CompetencyOutcome.DF,
        },
      ],
      showMeQuestions: [
        {
          code: '',
          outcome: CompetencyOutcome.DF,
        },
      ],
    },
  };

  describe('getManoeuvres', () => {
    it('should retrive the manoeuvres data when requested', () => {
      const result = getManoeuvres(state);
      expect(result).toEqual(state.manoeuvres);
    });
  });

  describe('getVehicleChecks', () => {
    it('should retrive the vehicle checks data when requested', () => {
      const result = getVehicleChecks(state);
      expect(result).toEqual(state.vehicleChecks);
    });
  });

  describe('hasVehicleChecksBeenCompleted', () => {
    it('should return true if vehicle checks have been completed with a pass', () => {
      const state = {
        vehicleChecks: {
          showMeQuestions: [
            {
              outcome: CompetencyOutcome.P,
            },
          ],
          tellMeQuestions: [
            {
              outcome: CompetencyOutcome.P,
            },
          ],
        },
      } as CatHomeTestData;

      expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
    });
    it('should return true if vehicle checks have been completed with a driving fault', () => {
      const state = {
        vehicleChecks: {
          showMeQuestions: [
            {
              outcome: CompetencyOutcome.DF,
            },
          ],
          tellMeQuestions: [
            {
              outcome: CompetencyOutcome.DF,
            },
          ],
        },
      } as CatHomeTestData;

      expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
    });
    it('should return true if vehicle checks have been completed with a serious fault', () => {
      const state = {
        vehicleChecks: {
          showMeQuestions: [
            {
              outcome: CompetencyOutcome.S,
            },
          ],
          tellMeQuestions: [
            {
              outcome: CompetencyOutcome.S,
            },
          ],
        },
      } as CatHomeTestData;

      expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
    });
    it('should return true if vehicle checks have been completed with a dangerous fault', () => {
      const state = {
        vehicleChecks: {
          showMeQuestions: [
            {
              outcome: CompetencyOutcome.D,
            },
          ],
          tellMeQuestions: [
            {
              outcome: CompetencyOutcome.D,
            },
          ],
        },
      } as CatHomeTestData;

      expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(true);
    });
    it('should return false if show me question outcome is not defined', () => {
      const state = {
        vehicleChecks: {
          showMeQuestions: [
          ],
          tellMeQuestions: [
            {
              outcome: CompetencyOutcome.DF,
            },
          ],
        },
      } as CatHomeTestData;

      expect(hasVehicleChecksBeenCompletedCatHomeTest(state)).toEqual(false);
    });
  });
});
