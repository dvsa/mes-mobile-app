import { GearboxCategory } from '@dvsa/mes-test-schema/categories/common';

export interface VehicleDetailsModel {
  transmission?: GearboxCategory;
  registrationNumber?: string;
  instructorRegistrationNumber?: number;
  vehicleDetails?: string[];
}
