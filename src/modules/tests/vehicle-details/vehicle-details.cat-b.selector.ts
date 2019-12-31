import { VehicleDetails } from '@dvsa/mes-test-schema/categories/common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B/index';

export const getRegistrationNumber = (vehicleDetails: VehicleDetails) => vehicleDetails.registrationNumber;
export const getGearboxCategory = (vehicleDetails: VehicleDetails) => vehicleDetails.gearboxCategory;
export const getSchoolCar = (vehicleDetails: CatBUniqueTypes.VehicleDetails) => vehicleDetails.schoolCar;
export const getDualControls = (vehicleDetails: CatBUniqueTypes.VehicleDetails) => vehicleDetails.dualControls;
export const isManual = (vehicleDetails: VehicleDetails) => vehicleDetails.gearboxCategory === 'Manual' || false;
export const isAutomatic = (vehicleDetails: VehicleDetails) => vehicleDetails.gearboxCategory === 'Automatic' || false;
