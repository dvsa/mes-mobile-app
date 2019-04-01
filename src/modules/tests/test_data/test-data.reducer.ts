import { TestData } from '@dvsa/mes-test-schema/categories/B';
import * as testDataActions from './test-data.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
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
          [action.payload.competency] : action.payload.newFaultCount,
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
    case testDataActions.TOGGLE_NORMAL_START_1:
      console.log(`${testDataActions.TOGGLE_NORMAL_START_1} has been dispatched`);
      return {
        ...state,
      };
    case testDataActions.TOGGLE_NORMAL_START_2:
      console.log(`${testDataActions.TOGGLE_NORMAL_START_2} has been dispatched`);
      return {
        ...state,
      };
    case testDataActions.TOGGLE_ANGLED_START:
      console.log(`${testDataActions.TOGGLE_ANGLED_START} has been dispatched`);
      return {
        ...state,
      };
    case testDataActions.TOGGLE_HILL_START:
      console.log(`${testDataActions.TOGGLE_HILL_START} has been dispatched`);
      return {
        ...state,
      };

    default:
      return state;
  }
}

export const getTestData = createFeatureSelector<TestData>('testData');
