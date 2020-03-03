import { TestSummary } from '@dvsa/mes-test-schema/categories/AM2';
import { createFeatureSelector } from '@ngrx/store';
import * as fromMod2TestSummaryActions from './test-summary.cat-a-mod2.actions';
import * as fromTestSummaryActions from '../common/test-summary.actions';

export const initialState : TestSummary = {
  routeNumber: null,
  modeOfTransport: null,
  independentDriving: null,
  candidateDescription: null,
  additionalInformation: null,
  weatherConditions: [],
  debriefWitnessed: null,
  D255: null,
  identification: 'Licence',
};

export function testSummaryMod2Reducer(
    state = initialState,
    action: fromTestSummaryActions.Types | fromMod2TestSummaryActions.Types,
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
    case fromTestSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED:
      return {
        ...state,
        independentDriving: action.drivingType,
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
    case fromMod2TestSummaryActions.MODE_OF_TRANSPORT_CHANGED:
      return {
        ...state,
        modeOfTransport: action.modeOfTransport,
      };
    default:
      return state;
  }
}

export const getTestSummary = createFeatureSelector<TestSummary>('testSummary');
