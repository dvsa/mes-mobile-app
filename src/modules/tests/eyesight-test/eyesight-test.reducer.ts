import { Action, createFeatureSelector } from '@ngrx/store';
import { EYESIGHT_RESULT_PASSED, EYESIGHT_RESULT_FAILED, EYESIGHT_RESULT_RESET } from './eyesight-test.actions';

export const initialState: boolean = false;

export const eyesightTestReducer = (
  state = initialState,
  action: Action,
): boolean => {
  switch (action.type) {
    case EYESIGHT_RESULT_PASSED:
    case EYESIGHT_RESULT_FAILED:
      return true;
    case EYESIGHT_RESULT_RESET:
      return initialState;
    default:
      return state;
  }
};

export const getEyesightTestComplete = createFeatureSelector<boolean>('eyesightTestComplete');
