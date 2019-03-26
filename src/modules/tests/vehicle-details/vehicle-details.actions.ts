import { Action } from '@ngrx/store';

export const VEHICLE_REGISTRATION_CHANGED = '[Vehicle Details] Registration changed';

export class VehicleRegistrationChanged implements Action {
  readonly type = VEHICLE_REGISTRATION_CHANGED;
}

export type Types =
  | VehicleRegistrationChanged;
