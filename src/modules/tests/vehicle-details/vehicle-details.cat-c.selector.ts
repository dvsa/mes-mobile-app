// @TODO - import Cat C Types
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export const getVehicleLength = (vehicleDetails: CatBEUniqueTypes.VehicleDetails) => vehicleDetails.vehicleLength;
export const getVehicleWidth = (vehicleDetails: CatBEUniqueTypes.VehicleDetails) => vehicleDetails.vehicleWidth;
