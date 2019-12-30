import { TestCentre } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import * as testCentreActions from './test-centre.actions';

export const initialState: TestCentre = {
  centreId: null,
  costCode: null,
};

export function testCentreReducer(
  state = initialState,
  action: testCentreActions.Types,
): TestCentre {
  switch (action.type) {
    case testCentreActions.POPULATE_TEST_CENTRE:
      return action.payload;
  }
  return state;
}

export const getTestCentre = createFeatureSelector<TestCentre>('testCentre');
