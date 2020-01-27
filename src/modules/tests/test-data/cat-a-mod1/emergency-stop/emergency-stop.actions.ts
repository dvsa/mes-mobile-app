import { Action } from '@ngrx/store';

export const TOGGLE_EMERGENCY_STOP_SPEED_REQ = '[SpeedCheck] Toggle Emergency Stop Speed Req';
export const RECORD_EMERGENCY_STOP_FIRST_ATTEMPT = '[SpeedCheck] Record Emergency Stop First Attempt';
export const RECORD_EMERGENCY_STOP_SECOND_ATTEMPT = '[SpeedCheck] Record Emergency Stop Second Attempt';

export class ToggleEmergencyStopSpeedReq implements Action {
  readonly type = TOGGLE_EMERGENCY_STOP_SPEED_REQ;
}

export class RecordEmergencyStopFirstAttempt implements Action {
  readonly type = RECORD_EMERGENCY_STOP_FIRST_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export class RecordEmergencyStopSecondAttempt implements Action {
  readonly type = RECORD_EMERGENCY_STOP_SECOND_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export type Types =
  | ToggleEmergencyStopSpeedReq
  | RecordEmergencyStopFirstAttempt
  | RecordEmergencyStopSecondAttempt;
