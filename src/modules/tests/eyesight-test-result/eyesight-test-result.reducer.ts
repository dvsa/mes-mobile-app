import { Action, createFeatureSelector } from '@ngrx/store';
import { EyesightTestResult } from '@dvsa/mes-test-schema/categories/B';
import { EYESIGHT_RESULT_PASSED, EYESIGHT_RESULT_FAILED, EYESIGHT_RESULT_RESET } from './eyesight-test-result.actions';

export const initialState: EyesightTestResult = null;

export const eyesightTestResultReducer = (
  state = initialState,
  action: Action,
): EyesightTestResult => {
  switch (action.type) {
    case EYESIGHT_RESULT_PASSED:
      return 'P';
    case EYESIGHT_RESULT_FAILED:
      return 'F';
    case EYESIGHT_RESULT_RESET:
      return initialState;
    default:
      return state;
  }
};

export const getEyesightTestResult = createFeatureSelector<EyesightTestResult>('eyesightTestResult');
