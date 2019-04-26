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
          [action.competencyName]: action.comment,
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
          [action.competencyName]: action.comment,
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
          [action.competencyName]: action.comment,
        },
      };
    case testDataActions.REMOVE_DRIVING_FAULT:
      if (action.payload.newFaultCount === 0) {
        const { [action.payload.competency] : removedDrivingFault, ...updatedDrivingFaults } = state.drivingFaults;
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
    case testDataActions.REMOVE_DANGEROUS_FAULT :
      const dangerousCompetency = action.payload as Competencies;
      const { [dangerousCompetency]: removedDangerousFault, ...updatedDangerousFaults } = state.dangerousFaults;
      return {
        ...state,
        dangerousFaults: updatedDangerousFaults,
      };
    case testDataActions.TOGGLE_LEGAL_REQUIREMENT :
      return {
        ...state,
        testRequirements: {
          ...state.testRequirements,
          [action.payload]: !state.testRequirements[action.payload],
        },
      };
    case testDataActions.TOGGLE_ETA :
      return {
        ...state,
        ETA: {
          ...state.ETA,
          [action.payload]: !state.ETA[action.payload],
        },
      };
    case testDataActions.TOGGLE_ECO :
      return {
        ...state,
        eco: {
          ...state.eco,
          completed: !state.eco.completed,
        },
      };
    case testDataActions.TOGGLE_CONTROL_ECO :
      if (!state.eco.adviceGivenControl) {
        return {
          ...state,
          eco: {
            ...state.eco,
            adviceGivenControl: !state.eco.adviceGivenControl,
            completed: true,
          },
        };
      }
      return {
        ...state,
        eco: {
          ...state.eco,
          adviceGivenControl: !state.eco.adviceGivenControl,
        },
      };
    case testDataActions.TOGGLE_PLANNING_ECO :
      if (!state.eco.adviceGivenPlanning) {
        return {
          ...state,
          eco: {
            ...state.eco,
            adviceGivenPlanning: !state.eco.adviceGivenPlanning,
            completed: true,
          },
        };
      }
      return {
        ...state,
        eco: {
          ...state.eco,
          adviceGivenPlanning: !state.eco.adviceGivenPlanning,
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
    default:
      return state;
  }
}

export const getTestData = createFeatureSelector<TestData>('testData');
