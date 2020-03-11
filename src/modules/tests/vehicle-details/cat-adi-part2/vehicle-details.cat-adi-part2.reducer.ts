import * as vehicleDetailsActions from '../common/vehicle-details.actions';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { createFeatureSelector } from '@ngrx/store';

const initialState: CatADI2UniqueTypes.VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsCatADIPart2Reducer = (
  state: CatADI2UniqueTypes.VehicleDetails = initialState,
  action: vehicleDetailsActions.Types,
): CatADI2UniqueTypes.VehicleDetails => {
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

export const getVehicleDetails = createFeatureSelector<CatADI2UniqueTypes.VehicleDetails>('vehicleDetails');
