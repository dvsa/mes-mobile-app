import { GearboxCategory } from '@dvsa/mes-test-schema/categories/Common';

export interface VehicleDetailsModel {
  transmission?: GearboxCategory;
  registrationNumber?: string;
  instructorRegistrationNumber?: number;
  vehicleDetails?: string[];
}
