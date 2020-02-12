import { TestSummary } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import * as testSummaryActions from './test-summary.actions';

export const initialState : TestSummary = {
  routeNumber: null,
  independentDriving: null,
  candidateDescription: null,
  additionalInformation: null,
  weatherConditions: [],
  debriefWitnessed: null,
  D255: null,
  identification:  'Licence',
};

export function testSummaryReducer(
    state = initialState,
    action: testSummaryActions.Types,
  ): TestSummary {
  switch (action.type) {
    case testSummaryActions.ADDITIONAL_INFORMATION_CHANGED:
      return {
        ...state,
        additionalInformation: action.additionalInformation,
      };
    case testSummaryActions.CANDIDATE_DESCRIPTION_CHANGED:
      return {
        ...state,
        candidateDescription: action.description,
      };
    case testSummaryActions.ROUTE_NUMBER_CHANGED:
      return {
        ...state,
        routeNumber: action.routeNumber,
      };
    case testSummaryActions.DEBRIEF_WITNESSED:
      return {
        ...state,
        debriefWitnessed: true,
      };
    case testSummaryActions.DEBRIEF_UNWITNESSED:
      return {
        ...state,
        debriefWitnessed: false,
      };
    case testSummaryActions.IDENTIFICATION_USED_CHANGED:
      return {
        ...state,
        identification: action.identification,
      };
    case testSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED:
      return {
        ...state,
        independentDriving: action.drivingType,
      };
    case testSummaryActions.D255_YES:
      return {
        ...state,
        D255: true,
      };
    case testSummaryActions.D255_NO:
      return {
        ...state,
        D255: false,
      };
    case testSummaryActions.WEATHER_CONDITIONS_CHANGED:
      return {
        ...state,
        weatherConditions: action.weatherConditions,
      };
    default:
      return state;
  }
}

export const getTestSummary = createFeatureSelector<TestSummary>('testSummary');
