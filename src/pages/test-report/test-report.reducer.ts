import { createFeatureSelector } from '@ngrx/store';

import * as testReportActions from './test-report.actions';
import { TestReportModel } from './test-report.model';

export const initialState: TestReportModel = {
  seriousMode: false,
  dangerousMode: false,
  removeFaultMode: false,
  isLegalRequirementsValid: false,
  isEtaValid: true,
};

export function testReportReducer(state = initialState, action: testReportActions.Types): TestReportModel {
  switch (action.type) {
    case testReportActions.TOGGLE_REMOVE_FAULT_MODE:
      return {
        ...state,
        removeFaultMode: !state.removeFaultMode,
      };
    case testReportActions.TOGGLE_SERIOUS_FAULT_MODE:
      return {
        ...state,
        seriousMode: !state.seriousMode,
      };
    case testReportActions.TOGGLE_DANGEROUS_FAULT_MODE:
      return {
        ...state,
        dangerousMode: !state.dangerousMode,
      };
    case testReportActions.VALIDATE_LEGAL_REQUIREMENTS:
      return {
        ...state,
        isLegalRequirementsValid: action.payload,
      };
    case testReportActions.VALIDATE_ETA:
      return {
        ...state,
        isEtaValid: action.isValid,
      };
    default:
      return state;
  }
}

export const getTestReportState = createFeatureSelector<TestReportModel>('testReport');
