import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { TestData } from '@dvsa/mes-test-schema/categories/CPC';

import { combinationReducer } from './combination/combination.reducer';
import { totalPercentageReducer } from './overall-score/total-percentage.reducer';
import { questionReducer } from './question/question.reducer';
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
    question1: questionReducer,
    question2: questionReducer,
    question3: questionReducer,
    question4: questionReducer,
    // @TODO - Create bespoke question5 reducer
    question5: nullReducer,
    totalPercent: totalPercentageReducer,
  })(state as Required<TestData>, action);
}

export const getTestData = createFeatureSelector<TestData>('testData');
