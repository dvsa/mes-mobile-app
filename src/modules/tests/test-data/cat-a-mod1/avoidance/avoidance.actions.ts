import { Action } from '@ngrx/store';

export const TOGGLE_AVOIDANCE_SPEED_REQ = '[SpeedCheck] Toggle Avoidance Speed Req';

export class ToggleAvoidanceSpeedReq implements Action {
  readonly type = TOGGLE_AVOIDANCE_SPEED_REQ;
}

export type Types =
  | ToggleAvoidanceSpeedReq;
