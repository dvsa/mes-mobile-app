import { Action } from '@ngrx/store';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/Common';

export const VEHICLE_REGISTRATION_CHANGED = '[Vehicle Details] Registration changed';
export const SCHOOL_CAR_TOGGLED = '[Vehicle Details] School car toggled';
export const DUAL_CONTROLS_TOGGLED = '[Vehicle Details] Dual controls toggled';
export const GEARBOX_CATEGORY_CHANGED = '[Vehicle Details] Gearbox category changed';
export const CLEAR_GEARBOX_CATEGORY = '[Vehicle Details] Clear gearbox category';

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

export class ClearGearboxCategory implements Action {
  readonly type = CLEAR_GEARBOX_CATEGORY;
}

export type Types =
  | VehicleRegistrationChanged
  | SchoolCarToggled
  | DualControlsToggled
  | GearboxCategoryChanged
  | ClearGearboxCategory;
