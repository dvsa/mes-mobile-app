import { Action } from '@ngrx/store';

export const SPEED_REQ_NOT_MET_MODAL_OPENED = '[End test] Speed Requirement not met modal opened';
export const EMERGENCY_STOP_DANGEROUS_FAULT_MODAL_OPENED = '[End test] Emergency stop dangerous fault model opened';
export const EMERGENCY_STOP_SERIOUS_FAULT_MODAL_OPENED = '[End test] Emergency stop serious fault modal opened';

export class SpeedRequirementNotMetModalOpened implements Action {
  readonly type = SPEED_REQ_NOT_MET_MODAL_OPENED;
}

export class EmergencyStopDangerousFaultModelOpened implements Action {
  readonly type = EMERGENCY_STOP_DANGEROUS_FAULT_MODAL_OPENED;
}

export class EmergencyStopSeriousFaultModelOpened implements Action {
  readonly type = EMERGENCY_STOP_SERIOUS_FAULT_MODAL_OPENED;
}

export type Types =
  | SpeedRequirementNotMetModalOpened
  | EmergencyStopDangerousFaultModelOpened
  | EmergencyStopSeriousFaultModelOpened;
