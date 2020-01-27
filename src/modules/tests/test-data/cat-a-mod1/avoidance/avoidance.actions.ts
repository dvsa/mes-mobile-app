import { Action } from '@ngrx/store';

export const TOGGLE_AVOIDANCE_SPEED_REQ = '[SpeedCheck] Toggle Avoidance Speed Req';
export const RECORD_AVOIDANCE_FIRST_ATTEMPT = '[SpeedCheck] Record Avoidance First Attempt';
export const RECORD_AVOIDANCE_SECOND_ATTEMPT = '[SpeedCheck] Record Avoidace Second Attempt';

export class ToggleAvoidanceSpeedReq implements Action {
  readonly type = TOGGLE_AVOIDANCE_SPEED_REQ;
}

export class RecordAvoidanceFirstAttempt implements Action {
  readonly type = RECORD_AVOIDANCE_FIRST_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export class RecordAvoidanceSecondAttempt implements Action {
  readonly type = RECORD_AVOIDANCE_SECOND_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export type Types =
  | ToggleAvoidanceSpeedReq
  | RecordAvoidanceFirstAttempt
  | RecordAvoidanceSecondAttempt;
