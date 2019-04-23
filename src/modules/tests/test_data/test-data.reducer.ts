import { TestData, Manoeuvres } from '@dvsa/mes-test-schema/categories/B';
import * as testDataActions from './test-data.actions';
import { createFeatureSelector } from '@ngrx/store';
import { Competencies, ManoeuvreCompetencies } from './test-data.constants';
import { ManoeuvreTypes } from '../../../pages/test-report/components/manoeuvres-popover/manoeuvres-popover.constants';
import { pickBy, startsWith } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export const initialState: TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
  ETA: {},
  eco: {},
};

export function testDataReducer(
  state = initialState,
  action: testDataActions.Types,
): TestData {
  switch (action.type) {
    case testDataActions.RECORD_MANOEUVRES_SELECTION:
      return {
        ...state,
        manoeuvres: preserveOutcomesAndGenerateNewManoeuvresState(state.manoeuvres, action.manoeuvre),
      };
    case testDataActions.ADD_MANOEUVRE_DRIVING_FAULT:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.payload]: CompetencyOutcome.DF,
        },
      };
    case testDataActions.ADD_MANOEUVRE_SERIOUS_FAULT:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.payload]: CompetencyOutcome.S,
        },
      };
    case testDataActions.ADD_MANOEUVRE_DANGEROUS_FAULT:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          [action.payload]: CompetencyOutcome.D,
        },
      };
    case testDataActions.REMOVE_MANOEUVRE_FAULT:
      const manoeuvre = action.payload as ManoeuvreCompetencies;
      const { [manoeuvre]: removedManoeuvre, ...updatedManoeuvres } = state.manoeuvres;
      return {
        ...state,
        manoeuvres: updatedManoeuvres,
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
    case testDataActions.ADD_DANGEROUS_FAULT:
      return {
        ...state,
        dangerousFaults: {
          ...state.dangerousFaults,
          [action.payload]: true,
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
    case testDataActions.TOGGLE_CONTROL_ECO :
      return {
        ...state,
        eco: {
          ...state.eco,
          adviceGivenControl: !state.eco.adviceGivenControl,
        },
      };
    case testDataActions.TOGGLE_PLANNING_ECO :
      return {
        ...state,
        eco: {
          ...state.eco,
          adviceGivenPlanning: !state.eco.adviceGivenPlanning,
        },
      };
    case testDataActions.TOGGLE_CONTROLLED_STOP:
      if (state.manoeuvres.selectedControlledStop) {
        const { selectedControlledStop : removedManoeuvre, ...updatedManoeuvres } = state.manoeuvres;
        return {
          ...state,
          manoeuvres: updatedManoeuvres,
        };
      }
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          selectedControlledStop: !state.manoeuvres.selectedControlledStop,
        },
      };
    case testDataActions.CONTROLLED_STOP_COMPLETE:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          selectedControlledStop: true,
        },
      };
    default:
      return state;
  }
}
/**
 * @param  {Manoeuvres} currentState
 * @param  {ManoeuvreTypes} manoeuvre
 * @returns Manoeuvres
 * Generate the manoeuvres slice of state when recording a new manoeuvre
 * Needs a separate function due to the need to preserve the outcomes of controlled stop
 */
const preserveOutcomesAndGenerateNewManoeuvresState = (
  currentState: Manoeuvres,
  manoeuvre: ManoeuvreTypes,
): Manoeuvres => {
  const savedOutcomes = pickBy(currentState, (value, key) => startsWith(key, 'outcome'));
  const { selectedControlledStop } = currentState;
  return {
    ...savedOutcomes,
    selectedControlledStop,
    [manoeuvre]: true,
  };
};

export const getTestData = createFeatureSelector<TestData>('testData');
