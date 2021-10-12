import { createFeatureSelector } from '@ngrx/store';
import { TestSummary } from '@dvsa/mes-test-schema/categories/CM';
import * as fromTestSummaryActions from '../common/test-summary.actions';

export const initialState: TestSummary = {
  D255: null,
};

export function testSummaryCatManoeuvresReducer(
  state = initialState,
  action: fromTestSummaryActions.Types,
): TestSummary {
  switch (action.type) {
    case fromTestSummaryActions.D255_NO:
      return {
        ...state,
        D255: false,
      };
    default:
      return state;
  }
}

export const getTestSummary = createFeatureSelector<TestSummary>('testSummary');
