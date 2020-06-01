import { TestData } from '@dvsa/mes-test-schema/categories/CPC';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { combinationReducer } from './combination/combination.reducer';
import { totalPercentageReducer } from './overall-score/total-percentage.reducer';
import { nullReducer } from '../../../../shared/classes/null.reducer';

const initialState: TestData = {
  combination: null,
  question1: null,
  question2: null,
  question3: null,
  question4: null,
  question5: null,
  totalPercent: null,
};

export function testDataCatCPCReducer(
  state: TestData = initialState,
  action: Action,
): Required<TestData> {
  return combineReducers({
    combination: combinationReducer,
    question1: nullReducer,
    question2: nullReducer,
    question3: nullReducer,
    question4: nullReducer,
    question5: nullReducer,
    totalPercent: totalPercentageReducer,
  })(state as Required<TestData>, action);
}

export const getTestData = createFeatureSelector<TestData>('testData');
