import { Action, createFeatureSelector } from '@ngrx/store';
import * as waitingRoomToCarActions from './waiting-room-to-car.actions';

const initialState = {
  eyesightRadioState: null,
};

export const waitingRoomToCarReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case waitingRoomToCarActions.EYESIGHT_PASS_PRESSED:
      return {
        ...state,
        eyesightRadioState: 'pass',
      };
    case waitingRoomToCarActions.EYESIGHT_FAIL_PRESSED:
      return {
        ...state,
        eyesightRadioState: 'fail',
      };
    case waitingRoomToCarActions.EYESIGHT_FAIL_CANCEL_PRESSED:
      return {
        ...state,
        eyesightRadioState: null,
      };
    case waitingRoomToCarActions.EYESIGHT_FAIL_CONFIRMED:
      return initialState;
    default:
      return state;
  }
};

export const getWaitingRoomToCarState = createFeatureSelector('waitingRoomToCar');
