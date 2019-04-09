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
    case testSummaryActions.DEBRIEF_WITNESSED_CHANGED:
      return {
        ...state,
        // TODO needs added to schema debriefWitnessed: action.witnessed,
      };
    case testSummaryActions.IDENTIFICATION_USED_CHANGED:
      return {
        ...state,
        // TODO needs added to schema debriefWitnessed: action.identification,
      };
    case testSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED:
      return {
        ...state,
        // TODO needs added to schema debriefWitnessed: action.drivingType,
      };
    case testSummaryActions.D255_CHANGED:
      return {
        ...state,
        // TODO needs added to schema debriefWitnessed: action.change,
      };
    default:
      return state;
  }
}

export const getTestSummary = createFeatureSelector<TestSummary>('testSummary');
