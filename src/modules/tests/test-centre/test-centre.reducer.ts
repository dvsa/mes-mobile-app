import { TestCentre } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';
import * as testCentreActions from './test-centre.actions';

export const initialState:TestCentre = {
  costCode: null,
};

export function testCentreReducer(
  state = initialState,
  action: testCentreActions.Types,
): TestCentre {
  switch (action.type) {
    case testCentreActions.POPULATE_TEST_CENTRE:
      console.log(`payload ${JSON.stringify(action.payload)}`);
      return action.payload;
  }
  return state;
}

export const getJournalData = createFeatureSelector<TestCentre>('testCentre');
