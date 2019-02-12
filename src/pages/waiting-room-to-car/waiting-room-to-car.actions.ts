import { Action } from '@ngrx/store';

export const WAITING_ROOM_TO_CAR_VIEW_DID_ENTER = '[WaitingRoomToCarPage] Waiting roomn to car did enter';


export class WaitingRoomToCarViewDidEnter implements Action {
  readonly type = WAITING_ROOM_TO_CAR_VIEW_DID_ENTER;
}

export type Types = 
  | WaitingRoomToCarViewDidEnter;
