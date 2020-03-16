import { Action } from '@ngrx/store';

export const TOGGLE_HIGHWAYCODE_SAFETY = '[HighwaycodeSafety] Toggle Highwaycode Safety';
export const HIGHWAYCODE_SAFETY_ADD_DRIVING_FAULT = '[HighwaycodeSafety] Add Driving Fault';
export const HIGHWAYCODE_SAFETY_ADD_SERIOUS_FAULT = '[HighwaycodeSafety] Add Serious Fault';
export const HIGHWAYCODE_SAFETY_REMOVE_FAULT = '[HighwaycodeSafety] Remove Fault';
export const ADD_HIGHWAYCODE_SAFETY_COMMENT = '[HighwaycodeSafety] Add Comment';

export class ToggleHighwayCodeSafety implements Action {
  readonly type = TOGGLE_HIGHWAYCODE_SAFETY;
}

export class HighwayCodeSafetyAddDrivingFault implements Action {
  readonly type = HIGHWAYCODE_SAFETY_ADD_DRIVING_FAULT;
}
export class HighwayCodeSafetyAddSeriousFault implements Action {
  readonly type = HIGHWAYCODE_SAFETY_ADD_SERIOUS_FAULT;
}

export class HighwayCodeSafetyRemoveFault implements Action {
  readonly type = HIGHWAYCODE_SAFETY_REMOVE_FAULT;
}

export class AddHighwayCodeSafetyComment implements Action {
  readonly type = ADD_HIGHWAYCODE_SAFETY_COMMENT;
  constructor(public comment: string) { }
}

export type Types =
  | ToggleHighwayCodeSafety
  | HighwayCodeSafetyAddDrivingFault
  | HighwayCodeSafetyAddSeriousFault
  | HighwayCodeSafetyRemoveFault
  | AddHighwayCodeSafetyComment;
