import { Action } from '@ngrx/store';

export const TOGGLE_AVOIDANCE_SPEED_REQ = '[SpeedCheck] Toggle Avoidance Speed Req';
export const RECORD_AVOIDANCE_FIRST_ATTEMPT = '[SpeedCheck] Record Avoidance First Attempt';
export const RECORD_AVOIDANCE_SECOND_ATTEMPT = '[SpeedCheck] Record Avoidace Second Attempt';

export const ADD_AVOIDANCE_RIDING_FAULT = '[SpeedCheck] Add Avoidance Riding Fualt';
export const ADD_AVOIDANCE_SERIOUS_FAULT = '[SpeedCheck] Add Avoidance Serious Fault';
export const ADD_AVOIDANCE_DANGEROUS_FAULT = '[SpeedCheck] Add Avoidance Dangerous Fault';
export const REMOVE_AVOIDANCE_FAULT = '[SpeedCheck] Remove Avoidance Fault';

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

export class AddAvoidanceRidingFault implements Action {
  readonly type = ADD_AVOIDANCE_RIDING_FAULT;
}

export class AddAvoidanceSeriousFault implements Action {
  readonly type = ADD_AVOIDANCE_SERIOUS_FAULT;
}

export class AddAvoidanceDangerousFault implements Action {
  readonly type = ADD_AVOIDANCE_DANGEROUS_FAULT;
}

export class RemoveAvoidanceFault implements Action {
  readonly type = REMOVE_AVOIDANCE_FAULT;
}

export type Types =
  | ToggleAvoidanceSpeedReq
  | RecordAvoidanceFirstAttempt
  | RecordAvoidanceSecondAttempt
  | AddAvoidanceRidingFault
  | AddAvoidanceSeriousFault
  | AddAvoidanceDangerousFault
  | RemoveAvoidanceFault;
