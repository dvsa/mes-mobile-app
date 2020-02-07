import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import {
  hasSeriousFault,
  hasDangerousFault,
  getETAFaultText,
  getEcoFaultText,
  getShowMeQuestionOptions,
} from '../../common/test-data.selector';
import {
  getDrivingFaultCount,
  getManoeuvres,
  hasManoeuvreBeenCompletedCatD,
  areTellMeQuestionsSelected,
  areTellMeQuestionsCorrect,
  hasVehicleChecksBeenCompletedCatD,
} from '../test-data.cat-d.selector';
import { Competencies } from '../../test-data.constants';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { OutcomeBehaviourMapProvider } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../../../pages/office/office-behaviour-map';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';

describe('TestDataSelectors', () => {
  const state: CatDUniqueTypes.TestData = {
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
      angledStartControlledStop: true,
      downhillStart: true,
      uphillStart: true,
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
    safetyQuestions: {
      questions: [
        {
          description: '',
          outcome: CompetencyOutcome.DF,
        },
      ],
    },
  };

  describe('getShowMeQuestionOptions', () => {
    const outcomeBehaviourMapProvider = new OutcomeBehaviourMapProvider();
    outcomeBehaviourMapProvider.setBehaviourMap(behaviourMap);

    const showMeQuestions: VehicleChecksQuestion[] = [
      {
        code: 'S1',
        description: 'S1 Desc',
        shortName: 'S1 short',
      },
      {
        code: 'S2',
        description: 'S2 Desc',
        shortName: 'S2 short',
      },
      {
        code: 'N/A',
        description: 'Not applicable',
        shortName: 'Not applicable',
      },
    ];
    it('should return the list of questions without N/A if outcome field does not have showNotApplicable set', () => {
      const result = getShowMeQuestionOptions(showMeQuestions, '1', outcomeBehaviourMapProvider);
      expect(result.length).toBe(2);
      expect(result[0].code).toBe('S1');
      expect(result[1].code).toBe('S2');
    });
    it('should return extra question if outcome showNotApplicable set', () => {
      const result = getShowMeQuestionOptions(showMeQuestions, '4', outcomeBehaviourMapProvider);
      expect(result.length).toBe(3);
      expect(result[2].code).toBe('N/A');
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

  describe('hasSeriousFault', () => {
    it('should return true if a competency has a serious fault', () => {
      expect(hasSeriousFault(state, Competencies.awarenessPlanning)).toEqual(true);
    });
    it('should return false if a competency does not have a serious fault', () => {
      expect(hasSeriousFault(state, Competencies.controlsClutch)).toBeFalsy();
    });
  });

  describe('hasDangerousFault', () => {
    it('should return true if a competency has a dangerous fault', () => {
      expect(hasDangerousFault(state, Competencies.useOfSpeed)).toEqual(true);
    });
    it('should return false if a competency does not have a dangerous fault', () => {
      expect(hasDangerousFault(state, Competencies.useOfMirrorsSignalling)).toBeFalsy();
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
      const state: CatDUniqueTypes.TestData = {
        manoeuvres: {},
      };
      expect(hasManoeuvreBeenCompletedCatD(state)).toBeFalsy();
    });
    it('should return true when a manoeuvre has been completed', () => {
      const state: CatDUniqueTypes.TestData = {
        manoeuvres: {
          reverseLeft: { selected: true },
        },
      };
      expect(hasManoeuvreBeenCompletedCatD(state)).toEqual(true);
    });
  });

  describe('vehicle checks selector', () => {
    describe('areTellMeQuestionsSelected', () => {
      it('should return true if there is a tell me question selected', () => {
        const state: CatDUniqueTypes.VehicleChecks = {
          tellMeQuestions: [
            {
              code: 'T1',
              description: 'desc',
              outcome: CompetencyOutcome.P,
            },
          ],
        };
        expect(areTellMeQuestionsSelected(state)).toBe(true);
      });
      it('should return false if there is no tell me question selected', () => {
        expect(areTellMeQuestionsSelected({})).toBe(false);
      });
    });
    describe('areTellMeQuestionsCorrect', () => {
      const passedState: CatDUniqueTypes.VehicleChecks = {
        tellMeQuestions: [
          {
            code: 'T1',
            description: 'desc',
            outcome: CompetencyOutcome.P,
          },
        ],
      };

      it('should return true if the tell me question is marked as a pass', () => {
        expect(areTellMeQuestionsCorrect(passedState)).toBe(true);
      });
      it('should return false if the tell me question is marked as a driving fault', () => {
        const failedState: CatDUniqueTypes.VehicleChecks = {
          tellMeQuestions: [
            {
              code: 'T1',
              description: 'desc',
              outcome: CompetencyOutcome.D,
            },
          ],
        };
        expect(areTellMeQuestionsCorrect(failedState)).toBe(false);
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
              {
                outcome: CompetencyOutcome.P,
              },
              {
                outcome: CompetencyOutcome.P,
              },
            ],
            tellMeQuestions: [
              {
                outcome: CompetencyOutcome.P,
              },
              {
                outcome: CompetencyOutcome.P,
              },
            ],
          },
        } as CatDUniqueTypes.TestData;

        expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
      });
      it('should return true if vehicle checks have been completed with a driving fault', () => {
        const state = {
          vehicleChecks: {
            showMeQuestions: [
              {
                outcome: CompetencyOutcome.DF,
              },
              {
                outcome: CompetencyOutcome.DF,
              },
              {
                outcome: CompetencyOutcome.DF,
              },
            ],
            tellMeQuestions: [
              {
                outcome: CompetencyOutcome.DF,
              },
              {
                outcome: CompetencyOutcome.DF,
              },
            ],
          },
        } as CatDUniqueTypes.TestData;

        expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
      });
      it('should return true if vehicle checks have been completed with a serious fault', () => {
        const state = {
          vehicleChecks: {
            showMeQuestions: [
              {
                outcome: CompetencyOutcome.S,
              },
              {
                outcome: CompetencyOutcome.S,
              },
              {
                outcome: CompetencyOutcome.S,
              },
            ],
            tellMeQuestions: [
              {
                outcome: CompetencyOutcome.S,
              },
              {
                outcome: CompetencyOutcome.S,
              },
            ],
          },
        } as CatDUniqueTypes.TestData;

        expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
      });
      it('should return true if vehicle checks have been completed with a dangerous fault', () => {
        const state = {
          vehicleChecks: {
            showMeQuestions: [
              {
                outcome: CompetencyOutcome.D,
              },
              {
                outcome: CompetencyOutcome.D,
              },
              {
                outcome: CompetencyOutcome.D,
              },
            ],
            tellMeQuestions: [
              {
                outcome: CompetencyOutcome.D,
              },
              {
                outcome: CompetencyOutcome.D,
              },
            ],
          },
        } as CatDUniqueTypes.TestData;

        expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(true);
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
              {
                outcome: CompetencyOutcome.DF,
              },
            ],
          },
        } as CatDUniqueTypes.TestData;

        expect(hasVehicleChecksBeenCompletedCatD(state)).toEqual(false);
      });
    });
  });
});