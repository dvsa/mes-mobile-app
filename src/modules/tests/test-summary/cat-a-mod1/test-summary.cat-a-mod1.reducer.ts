import { TestSummary } from '@dvsa/mes-test-schema/categories/AM1';
import { createFeatureSelector } from '@ngrx/store';
import * as fromMod1TestSummaryActions from './test-summary.cat-a-mod1.actions';
import * as fromTestSummaryActions from '../common/test-summary.actions';

export const initialState : TestSummary = {
  routeNumber: null,
  candidateDescription: null,
  additionalInformation: null,
  weatherConditions: [],
  debriefWitnessed: null,
  D255: null,
  identification:  'Licence',
};

export function testSummaryMod1Reducer(
    state = initialState,
    action: fromTestSummaryActions.Types | fromMod1TestSummaryActions.Types,
  ): TestSummary {
  switch (action.type) {
    case fromTestSummaryActions.ADDITIONAL_INFORMATION_CHANGED:
      return {
        ...state,
        additionalInformation: action.additionalInformation,
      };
    case fromTestSummaryActions.CANDIDATE_DESCRIPTION_CHANGED:
      return {
        ...state,
        candidateDescription: action.description,
      };
    case fromTestSummaryActions.ROUTE_NUMBER_CHANGED:
      return {
        ...state,
        routeNumber: action.routeNumber,
      };
    case fromTestSummaryActions.DEBRIEF_WITNESSED:
      return {
        ...state,
        debriefWitnessed: true,
      };
    case fromTestSummaryActions.DEBRIEF_UNWITNESSED:
      return {
        ...state,
        debriefWitnessed: false,
      };
    case fromTestSummaryActions.IDENTIFICATION_USED_CHANGED:
      return {
        ...state,
        identification: action.identification,
      };
    case fromTestSummaryActions.D255_YES:
      return {
        ...state,
        D255: true,
      };
    case fromTestSummaryActions.D255_NO:
      return {
        ...state,
        D255: false,
      };
    case fromTestSummaryActions.WEATHER_CONDITIONS_CHANGED:
      return {
        ...state,
        weatherConditions: action.weatherConditions,
      };
    case fromMod1TestSummaryActions.CIRCUIT_TYPE_CHANGED:
      return {
        ...state,
        circuit: action.circuitType,
      };
    default:
      return state;
  }
}

export const getTestSummary = createFeatureSelector<TestSummary>('testSummary');
