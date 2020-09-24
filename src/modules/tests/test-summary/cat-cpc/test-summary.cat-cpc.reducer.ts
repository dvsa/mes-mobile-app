import { createFeatureSelector } from '@ngrx/store';
import * as fromCPCTestSummaryActions from './test-summary.cat-cpc.actions';
import * as fromTestSummaryActions from '../common/test-summary.actions';
import { TestSummary } from '@dvsa/mes-test-schema/categories/CPC';

export const initialState : TestSummary = {
  candidateDescription: null,
  identification: 'Licence',
  D255: false,
  debriefWitnessed: null,
  additionalInformation: null,
  assessmentReport: null,
};

export function testSummaryCPCReducer(
    state = initialState,
    action: fromTestSummaryActions.Types | fromCPCTestSummaryActions.Types,
  ): TestSummary {
  switch (action.type) {
    case fromTestSummaryActions.CANDIDATE_DESCRIPTION_CHANGED:
      return {
        ...state,
        candidateDescription: action.description,
      };
    case fromTestSummaryActions.IDENTIFICATION_USED_CHANGED:
      return {
        ...state,
        identification: action.identification,
      };
    case fromTestSummaryActions.ADDITIONAL_INFORMATION_CHANGED:
      return {
        ...state,
        additionalInformation: action.additionalInformation,
      };
    case fromCPCTestSummaryActions.ASSESSMENT_REPORT_CHANGED:
      return {
        ...state,
        assessmentReport: action.assessmentReport,
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
    default:
      return state;
  }
}

export const getTestSummary = createFeatureSelector<TestSummary>('testSummary');
