import { Action } from '@ngrx/store';

export const ADD_EMERGENCY_STOP_SERIOUS_FAULT = '[SpeedCheck] Add Emergency Stop Speed Req Serious Fault';
export const REMOVE_EMERGENCY_STOP_SERIOUS_FAULT = '[SpeedCheck] Remove Emergency Stop Speed Req Serious Fault';
export const RECORD_EMERGENCY_STOP_FIRST_ATTEMPT = '[SpeedCheck] Record Emergency Stop First Attempt';
export const RECORD_EMERGENCY_STOP_SECOND_ATTEMPT = '[SpeedCheck] Record Emergency Stop Second Attempt';

export const ADD_EMERGENCY_STOP_COMMENT = '[SpeedCheck] Add Emergency Stop Comment';

export class AddEmergencyStopSeriousFault implements Action {
  readonly type = ADD_EMERGENCY_STOP_SERIOUS_FAULT;
}

export class RemoveEmergencyStopSeriousFault implements Action {
  readonly type = REMOVE_EMERGENCY_STOP_SERIOUS_FAULT;
}

export class RecordEmergencyStopFirstAttempt implements Action {
  readonly type = RECORD_EMERGENCY_STOP_FIRST_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export class RecordEmergencyStopSecondAttempt implements Action {
  readonly type = RECORD_EMERGENCY_STOP_SECOND_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export class AddAnEmergencyStopComment implements Action {
  constructor(public comment: string) {
  }

  readonly type = ADD_EMERGENCY_STOP_COMMENT;
}

export type Types =
  | AddEmergencyStopSeriousFault
  | RemoveEmergencyStopSeriousFault
  | RecordEmergencyStopFirstAttempt
  | RecordEmergencyStopSecondAttempt
  | AddAnEmergencyStopComment;
