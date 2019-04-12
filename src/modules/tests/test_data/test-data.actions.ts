import {
  ManoeuvreTypes,
} from './../../../pages/test-report/components/manoeuvres-popover/manoeuvres-popover.constants';
import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';
import { Competencies, LegalRequirements } from './test-data.constants';

export const RECORD_MANOEUVRES_SELECTION = '[Manoeuvres] Record Manoeuvres Selection';
export const ADD_DRIVING_FAULT = '[Competency] Add Driving Fault';
export const ADD_SERIOUS_FAULT = '[Competency] Add Serious Fault';
export const ADD_DANGEROUS_FAULT = '[Competency] Add Dangerous Fault';
export const REMOVE_DRIVING_FAULT = '[Competency] Remove Driving Fault';
export const REMOVE_SERIOUS_FAULT = '[Competency] Remove Serious Fault';
export const REMOVE_DANGEROUS_FAULT = '[Competency] Remove Dangerous Fault';
export const TOGGLE_LEGAL_REQUIREMENT = '[Legal Requirements] Toggle Legal Requirement';
export const TOGGLE_VERBAL_ETA = '[Eta] Toggle Verbal Eta';
export const TOGGLE_PHYSICAL_ETA = '[Eta] Toggle Physical Eta';
export const TOGGLE_CONTROL_ECO = '[Eco] Toggle Control Eco';
export const TOGGLE_PLANNING_ECO = '[Eco] Toggle Planning Eco';
export const TOGGLE_CONTROLLED_STOP = '[ControlledStop] Toggle Controlled Stop';

export class RecordManoeuvresSelection implements Action {
  constructor(public manoeuvre: ManoeuvreTypes) { }
  readonly type = RECORD_MANOEUVRES_SELECTION;
}
export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}
export class AddSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_SERIOUS_FAULT;
}
export class AddDangerousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_DANGEROUS_FAULT;
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

export class ToggleControlledStop implements Action {
  readonly type = TOGGLE_CONTROLLED_STOP;
}

export type Types =
  | RecordManoeuvresSelection
  | AddDrivingFault
  | AddSeriousFault
  | AddDangerousFault
  | RemoveDrivingFault
  | RemoveSeriousFault
  | RemoveDangerousFault
  | ToggleLegalRequirement
  | ToggleVerbalEta
  | TogglePhysicalEta
  | ToggleControlEco
  | TogglePlanningEco
  | ToggleControlledStop;
