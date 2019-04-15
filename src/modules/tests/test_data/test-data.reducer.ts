import { TestData } from '@dvsa/mes-test-schema/categories/B';
import * as testDataActions from './test-data.actions';
import { createFeatureSelector } from '@ngrx/store';

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
        manoeuvres: {
          [action.manoeuvre]: true,
          selectedControlledStop: state.manoeuvres.selectedControlledStop,
          outcomeControlledStop: state.manoeuvres.outcomeControlledStop,
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
      return {
        ...state,
        drivingFaults: {
          ...state.drivingFaults,
          [action.payload.competency]: action.payload.newFaultCount,
        },
      };
    case testDataActions.REMOVE_SERIOUS_FAULT:
      return {
        ...state,
        seriousFaults: {
          ...state.seriousFaults,
          [action.payload]: false,
        },
      };
    case testDataActions.REMOVE_DANGEROUS_FAULT:
      return {
        ...state,
        dangerousFaults: {
          ...state.dangerousFaults,
          [action.payload]: false,
        },
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
    case testDataActions.TOGGLE_CONTROLLED_STOP:
      return {
        ...state,
        manoeuvres: {
          ...state.manoeuvres,
          selectedControlledStop: !state.manoeuvres.selectedControlledStop,
        },
      };

    default:
      return state;
  }
}

export const getTestData = createFeatureSelector<TestData>('testData');
