import { TestData } from '@dvsa/mes-test-schema/categories/CPC';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { combinationReducer } from './combination/combination.reducer';
import { totalPercentageReducer } from './overall-score/total-percentage.reducer';
import {
  question1Reducer,
  question2Reducer,
  question3Reducer,
  question4Reducer,
  question5Reducer,
} from './questions/questions.reducer';

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
    question1: question1Reducer,
    question2: question2Reducer,
    question3: question3Reducer,
    question4: question4Reducer,
    question5: question5Reducer,
    totalPercent: totalPercentageReducer,
  })(state as TestData, action);
}

export const getTestData = createFeatureSelector<TestData>('testData');
