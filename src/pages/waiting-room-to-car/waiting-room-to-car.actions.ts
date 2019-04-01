import { Action } from '@ngrx/store';

export const WAITING_ROOM_TO_CAR_VIEW_DID_ENTER = '[WaitingRoomToCarPage] Waiting roomn to car did enter';
export const EYESIGHT_PASS_PRESSED = '[WaitingRoomToCar] Eyesight pass pressed';
export const EYESIGHT_FAIL_PRESSED = '[WaitingRoomToCar] Eyesight fail pressed';
export const EYESIGHT_FAIL_CANCELLED = '[WaitingRoomToCar] Eyesight fail cancelled';

export class WaitingRoomToCarViewDidEnter implements Action {
  readonly type = WAITING_ROOM_TO_CAR_VIEW_DID_ENTER;
}

export class EyesightPassPressed implements Action {
  readonly type = EYESIGHT_PASS_PRESSED;
}

export class EyesightFailPressed implements Action {
  readonly type = EYESIGHT_FAIL_PRESSED;
}

export class EyesightFailCancelled implements Action {
  readonly type = EYESIGHT_FAIL_CANCELLED;
}

export type Types =
  | WaitingRoomToCarViewDidEnter
  | EyesightPassPressed
  | EyesightFailPressed
  | EyesightFailCancelled;
