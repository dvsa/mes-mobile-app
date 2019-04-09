import {
  ManoeuvreTypes,
} from './../../../pages/test-report/components/manoeuvres-popover/manoeuvres-popover.constants';
import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';
import { Competencies } from './test-data.constants';

export const ADD_DRIVING_FAULT = '[Competency] Add Driving Fault';
export const ADD_SERIOUS_FAULT = '[Competency] Add Serious Fault';
export const RECORD_MANOEUVRES_SELECTION = '[Manoeuvres] Record Manoeuvres Selection';
export const ADD_DANGEROUS_FAULT = '[Competency] Add Dangerous Fault';
export const TOGGLE_NORMAL_START_1 = '[Legal Requirements] Toggle Normal Start 1';
export const TOGGLE_NORMAL_START_2 = '[Legal Requirements] Toggle Normal Start 2';
export const TOGGLE_ANGLED_START = '[Legal Requirements] Toggle Angled Start';
export const TOGGLE_HILL_START = '[Legal Requirements] Toggle Hill Start';
export const TOGGLE_VERBAL_ETA = '[Eta] Toggle Verbal Eta';
export const TOGGLE_PHYSICAL_ETA = '[Eta] Toggle Physical Eta';
export const TOGGLE_CONTROL_ECO = '[Eco] Toggle Control Eco';
export const TOGGLE_PLANNING_ECO = '[Eco] Toggle Planning Eco';

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}
export class RecordManoeuvresSelection implements Action {
  constructor(public manoeuvre: ManoeuvreTypes) { }
  readonly type = RECORD_MANOEUVRES_SELECTION;
}
export class AddSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_SERIOUS_FAULT;
}

export class AddDangerousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_DANGEROUS_FAULT;
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
export class ToggleVerbalEta implements Action {
  readonly type = TOGGLE_VERBAL_ETA;
}
export class TogglePhysicalEta implements Action {
  readonly type = TOGGLE_PHYSICAL_ETA;
}
export class ToggleControlEco implements Action {
  readonly type = TOGGLE_CONTROL_ECO;
}
export class TogglePlanningEco implements Action {
  readonly type = TOGGLE_PLANNING_ECO;
}

export type Types =
  | AddDrivingFault
  | AddSeriousFault
  | RecordManoeuvresSelection
  | AddDangerousFault
  | ToggleNormalStart1
  | ToggleNormalStart2
  | ToggleAngledStart
  | ToggleHillStart
  | ToggleVerbalEta
  | TogglePhysicalEta
  | ToggleControlEco
  | TogglePlanningEco;
