import { Action } from '@ngrx/store';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/common';
import { Configuration } from '@dvsa/mes-test-schema/categories/CPC';

export const VEHICLE_REGISTRATION_CHANGED = '[Vehicle Details] Registration changed';
export const SCHOOL_CAR_TOGGLED = '[Vehicle Details] School car toggled';
export const SCHOOL_BIKE_TOGGLED = '[Vehicle Details] School bike toggled';
export const DUAL_CONTROLS_TOGGLED = '[Vehicle Details] Dual controls toggled';
export const GEARBOX_CATEGORY_CHANGED = '[Vehicle Details] Gearbox category changed';
export const CLEAR_GEARBOX_CATEGORY = '[Vehicle Details] Clear gearbox category';
export const POPULATE_VEHICLE_DIMENSIONS = '[Vehicle Details] Populate Vehicle Dimensions';
export const POPULATE_VEHICLE_CONFIGURATION = '[Vehicle Details] Populate Vehicle Configuration';

export class VehicleRegistrationChanged implements Action {
  readonly type = VEHICLE_REGISTRATION_CHANGED;
  constructor(public vehicleRegistration: string) {}
}

export class SchoolCarToggled implements Action {
  readonly type = SCHOOL_CAR_TOGGLED;
}
export class SchoolBikeToggled implements Action {
  readonly type = SCHOOL_BIKE_TOGGLED;
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

export class PopulateVehicleDimensions implements Action {
  readonly type = POPULATE_VEHICLE_DIMENSIONS;
  constructor(public vehicleWidth: number, public vehicleLength: number) {}
}

export class PopulateVehicleConfiguration implements Action {
  readonly type = POPULATE_VEHICLE_CONFIGURATION;
  constructor(public configuration: Configuration) {}
}

export type Types =
  | VehicleRegistrationChanged
  | SchoolCarToggled
  | SchoolBikeToggled
  | DualControlsToggled
  | GearboxCategoryChanged
  | ClearGearboxCategory
  | PopulateVehicleDimensions
  | PopulateVehicleConfiguration;
