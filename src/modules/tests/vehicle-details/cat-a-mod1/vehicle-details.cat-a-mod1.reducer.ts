import * as vehicleDetailsActions from '../common/vehicle-details.actions';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/AM1';
import { createFeatureSelector } from '@ngrx/store';

const initialState: VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsCatAMod1Reducer = (
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
    case vehicleDetailsActions.SCHOOL_BIKE_TOGGLED:
      return {
        ...state,
        schoolBike: !state.schoolBike,
      };
    default:
      return state;
  }
};

export const getVehicleDetails = createFeatureSelector<VehicleDetails>('vehicleDetails');
