import { GearboxCategory } from '@dvsa/mes-test-schema/categories/common';

export interface VehicleDetailsModel {
  transmission?: GearboxCategory;
  vehicleRegistration?: string;
  dimensions: {
    vehicleLength?: number;
    vehicleWidth?: number;
    vehicleHeight?: number;
    numberOfSeats?: number;
  };
}
