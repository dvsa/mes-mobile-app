import { TestData, VehicleChecks, QuestionOutcome } from '@dvsa/mes-test-schema/categories/B';
import {
  getDrivingFaultCount,
  hasSeriousFault,
  getTestRequirements,
  hasDangerousFault,
  getETAFaultText,
  getEcoFaultText,
  getManoeuvres,
  hasManoeuvreBeenCompleted,
  getDrivingFaultSummaryCount,
  isTellMeQuestionSelected,
  isTellMeQuestionCorrect,
  isTellMeQuestionDrivingFault,
  hasVehicleChecksBeenCompleted,
  getCatBLegalRequirements,
  getShowMeQuestionOptions,
  getSeriousFaultSummaryCount,
  getDangerousFaultSummaryCount,
} from '../test-data.selector';
import { Competencies } from '../test-data.constants';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { CatBLegalRequirements } from '../test-data.models';
import { initialState } from '../test-data.reducer';
import { ShowMeQuestion } from '../../../../providers/question/show-me-question.model';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../../pages/office/office-behaviour-map';

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
  };

  describe('getShowMeQuestionOptions', () => {
    const outcomeBehaviourMapProvider = new OutcomeBehaviourMapProvider();
    outcomeBehaviourMapProvider.setBehaviourMap(behaviourMap);

    const showMeQuestions: ShowMeQuestion[] = [
      {
        code: 'S1',
        description: 'S1 Desc',
        shortName: 'S1 short',
      },
      {
        code: 'S1',
        description: 'S1 Desc',
        shortName: 'S1 short',
      },
    ];
    it('should return the same list of questions if outcome field does not have showNotApplicable set', () => {
      const result = getShowMeQuestionOptions(showMeQuestions, '1', outcomeBehaviourMapProvider);
      expect(result).toEqual(showMeQuestions);
    });
    it('should return extra question if outcome showNotApplicable set', () => {
      const result = getShowMeQuestionOptions(showMeQuestions, '4', outcomeBehaviourMapProvider);
      expect(result.length).toBe(3);
      expect(result[2].code).toBe('NA');
    });

  });

  describe('getDrivingFaultCount', () => {
    it('should return the driving fault count', () => {
      expect(getDrivingFaultCount(state, Competencies.controlsGears)).toBe(1);
    });
    it('should return undefined when there hasnt been any driving faults', () => {
      expect(getDrivingFaultCount(state, Competencies.controlsParkingBrake)).toBeUndefined();
    });
  });

  describe('getDrivingFaultSummaryCount', () => {
    it('should return the driving fault count correctly', () => {
      expect(getDrivingFaultSummaryCount(state)).toBe(3);
    });
  });

  describe('getSeriousFaultSummaryCount', () => {
    it('should return the serious faults count', () => {
      expect(getSeriousFaultSummaryCount(state)).toBe(1);
    });
    it('should return the correct count of serious faults', () => {
      const failedState: TestData = {
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
      };
      expect(getSeriousFaultSummaryCount(failedState)).toBe(4);
    });
  });

  describe('getDangerousFaultSummaryCount', () => {
    it('should return the dangerous faults count', () => {
      expect(getDangerousFaultSummaryCount(state)).toBe(1);
    });
    it('should return the correct number of dangerous faults', () => {
      const failedState: TestData = {
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
      expect(getDangerousFaultSummaryCount(failedState)).toBe(4);
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

  describe('getETAFaultText', () => {
    it('should return null if no ETA faults', () => {
      const result = getETAFaultText(state.ETA);
      expect(result).toBeUndefined();
    });
    it('should return `Physical and Verbal` if both ETA faults', () => {
      state.ETA.physical = true;
      state.ETA.verbal = true;
      const result = getETAFaultText(state.ETA);
      expect(result).toEqual('Physical and Verbal');
    });
    it('should return `Physical` if just physical ETA fault', () => {
      state.ETA.physical = true;
      state.ETA.verbal = false;
      const result = getETAFaultText(state.ETA);
      expect(result).toEqual('Physical');
    });
    it('should return `Verbal` if just verbal ETA fault', () => {
      state.ETA.physical = false;
      state.ETA.verbal = true;
      const result = getETAFaultText(state.ETA);
      expect(result).toEqual('Verbal');
    });
  });

  describe('getEcoFaultText', () => {
    it('should return null if no eco faults', () => {
      const result = getEcoFaultText(state.eco);
      expect(result).toBeUndefined();
    });
    it('should return `Control and Planning` if both eco faults', () => {
      state.eco.adviceGivenControl = true;
      state.eco.adviceGivenPlanning = true;
      const result = getEcoFaultText(state.eco);
      expect(result).toEqual('Control and Planning');
    });
    it('should return `Control` if just control eco fault', () => {
      state.eco.adviceGivenControl = true;
      state.eco.adviceGivenPlanning = false;
      const result = getEcoFaultText(state.eco);
      expect(result).toEqual('Control');
    });
    it('should return `Planning` if just planning eco fault', () => {
      state.eco.adviceGivenControl = false;
      state.eco.adviceGivenPlanning = true;
      const result = getEcoFaultText(state.eco);
      expect(result).toEqual('Planning');
    });
  });

  describe('getManoeuvres', () => {
    it('should retrive the manoeuvres data when requested', () => {
      const result = getManoeuvres(state);
      expect(result).toEqual(state.manoeuvres);
    });
  });

  describe('hasManoeuvreBeenCompleted', () => {
    it('should return false when no manoeuvres have been completed', () => {
      const state: TestData = {
        manoeuvres: {},
      };
      expect(hasManoeuvreBeenCompleted(state)).toBeFalsy();
    });
    it('should return true when a manoeuvre has been completed', () => {
      const state: TestData = {
        manoeuvres: {
          forwardPark: { selected: true },
        },
      };
      expect(hasManoeuvreBeenCompleted(state)).toBeTruthy();
    });
  });

  describe('vehicle checks selector', () => {
    describe('isTellMeQuestionSelected', () => {
      it('should return true if there is a tell me question selected', () => {
        const state: VehicleChecks = {
          tellMeQuestion: {
            code: 'T1',
            description: 'desc',
            outcome: CompetencyOutcome.P,
          },
        };
        expect(isTellMeQuestionSelected(state)).toBe(true);
      });
      it('should return false if there is no tell me question selected', () => {
        expect(isTellMeQuestionSelected({})).toBe(false);
      });
    });
    describe('isTellMeQuestionCorrect', () => {
      const passedState: VehicleChecks = {
        tellMeQuestion: {
          code: 'T1',
          description: 'desc',
          outcome: CompetencyOutcome.P,
        },
      };

      it('should return true if the tell me question is marked as a pass', () => {
        expect(isTellMeQuestionCorrect(passedState)).toBe(true);
      });
      it('should return false if the tell me question is marked as a driving fault', () => {
        const failedState = {
          ...passedState,
          tellMeQuestion: {
            outcome: 'DF' as QuestionOutcome,
          },
        };
        expect(isTellMeQuestionCorrect(failedState)).toBe(false);
      });
    });
    describe('isTellMeQuestionDrivingFault', () => {
      const faultState: VehicleChecks = {
        tellMeQuestion: {
          code: 'T1',
          description: 'desc',
          outcome: 'DF',
        },
      };

      it('should return true if the tell me question is marked as a pass', () => {
        expect(isTellMeQuestionDrivingFault(faultState)).toBe(true);
      });
      it('should return false if the tell me question is marked as a driving fault', () => {
        const passedState = {
          ...faultState,
          tellMeQuestion: {
            outcome: CompetencyOutcome.P,
          },
        };
        expect(isTellMeQuestionDrivingFault(passedState)).toBe(false);
      });
    });

    describe('hasVehicleChecksBeenCompleted', () => {
      it('should return true if vehicle checks have been completed with a pass', () => {
        const state = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: CompetencyOutcome.P,
            },
            tellMeQuestion: {
              outcome: CompetencyOutcome.P,
            },
          },
        } as TestData;

        expect(hasVehicleChecksBeenCompleted(state)).toBeTruthy();
      });
      it('should return true if vehicle checks have been completed with a driving fault', () => {
        const state = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: CompetencyOutcome.DF,
            },
            tellMeQuestion: {
              outcome: CompetencyOutcome.DF,
            },
          },
        } as TestData;

        expect(hasVehicleChecksBeenCompleted(state)).toBeTruthy();
      });
      it('should return true if vehicle checks have been completed with a serious fault', () => {
        const state = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: CompetencyOutcome.S,
            },
            tellMeQuestion: {
              outcome: CompetencyOutcome.S,
            },
          },
        } as TestData;

        expect(hasVehicleChecksBeenCompleted(state)).toBeTruthy();
      });
      it('should return true if vehicle checks have been completed with a dangerous fault', () => {
        const state = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: CompetencyOutcome.D,
            },
            tellMeQuestion: {
              outcome: CompetencyOutcome.D,
            },
          },
        } as TestData;

        expect(hasVehicleChecksBeenCompleted(state)).toBeTruthy();
      });
      it('should return false if show me question outcome is not defined', () => {
        const state = {
          vehicleChecks: {
            showMeQuestion: {
            },
            tellMeQuestion: {
              outcome: CompetencyOutcome.DF,
            },
          },
        } as TestData;

        expect(hasVehicleChecksBeenCompleted(state)).toBeFalsy();
      });
    });
    describe('getCatBLegalRequirements', () => {
      it('should return all the data when it exists in test data', () => {
        const state = {
          testRequirements: {
            angledStart: true,
            hillStart: true,
            normalStart1: true,
            normalStart2: true,
          },
          manoeuvres: {
            forwardPark: {
              selected: true,
            },
          },
          eco: {
            completed: true,
          },
          vehicleChecks: {
            showMeQuestion: {
              outcome: CompetencyOutcome.S,
            },
            tellMeQuestion: {
              outcome: CompetencyOutcome.P,
            },
          },
        } as TestData;

        expect(getCatBLegalRequirements(state)).toEqual({
          normalStart1: true,
          normalStart2: true,
          angledStart: true,
          hillStart: true,
          manoeuvre: true,
          vehicleChecks: true,
          eco: true,
        } as CatBLegalRequirements);
      });
      it('should return false for the data if it is not in the state', () => {
        expect(getCatBLegalRequirements(initialState)).toEqual({
          normalStart1: false,
          normalStart2: false,
          angledStart: false,
          hillStart: false,
          manoeuvre: false,
          vehicleChecks: false,
          eco: false,
        } as CatBLegalRequirements);
      });
    });
  });
});
