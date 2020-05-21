import { createFeatureSelector } from '@ngrx/store';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/CPC';

import * as vehicleDetailsActions from '../common/vehicle-details.actions';

const initialState: VehicleDetails = {
  registrationNumber: null,
  gearboxCategory: null,
  configuration: null,
};

export const vehicleDetailsCatCPCReducer = (
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
    case vehicleDetailsActions.POPULATE_VEHICLE_CONFIGURATION:
      return {
        ...state,
        configuration: action.configuration,
      };
    default:
      return state;
  }
};

export const getVehicleDetails = createFeatureSelector<VehicleDetails>('vehicleDetails');
