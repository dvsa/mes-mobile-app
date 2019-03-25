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
        drivingFaults: Object.assign({}, state.drivingFaults, {
          [action.payload.competency] : action.payload.newFaultCount,
        }),
      };

    default:
      return state;
  }
}

export const getTestData = createFeatureSelector<TestData>('testData');
