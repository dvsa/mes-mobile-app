import { Action } from '@ngrx/store';

export const WAITING_ROOM_VIEW_DID_ENTER = '[WaitingRoomPage] Waiting Room Did Enter';
export const WAITING_ROOM_VALIDATION_ERROR = '[WaitingRoomPage] Waiting Room Validation Error';

export class WaitingRoomViewDidEnter implements Action {
  readonly type = WAITING_ROOM_VIEW_DID_ENTER;
}

export class WaitingRoomValidationError implements Action {
  readonly type = WAITING_ROOM_VALIDATION_ERROR;
  constructor(public errorMessage: string) { }
}

export type Types =
  | WaitingRoomViewDidEnter
  | WaitingRoomValidationError;
