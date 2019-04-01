import { Action, createFeatureSelector } from '@ngrx/store';
import { EyesightTestResult } from '@dvsa/mes-test-schema/categories/B';
import {
  EYESIGHT_PASS_PRESSED,
  EYESIGHT_FAIL_PRESSED,
  EYESIGHT_FAIL_CONFIRMED,
} from '../../../pages/waiting-room-to-car/waiting-room-to-car.actions';

export const initialState: EyesightTestResult = null;

export const eyesightTestResultReducer = (
  state = initialState,
  action: Action,
): EyesightTestResult => {
  switch (action.type) {
    case EYESIGHT_PASS_PRESSED:
      return 'P';
    case EYESIGHT_FAIL_PRESSED:
      return initialState;
    case EYESIGHT_FAIL_CONFIRMED:
      return 'F';
    default:
      return state;
  }
};

export const getEyesightTestResult = createFeatureSelector('eyesightTestResult');
