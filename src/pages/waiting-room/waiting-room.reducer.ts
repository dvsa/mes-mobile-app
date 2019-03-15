import { WaitingRoom } from '@dvsa/mes-test-schema/CatBTest';
import * as waitingRoomActions from './waiting-room.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: WaitingRoom = {
  insuranceDeclarationAccepted: false,
  residencyDeclarationAccepted: false,
  signature: '',
};

export function waitingRoomReducer(state = initialState, action: waitingRoomActions.Types): WaitingRoom {
  switch (action.type) {
    case waitingRoomActions.TOGGLE_INSURANCE_DECLARATION:
      return {
        ...state,
        insuranceDeclarationAccepted: !state.insuranceDeclarationAccepted,
      };
    case waitingRoomActions.TOGGLE_RESIDENCY_DECLARATION:
      return {
        ...state,
        residencyDeclarationAccepted: !state.residencyDeclarationAccepted,
      };
    default:
      return state;
  }
}

export const getWaitingRoomState = createFeatureSelector<WaitingRoom>('waitingRoom');
