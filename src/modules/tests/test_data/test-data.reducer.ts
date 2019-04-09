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
    case testDataActions.ADD_DRIVING_FAULT:
      return {
        ...state,
        drivingFaults: {
          ...state.drivingFaults,
          [action.payload.competency]: action.payload.newFaultCount,
        },
      };
    case testDataActions.RECORD_MANOEUVRES_SELECTION:
      return {
        ...state,
        manoeuvres: {
          [action.manoeuvre]: true,
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
    case testDataActions.TOGGLE_NORMAL_START_1:
      return {
        ...state,
        testRequirements: {
          ...state.testRequirements,
          normalStart1: !state.testRequirements.normalStart1,
        },
      };
    case testDataActions.TOGGLE_NORMAL_START_2:
      return {
        ...state,
        testRequirements: {
          ...state.testRequirements,
          normalStart2: !state.testRequirements.normalStart2,
        },
      };
    case testDataActions.TOGGLE_ANGLED_START:
      return {
        ...state,
        testRequirements: {
          ...state.testRequirements,
          angledStart: !state.testRequirements.angledStart,
        },
      };
    case testDataActions.TOGGLE_HILL_START:
      return {
        ...state,
        testRequirements: {
          ...state.testRequirements,
          hillStart: !state.testRequirements.hillStart,
        },
      };
    case testDataActions.TOGGLE_VERBAL_ETA:
      return {
        ...state,
        ETA: {
          ...state.ETA,
          verbal: !state.ETA.verbal,
        },
      };
    case testDataActions.TOGGLE_PHYSICAL_ETA:
      return {
        ...state,
        ETA: {
          ...state.ETA,
          physical: !state.ETA.physical,
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

    default:
      return state;
  }
}

export const getTestData = createFeatureSelector<TestData>('testData');
