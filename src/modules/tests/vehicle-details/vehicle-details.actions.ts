import { Action } from '@ngrx/store';

export const VEHICLE_REGISTRATION_CHANGED = '[Vehicle Details] Registration changed';
export const SCHOOL_CAR_TOGGLED = '[Vehicle Details] School car toggled';

export class VehicleRegistrationChanged implements Action {
  readonly type = VEHICLE_REGISTRATION_CHANGED;
}

export class SchoolCarToggled implements Action {
  readonly type = SCHOOL_CAR_TOGGLED;
}

export type Types =
  | VehicleRegistrationChanged
  | SchoolCarToggled;
