import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../fault-count';
import { TestBed } from '@angular/core/testing';

describe('FaultCountProvider', () => {

  let faultCountProvider: FaultCountProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultCountProvider,
      ],
    });

    faultCountProvider = TestBed.get(FaultCountProvider);
  });

  const state: CatBUniqueTypes.TestData = {
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
    ETA: {
      physical: false,
      verbal: false,
    },
    eco: {
      adviceGivenControl: false,
      adviceGivenPlanning: false,
    },
    manoeuvres: {
      forwardPark: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
    },
    controlledStop: {
      selected: true,
    },
    vehicleChecks: {
      tellMeQuestion: {
        outcome: CompetencyOutcome.DF,
      },
      showMeQuestion: {
        outcome: CompetencyOutcome.P,
      },
    },
    eyesightTest: {
      complete: true,
      seriousFault: false,
    },
  };

  describe('getDrivingFaultSumCountCatB', () => {
    it('should return the driving fault count correctly', () => {
      expect(faultCountProvider.getDrivingFaultSumCountCatB(state)).toBe(3);
    });
  });

  describe('getSeriousFaultSumCountCatB', () => {
    it('should return the serious faults count', () => {
      expect(faultCountProvider.getSeriousFaultSumCountCatB(state)).toBe(1);
    });
    it('should return the correct count of serious faults', () => {
      const failedState: CatBUniqueTypes.TestData = {
        ...state,
        manoeuvres: {
          forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.S,
          },
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.S,
        },
        vehicleChecks: {
          tellMeQuestion: {
            outcome: CompetencyOutcome.DF,
          },
          showMeQuestion: {
            outcome: CompetencyOutcome.S,
          },
        },
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
      expect(faultCountProvider.getSeriousFaultSumCountCatB(failedState)).toBe(5);
    });
  });

  describe('getDangerousFaultSumCountCatB', () => {
    it('should return the dangerous faults count', () => {
      expect(faultCountProvider.getDangerousFaultSumCountCatB(state)).toBe(1);
    });
    it('should return the correct number of dangerous faults', () => {
      const failedState: CatBUniqueTypes.TestData = {
        ...state,
        manoeuvres: {
          forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.D,
          },
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.D,
        },
        vehicleChecks: {
          tellMeQuestion: {
            outcome: CompetencyOutcome.DF,
          },
          showMeQuestion: {
            outcome: CompetencyOutcome.D,
          },
        },
      };
      expect(faultCountProvider.getDangerousFaultSumCountCatB(failedState)).toBe(4);
    });
  });

});
