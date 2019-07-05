import { Action } from '@ngrx/store';

export const WAITING_ROOM_TO_CAR_VIEW_DID_ENTER = '[WaitingRoomToCarPage] Waiting Room To Car Did Enter';
export const WAITING_ROOM_TO_CAR_ERROR = '[WaitingRoomToCarPage] Waiting Room To Car Error';
export const WAITING_ROOM_TO_CAR_VALIDATION_ERROR = '[WaitingRoomToCarPage] Waiting Room To Car Validation Error';

export class WaitingRoomToCarViewDidEnter implements Action {
  readonly type = WAITING_ROOM_TO_CAR_VIEW_DID_ENTER;
}

export class WaitingRoomToCarError implements Action {
  readonly type = WAITING_ROOM_TO_CAR_ERROR;
  constructor(public errorMessage: string) { }
}

export class WaitingRoomToCarValidationError implements Action {
  readonly type = WAITING_ROOM_TO_CAR_VALIDATION_ERROR;
  constructor(public errorMessage: string) { }
}
export type Types =
  | WaitingRoomToCarViewDidEnter
  | WaitingRoomToCarError
  | WaitingRoomToCarValidationError;
