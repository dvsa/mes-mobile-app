import { Action } from '@ngrx/store';

export const TOGGLE_EMERGENCY_STOP_SPEED_REQ = '[SpeedCheck] Toggle Emergency Stop Speed Req';

export class ToggleEmergencyStopSpeedReq implements Action {
  readonly type = TOGGLE_EMERGENCY_STOP_SPEED_REQ;
}

export type Types =
  | ToggleEmergencyStopSpeedReq;
