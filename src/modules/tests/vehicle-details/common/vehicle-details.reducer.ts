import * as vehicleDetailsActions from './vehicle-details.actions';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';

const initialState: VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsReducer = (
  state: VehicleDetails = initialState,
  action: vehicleDetailsActions.Types,
): VehicleDetails => {
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
    default:
      return state;
  }
};

export const getVehicleDetails = createFeatureSelector<VehicleDetails>('vehicleDetails');
