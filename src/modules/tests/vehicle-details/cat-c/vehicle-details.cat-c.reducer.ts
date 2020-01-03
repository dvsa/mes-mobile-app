import * as vehicleDetailsActions from '../common/vehicle-details.actions';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { createFeatureSelector } from '@ngrx/store';

const initialState: CatCUniqueTypes.VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsCatCReducer = (
  state: CatCUniqueTypes.VehicleDetails = initialState,
  action: vehicleDetailsActions.Types,
): CatCUniqueTypes.VehicleDetails => {
  switch (action.type) {
    case vehicleDetailsActions.VEHICLE_REGISTRATION_CHANGED:
      return {
        ...state,
        registrationNumber: action.vehicleRegistration,
      };
    case vehicleDetailsActions.GEARBOX_CATEGORY_CHANGED:
      return {
        ...state,
        gearboxCategory: action.gearboxCategory,
      };
    case vehicleDetailsActions.CLEAR_GEARBOX_CATEGORY:
      return {
        ...state,
        gearboxCategory: null,
      };
    case vehicleDetailsActions.POPULATE_VEHICLE_DIMENSIONS:
      return {
        ...state,
        vehicleLength: action.vehicleLength,
        vehicleWidth: action.vehicleWidth,
      };
    default:
      return state;
  }
};

export const getVehicleDetails = createFeatureSelector<CatCUniqueTypes.VehicleDetails>('vehicleDetails');
