import { Action } from '@ngrx/store';

export const WAITING_ROOM_VIEW_DID_ENTER = '[WaitingRoomPage] Waiting room did enter';

export class WaitingRoomViewDidEnter implements Action {
  readonly type = WAITING_ROOM_VIEW_DID_ENTER;
}

export type Types =
  | WaitingRoomViewDidEnter;
