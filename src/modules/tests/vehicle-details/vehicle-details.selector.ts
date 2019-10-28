import { VehicleDetails } from '@dvsa/mes-test-schema/categories/Common';

export const getRegistrationNumber = (vehicleDetails: VehicleDetails) => vehicleDetails.registrationNumber;
export const getGearboxCategory = (vehicleDetails: VehicleDetails) => vehicleDetails.gearboxCategory;
export const getSchoolCar = (vehicleDetails: VehicleDetails) => vehicleDetails.schoolCar;
export const getDualControls = (vehicleDetails: VehicleDetails) => vehicleDetails.dualControls;
export const isManual = (vehicleDetails: VehicleDetails) => vehicleDetails.gearboxCategory === 'Manual' || false;
export const isAutomatic = (vehicleDetails: VehicleDetails) => vehicleDetails.gearboxCategory === 'Automatic' || false;
