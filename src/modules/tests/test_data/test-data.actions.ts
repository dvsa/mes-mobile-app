import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';
import { Competencies } from './test-data.constants';

export const ADD_DRIVING_FAULT = '[Competency] Add Driving Fault';
export const ADD_SERIOUS_FAULT = '[Competency] Add Serious Fault';

export const TOGGLE_NORMAL_START_1 = '[Legal Requirements] Toggle Normal Start 1';
export const TOGGLE_NORMAL_START_2 = '[Legal Requirements] Toggle Normal Start 2';
export const TOGGLE_ANGLED_START = '[Legal Requirements] Toggle Angled Start';
export const TOGGLE_HILL_START = '[Legal Requirements] Toggle Hill Start';

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}

export class AddSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_SERIOUS_FAULT;
}

export class ToggleNormalStart1 implements Action {
  readonly type = TOGGLE_NORMAL_START_1;
}

export class ToggleNormalStart2 implements Action {
  readonly type = TOGGLE_NORMAL_START_2;
}

export class ToggleAngledStart implements Action {
  readonly type = TOGGLE_ANGLED_START;
}

export class ToggleHillStart implements Action {
  readonly type = TOGGLE_HILL_START;
}

export type Types =
  | AddDrivingFault
  | AddSeriousFault
  | ToggleNormalStart1
  | ToggleNormalStart2
  | ToggleAngledStart
  | ToggleHillStart;
