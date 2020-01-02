import * as vehicleDetailsActions from '../common/vehicle-details.actions';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector } from '@ngrx/store';

const initialState: CatBEUniqueTypes.VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsCatBEReducer = (
  state: CatBEUniqueTypes.VehicleDetails = initialState,
  action: vehicleDetailsActions.Types,
): CatBEUniqueTypes.VehicleDetails => {
  switch (action.type) {
    case vehicleDetailsActions.VEHICLE_REGISTRATION_CHANGED:
      return {
        ...state,
        registrationNumber: action.vehicleRegistration,
      };
    case vehicleDetailsActions.SCHOOL_CAR_TOGGLED:
      return {
        ...state,
        schoolCar: !state.schoolCar,
      };
    case vehicleDetailsActions.DUAL_CONTROLS_TOGGLED:
      return {
        ...state,
        dualControls: !state.dualControls,
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

export const getVehicleDetails = createFeatureSelector<CatBEUniqueTypes.VehicleDetails>('vehicleDetails');
