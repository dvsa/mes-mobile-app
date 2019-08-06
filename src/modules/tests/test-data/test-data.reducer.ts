import { TestData } from '@dvsa/mes-test-schema/categories/B';
import * as testDataActions from './test-data.actions';
import { createFeatureSelector } from '@ngrx/store';
import { Competencies } from './test-data.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export const initialState: TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
  ETA: {},
  eco: {},
  controlledStop: {},
  eyesightTest: {},
  vehicleChecks: {
    tellMeQuestion: {},
    showMeQuestion: {},
  },
};

export function testDataReducer(
  state = initialState,
  action: testDataActions.Types,
): TestData {
  switch (action.type) {
    case testDataActions.RECORD_MANOEUVRES_SELECTION:
      return {
        ...state,
        manoeuvres: {
          [action.manoeuvre]: {
            ...state.manoeuvres[action.manoeuvre],
            selected: true,
          },
        },
      };
    case testDataActions.ADD_MANOEUVRE_DRIVING_FAULT:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.payload.manoeuvre]: {
            ...state.manoeuvres[action.payload.manoeuvre],
            [action.payload.competency]: CompetencyOutcome.DF,
          },
        },
      };
    case testDataActions.ADD_MANOEUVRE_COMMENT:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.fieldName]: {
            ...state.manoeuvres[action.fieldName],
            [action.controlOrObservation]: action.faultType,
            [`${action.controlOrObservation.toLocaleLowerCase()}FaultComments`]: action.comment,
          },
        },
      };
    case testDataActions.ADD_MANOEUVRE_SERIOUS_FAULT:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.payload.manoeuvre]: {
            ...state.manoeuvres[action.payload.manoeuvre],
            [action.payload.competency]: CompetencyOutcome.S,
          },
        },
      };
    case testDataActions.ADD_MANOEUVRE_DANGEROUS_FAULT:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.payload.manoeuvre]: {
            ...state.manoeuvres[action.payload.manoeuvre],
            [action.payload.competency]: CompetencyOutcome.D,
          },
        },
      };
    case testDataActions.REMOVE_MANOEUVRE_FAULT:
      const {
        [action.payload.competency]: competencyToOmit, ...stateToPreserve
      } = state.manoeuvres[action.payload.manoeuvre];
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.payload.manoeuvre]: stateToPreserve,
        },
      };
    case testDataActions.ADD_DRIVING_FAULT:
      return {
        ...state,
        drivingFaults: {
          ...state.drivingFaults,
          [action.payload.competency]: action.payload.newFaultCount,
        },
      };
    case testDataActions.ADD_DRIVING_FAULT_COMMENT:
      return {
        ...state,
        drivingFaults: {
          ...state.drivingFaults,
          [`${action.competencyName}Comments`]: action.comment,
        },
      };
    case testDataActions.ADD_SERIOUS_FAULT:
      return {
        ...state,
        seriousFaults: {
          ...state.seriousFaults,
          [action.payload]: true,
        },
      };
    case testDataActions.ADD_SERIOUS_FAULT_COMMENT:
      return {
        ...state,
        seriousFaults: {
          ...state.seriousFaults,
          [`${action.competencyName}Comments`]: action.comment,
        },
      };
    case testDataActions.ADD_DANGEROUS_FAULT:
      return {
        ...state,
        dangerousFaults: {
          ...state.dangerousFaults,
          [action.payload]: true,
        },
      };
    case testDataActions.ADD_DANGEROUS_FAULT_COMMENT:
      return {
        ...state,
        dangerousFaults: {
          ...state.dangerousFaults,
          [`${action.competencyName}Comments`]: action.comment,
        },
      };
    case testDataActions.REMOVE_DRIVING_FAULT:
      if (action.payload.newFaultCount === 0) {
        const { [action.payload.competency]: removedDrivingFault, ...updatedDrivingFaults } = state.drivingFaults;
        return {
          ...state,
          drivingFaults: updatedDrivingFaults,
        };
      }
      return {
        ...state,
        drivingFaults: {
          ...state.drivingFaults,
          [action.payload.competency]: action.payload.newFaultCount,
        },
      };
    case testDataActions.REMOVE_SERIOUS_FAULT:
      const seriousCompetency = action.payload as Competencies;
      const { [seriousCompetency]: removedSeriousFault, ...updatedSeriousFaults } = state.seriousFaults;
      return {
        ...state,
        seriousFaults: updatedSeriousFaults,
      };
    case testDataActions.REMOVE_DANGEROUS_FAULT:
      const dangerousCompetency = action.payload as Competencies;
      const { [dangerousCompetency]: removedDangerousFault, ...updatedDangerousFaults } = state.dangerousFaults;
      return {
        ...state,
        dangerousFaults: updatedDangerousFaults,
      };
    case testDataActions.TOGGLE_LEGAL_REQUIREMENT:
      return {
        ...state,
        testRequirements: {
          ...state.testRequirements,
          [action.payload]: !state.testRequirements[action.payload],
        },
      };
    case testDataActions.TOGGLE_ETA:
      return {
        ...state,
        ETA: {
          ...state.ETA,
          [action.payload]: !state.ETA[action.payload],
        },
      };
    case testDataActions.TOGGLE_ECO:
      return {
        ...state,
        eco: {
          ...state.eco,
          completed: !state.eco.completed,
        },
      };
    case testDataActions.TOGGLE_CONTROL_ECO:
      return {
        ...state,
        eco: {
          ...state.eco,
          adviceGivenControl: !state.eco.adviceGivenControl,
        },
      };
    case testDataActions.TOGGLE_PLANNING_ECO:
      return {
        ...state,
        eco: {
          ...state.eco,
          adviceGivenPlanning: !state.eco.adviceGivenPlanning,
        },
      };
    case testDataActions.EYESIGHT_TEST_PASSED:
      return {
        ...state,
        eyesightTest: {
          complete: true,
          seriousFault: false,
        },
      };
    case testDataActions.EYESIGHT_TEST_FAILED:
      return {
        ...state,
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
    case testDataActions.EYESIGHT_TEST_RESET:
      return {
        ...state,
        eyesightTest: {
          complete: false,
          seriousFault: false,
        },
      };
    case testDataActions.EYESIGHT_TEST_ADD_COMMENT:
      return {
        ...state,
        eyesightTest: {
          ...state.eyesightTest,
          faultComments: action.comment,
        },
      };
    case testDataActions.TOGGLE_CONTROLLED_STOP:
      return {
        ...state,
        controlledStop: {
          ...state.controlledStop,
          selected: !state.controlledStop.selected,
        },
      };
    case testDataActions.CONTROLLED_STOP_ADD_DRIVING_FAULT:
      return {
        ...state,
        controlledStop: {
          ...state.controlledStop,
          fault: CompetencyOutcome.DF,
          selected: true,
        },
      };
    case testDataActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT:
      return {
        ...state,
        controlledStop: {
          ...state.controlledStop,
          fault: CompetencyOutcome.S,
          selected: true,
        },
      };
    case testDataActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT:
      return {
        ...state,
        controlledStop: {
          ...state.controlledStop,
          fault: CompetencyOutcome.D,
          selected: true,
        },
      };
    case testDataActions.CONTROLLED_STOP_REMOVE_FAULT:
      return {
        ...state,
        controlledStop: {
          selected: state.controlledStop.selected,
        },
      };
    case testDataActions.ADD_CONTROLLED_STOP_COMMENT:
      return {
        ...state,
        controlledStop: {
          ...state.controlledStop,
          faultComments: action.comment,
        },
      };
    case testDataActions.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          tellMeQuestion: {
            code: action.tellMeQuestion.code as string,
            description: action.tellMeQuestion.shortName as string,
          },
        },
      };
    case testDataActions.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          showMeTellMeComments: action.comment,
        },
      };
    case testDataActions.TELL_ME_QUESTION_CORRECT:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          tellMeQuestion: {
            ...state.vehicleChecks.tellMeQuestion,
            outcome: CompetencyOutcome.P,
          },
        },
      };
    case testDataActions.TELL_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          tellMeQuestion: {
            ...state.vehicleChecks.tellMeQuestion,
            outcome: CompetencyOutcome.DF,
          },
        },
      };
    case testDataActions.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          showMeQuestion: {
            code: action.showMeQuestion.code as string,
            description: action.showMeQuestion.shortName as string,
          },
        },
      };
    case testDataActions.SHOW_ME_QUESTION_PASSED:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          showMeQuestion: {
            ...state.vehicleChecks.showMeQuestion,
            outcome: CompetencyOutcome.P,
          },
        },
      };
    case testDataActions.SHOW_ME_QUESTION_SERIOUS_FAULT:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          showMeQuestion: {
            ...state.vehicleChecks.showMeQuestion,
            outcome: CompetencyOutcome.S,
          },
        },
      };
    case testDataActions.SHOW_ME_QUESTION_DANGEROUS_FAULT:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          showMeQuestion: {
            ...state.vehicleChecks.showMeQuestion,
            outcome: CompetencyOutcome.D,
          },
        },
      };
    case testDataActions.SHOW_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          showMeQuestion: {
            ...state.vehicleChecks.showMeQuestion,
            outcome: CompetencyOutcome.DF,
          },
        },
      };
    case testDataActions.SHOW_ME_QUESTION_REMOVE_FAULT:
      const { outcome, ...notOutcome } = state.vehicleChecks.showMeQuestion;

      return {
        ...state,
        vehicleChecks: {
          ...state.vehicleChecks,
          showMeQuestion: {
            ...notOutcome,
          },
        },
      };
    default:
      return state;
  }
}

export const getTestData = createFeatureSelector<TestData>('testData');
