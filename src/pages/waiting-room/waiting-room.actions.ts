import { Action } from '@ngrx/store';

export const WAITING_ROOM_VIEW_DID_ENTER = '[WaitingRoomPage] Waiting Room Did Enter';
export const SUBMIT_WAITING_ROOM_INFO = '[WaitingRoomPage] Submit Waiting Room Info';

export class WaitingRoomViewDidEnter implements Action {
  readonly type = WAITING_ROOM_VIEW_DID_ENTER;
}

export class SubmitWaitingRoomInfo implements Action {
  readonly type = SUBMIT_WAITING_ROOM_INFO;
}

export type Types =
  | WaitingRoomViewDidEnter
  | SubmitWaitingRoomInfo;
