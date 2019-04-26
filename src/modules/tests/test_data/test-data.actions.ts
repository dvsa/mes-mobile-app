import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';
import {
  Competencies,
  LegalRequirements,
  ExaminerActions,
  ManoeuvreCompetencies,
  ManoeuvreTypes,
} from './test-data.constants';

export const RECORD_MANOEUVRES_SELECTION = '[Manoeuvres] Record Manoeuvres Selection';
export const ADD_MANOEUVRE_DRIVING_FAULT = '[Manoeuvres] Add Manoeuvre Driving Fault';
export const ADD_MANOEUVRE_SERIOUS_FAULT = '[Manoeuvres] Add Manoeuvre Serious Fault';
export const ADD_MANOEUVRE_DANGEROUS_FAULT = '[Manoeuvres] Add Manoeuvre Dangerous Fault';
export const REMOVE_MANOEUVRE_FAULT = '[Manoeuvres] Remove Manoeuvre Fault';
export const ADD_DRIVING_FAULT = '[Competency] Add Driving Fault';
export const ADD_SERIOUS_FAULT = '[Competency] Add Serious Fault';
export const ADD_SERIOUS_FAULT_COMMENT = '[Office] Add Serious Fault Comment';
export const ADD_DANGEROUS_FAULT = '[Competency] Add Dangerous Fault';
export const ADD_DANGEROUS_FAULT_COMMENT = '[Office] Add Dangerous Fault Comment';
export const REMOVE_DRIVING_FAULT = '[Competency] Remove Driving Fault';
export const REMOVE_SERIOUS_FAULT = '[Competency] Remove Serious Fault';
export const REMOVE_DANGEROUS_FAULT = '[Competency] Remove Dangerous Fault';
export const TOGGLE_LEGAL_REQUIREMENT = '[Legal Requirements] Toggle Legal Requirement';
export const TOGGLE_ETA = '[Eta] Toggle Eta';
export const TOGGLE_CONTROL_ECO = '[Eco] Toggle Control Eco';
export const TOGGLE_PLANNING_ECO = '[Eco] Toggle Planning Eco';
export const TOGGLE_CONTROLLED_STOP = '[ControlledStop] Toggle Controlled Stop';
export const CONTROLLED_STOP_ADD_DRIVING_FAULT = '[ControlledStop] Add Driving Fault';
export const CONTROLLED_STOP_ADD_SERIOUS_FAULT = '[ControlledStop] Add Serious Fault';
export const CONTROLLED_STOP_ADD_DANGEROUS_FAULT = '[ControlledStop] Add Dangerous Fault';
export const CONTROLLED_STOP_REMOVE_FAULT = '[ControlledStop] Remove Fault';
export const ADD_DRIVING_FAULT_COMMENT = '[Office] Add driving fault comment';

export interface ManoeuvrePayload {
  manoeuvre: ManoeuvreTypes;
  competency: ManoeuvreCompetencies;
}

export class RecordManoeuvresSelection implements Action {
  constructor(public manoeuvre: ManoeuvreTypes) { }
  readonly type = RECORD_MANOEUVRES_SELECTION;
}

export class AddManoeuvreDrivingFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = ADD_MANOEUVRE_DRIVING_FAULT;
}

export class AddManoeuvreSeriousFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = ADD_MANOEUVRE_SERIOUS_FAULT;
}

export class AddManoeuvreDangerousFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = ADD_MANOEUVRE_DANGEROUS_FAULT;
}

export class RemoveManoeuvreFault implements Action {
  constructor(public payload: ManoeuvrePayload) { }
  readonly type = REMOVE_MANOEUVRE_FAULT;
}
export class ControlledStopAddDrivingFault implements Action {
  readonly type = CONTROLLED_STOP_ADD_DRIVING_FAULT;
}
export class ControlledStopAddSeriousFault implements Action {
  readonly type = CONTROLLED_STOP_ADD_SERIOUS_FAULT;
}

export class ControlledStopAddDangerousFault implements Action {
  readonly type = CONTROLLED_STOP_ADD_DANGEROUS_FAULT;
}

export class ControlledStopRemoveFault implements Action {
  readonly type = CONTROLLED_STOP_REMOVE_FAULT;
}

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}
export class AddSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_SERIOUS_FAULT;
}

export class AddSeriousFaultComment implements Action {
  constructor(public competencyName: string, public comment: string) {}
  readonly type = ADD_SERIOUS_FAULT_COMMENT;
}
export class AddDangerousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_DANGEROUS_FAULT;
}

export class AddDangerousFaultComment implements Action {
  constructor(public competencyName: string, public comment: string) {}
  readonly type = ADD_DANGEROUS_FAULT_COMMENT;
}

export class RemoveDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = REMOVE_DRIVING_FAULT;
}
export class RemoveSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = REMOVE_SERIOUS_FAULT;
}
export class RemoveDangerousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = REMOVE_DANGEROUS_FAULT;
}

export class ToggleLegalRequirement implements Action {
  constructor(public payload: LegalRequirements) { }
  readonly type = TOGGLE_LEGAL_REQUIREMENT;
}

export class ToggleETA implements Action {
  constructor(public payload: ExaminerActions) { }
  readonly type = TOGGLE_ETA;
}

export class ToggleControlEco implements Action {
  readonly type = TOGGLE_CONTROL_ECO;
}
export class TogglePlanningEco implements Action {
  readonly type = TOGGLE_PLANNING_ECO;
}
export class ToggleControlledStop implements Action {
  readonly type = TOGGLE_CONTROLLED_STOP;
}
export class AddDrivingFaultComment implements Action {
  constructor(public competencyName: string, public comment: string) { }
  readonly type = ADD_DRIVING_FAULT_COMMENT;
}
export type Types =
  | RecordManoeuvresSelection
  | AddManoeuvreDrivingFault
  | AddManoeuvreSeriousFault
  | AddManoeuvreDangerousFault
  | RemoveManoeuvreFault
  | AddDrivingFault
  | AddDrivingFaultComment
  | AddSeriousFault
  | AddSeriousFaultComment
  | AddDangerousFault
  | AddDangerousFaultComment
  | RemoveDrivingFault
  | RemoveSeriousFault
  | RemoveDangerousFault
  | ToggleLegalRequirement
  | ToggleETA
  | ToggleControlEco
  | TogglePlanningEco
  | ToggleControlledStop
  | ControlledStopAddDrivingFault
  | ControlledStopAddSeriousFault
  | ControlledStopAddDangerousFault
  | ControlledStopRemoveFault;
