import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';

export interface VehicleDetailsModel {
  transmission?: GearboxCategory;
  registrationNumber?: string;
  instructorRegistrationNumber?: number;
  vehicleDetails?: string[];
}
