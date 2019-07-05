import { Action } from '@ngrx/store';

export const WAITING_ROOM_VIEW_DID_ENTER = '[WaitingRoomPage] Waiting Room Did Enter';
export const SUBMIT_WAITING_ROOM_INFO = '[WaitingRoomPage] Submit Waiting Room Info';
export const SUBMIT_WAITING_ROOM_INFO_ERROR = '[WaitingRoomPage] Submit Waiting Room Info Error';
export const WAITING_ROOM_VALIDATION_ERROR = '[WaitingRoomPage] Waiting Room Validation Error';

export class WaitingRoomViewDidEnter implements Action {
  readonly type = WAITING_ROOM_VIEW_DID_ENTER;
}

export class SubmitWaitingRoomInfo implements Action {
  readonly type = SUBMIT_WAITING_ROOM_INFO;
}

export class SubmitWaitingRoomInfoError implements Action {
  readonly type = SUBMIT_WAITING_ROOM_INFO_ERROR;
  constructor(public errorMessage: string) { }
}

export class WaitingRoomValidationError implements Action {
  readonly type = WAITING_ROOM_VALIDATION_ERROR;
  constructor(public errorMessage: string) { }
}

export type Types =
  | WaitingRoomViewDidEnter
  | SubmitWaitingRoomInfo
  | SubmitWaitingRoomInfoError
  | WaitingRoomValidationError;
