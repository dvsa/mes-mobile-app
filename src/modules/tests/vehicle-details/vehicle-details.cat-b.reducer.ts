import * as vehicleDetailsActions from './vehicle-details.actions';
import { createFeatureSelector } from '@ngrx/store';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

const initialState: CatBUniqueTypes.VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsReducer = (state = initialState, action: vehicleDetailsActions.Types) => {
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
    default:
      return state;
  }
};

export const getVehicleDetails = createFeatureSelector<CatBUniqueTypes.VehicleDetails>('vehicleDetails');
