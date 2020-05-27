import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { TestData } from '@dvsa/mes-test-schema/categories/CPC';

import { combinationReducer } from './combination/combination.reducer';
import { totalPercentageReducer } from './overall-score/total-percentage.reducer';
import { nullReducer } from '../../../../shared/classes/null.reducer';
import { question1Reducer, question2Reducer, question3Reducer, question4Reducer } from './question/question.reducer';

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
    // @TODO - Create bespoke question5 reducer
    question5: nullReducer,
    totalPercent: totalPercentageReducer,
  })(state as TestData, action);
}

export const getTestData = createFeatureSelector<TestData>('testData');
