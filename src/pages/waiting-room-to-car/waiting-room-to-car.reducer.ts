import { Action, createFeatureSelector } from '@ngrx/store';
import * as waitingRoomToCarActions from './waiting-room-to-car.actions';

export enum EyesightRadioState {
  Unselected = 'Unselected',
  PassSelected = 'PassSelected',
  FailSelected = 'FailSelected',
}

export interface WaitingRoomToCarModel {
  eyesightRadioState: EyesightRadioState;
}

const initialState: WaitingRoomToCarModel = {
  eyesightRadioState: EyesightRadioState.Unselected,
};

export const waitingRoomToCarReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case waitingRoomToCarActions.EYESIGHT_PASS_PRESSED:
      return {
        ...state,
        eyesightRadioState: EyesightRadioState.PassSelected,
      };
    case waitingRoomToCarActions.EYESIGHT_FAIL_PRESSED:
      return {
        ...state,
        eyesightRadioState: EyesightRadioState.FailSelected,
      };
    case waitingRoomToCarActions.EYESIGHT_FAIL_CANCEL_PRESSED:
      return {
        ...state,
        eyesightRadioState: EyesightRadioState.Unselected,
      };
    case waitingRoomToCarActions.EYESIGHT_FAIL_CONFIRMED:
      return initialState;
    default:
      return state;
  }
};

export const getWaitingRoomToCarState = createFeatureSelector('waitingRoomToCar');
