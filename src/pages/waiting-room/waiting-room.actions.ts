import { Action } from '@ngrx/store';

export const WAITING_ROOM_VIEW_DID_ENTER = '[WaitingRoomPAge] Waiting roomn to car did enter';


export class WaitingRoomViewDidEnter implements Action {
  readonly type = WAITING_ROOM_VIEW_DID_ENTER;
}

export type Types = 
  | WaitingRoomViewDidEnter;
