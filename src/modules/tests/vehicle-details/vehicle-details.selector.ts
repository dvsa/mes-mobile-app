import { VehicleDetails } from '@dvsa/mes-test-schema/categories/B';

export const getRegistrationNumber = (vehicleDetails: VehicleDetails) => vehicleDetails.registrationNumber;
export const getGearboxCategory = (vehicleDetails: VehicleDetails) => vehicleDetails.gearboxCategory;
export const getSchoolCar = (vehicleDetails: VehicleDetails) => vehicleDetails.schoolCar;
export const getDualControls = (vehicleDetails: VehicleDetails) => vehicleDetails.dualControls;
