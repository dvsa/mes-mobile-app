import { WaitingRoom } from '@dvsa/mes-test-schema/CatBTest';
import * as waitingRoomActions from './waiting-room.actions';

export const initialState: WaitingRoom = {
  insuranceDeclarationAccepted: false,
  residencyDeclarationAccepted: false,
  signature: '',
};

export function waitingRoomReducer(state = initialState, action: waitingRoomActions.Types): WaitingRoom {
  return initialState;
}
