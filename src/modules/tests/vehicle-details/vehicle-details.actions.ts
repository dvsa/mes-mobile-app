import { Action } from '@ngrx/store';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';

export const VEHICLE_REGISTRATION_CHANGED = '[Vehicle Details] Registration changed';
export const SCHOOL_CAR_TOGGLED = '[Vehicle Details] School car toggled';
export const DUAL_CONTROLS_TOGGLED = '[Vehicle Details] Dual controls toggled';
export const GEARBOX_CATEGORY_CHANGED = '[Vehicle Details] Gearbox category changed';

export class VehicleRegistrationChanged implements Action {
  readonly type = VEHICLE_REGISTRATION_CHANGED;
  constructor(public vehicleRegistration: string) {}
}

export class SchoolCarToggled implements Action {
  readonly type = SCHOOL_CAR_TOGGLED;
}

export class DualControlsToggled implements Action {
  readonly type = DUAL_CONTROLS_TOGGLED;
}

export class GearboxCategoryChanged implements Action {
  readonly type = GEARBOX_CATEGORY_CHANGED;
  constructor(public gearboxCategory: GearboxCategory) {}
}

export type Types =
  | VehicleRegistrationChanged
  | SchoolCarToggled
  | DualControlsToggled
  | GearboxCategoryChanged;
