
import { Action } from '@ngrx/store';

export const EYESIGHT_PASS_PRESSED = '[WaitingRoomToCar] Eyesight pass pressed';
export const EYESIGHT_FAIL_PRESSED = '[WaitingRoomToCar] Eyesight fail pressed';
export const EYESIGHT_FAIL_CANCEL_PRESSED = '[WaitingRoomToCar] Eyesight fail cancel pressed';
export const EYESIGHT_FAIL_CONFIRMED = '[WaitingRoomToCar] Eyesight fail confirmed';

export class EyesightPassPressed implements Action {
  readonly type = EYESIGHT_PASS_PRESSED;
}

export class EyesightFailPressed implements Action {
  readonly type = EYESIGHT_FAIL_PRESSED;
}

export class EyesightFailCancelPressed implements Action {
  readonly type = EYESIGHT_FAIL_CANCEL_PRESSED;
}

export class EyesightFailConfirmed implements Action {
  readonly type = EYESIGHT_FAIL_CONFIRMED;
}

export type Types =
  | EyesightPassPressed
  | EyesightFailPressed
  | EyesightFailCancelPressed
  | EyesightFailConfirmed;
