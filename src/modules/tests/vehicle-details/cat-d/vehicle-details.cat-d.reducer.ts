import * as vehicleDetailsActions from '../common/vehicle-details.actions';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { createFeatureSelector } from '@ngrx/store';

const initialState: CatDUniqueTypes.VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsCatDReducer = (
  state: CatDUniqueTypes.VehicleDetails = initialState,
  action: vehicleDetailsActions.Types,
): CatDUniqueTypes.VehicleDetails => {
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

export const getVehicleDetails = createFeatureSelector<CatDUniqueTypes.VehicleDetails>('vehicleDetails');
