import { Action } from '@ngrx/store';

export const VEHICLE_REGISTRATION_CHANGED = '[Vehicle Details] Registration changed';
export const SCHOOL_CAR_TOGGLED = '[Vehicle Details] School car toggled';
export const DUAL_CONTROLS_TOGGLED = '[Vehicle Details] Dual controls toggled';

export class VehicleRegistrationChanged implements Action {
  readonly type = VEHICLE_REGISTRATION_CHANGED;
}

export class SchoolCarToggled implements Action {
  readonly type = SCHOOL_CAR_TOGGLED;
}

export class DualControlsToggled implements Action {
  readonly type = DUAL_CONTROLS_TOGGLED;
}

export type Types =
  | VehicleRegistrationChanged
  | SchoolCarToggled
  | DualControlsToggled;
