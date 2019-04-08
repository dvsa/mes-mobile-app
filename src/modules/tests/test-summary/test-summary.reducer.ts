import { TestSummary } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';
import * as testSummaryActions from '../../../modules/tests/test-summary/test-summary.actions';
// import { has } from 'lodash';

export const initialState : TestSummary = {
  routeNumber: null,
  independentDriving: null,
  candidateDescription: null,
  weatherConditions: [],

};

export function testSummaryReducer(
    state = initialState,
    action: testSummaryActions.Types,
  ): TestSummary {
  switch (action.type) {
    case testSummaryActions.ADDITIONAL_INFORMATION_CHANGED:
      return {
        ...state,
      };
    case testSummaryActions.ROUTE_NUMBER_CHANGED:
      return {
        ...state,
        routeNumber: action.routeNumber,
      };
    default:
      return state;
  }
}

export const getTestSummary = createFeatureSelector<TestSummary>('testSummary');
