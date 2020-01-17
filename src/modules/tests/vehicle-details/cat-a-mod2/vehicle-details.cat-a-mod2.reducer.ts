import * as vehicleDetailsActions from '../common/vehicle-details.actions';
import * as vehicleDetailsCatAMod2Actions from './vehicle-details.cat-a-mod2.actions';
import { CatAM2UniqueTypes } from '@dvsa/mes-test-schema/categories/AM2';
import { createFeatureSelector } from '@ngrx/store';

const initialState: CatAM2UniqueTypes.VehicleDetails = {
  registrationNumber: '',
};

export const vehicleDetailsCatAMod2Reducer = (
  state: CatAM2UniqueTypes.VehicleDetails = initialState,
  action: vehicleDetailsActions.Types | vehicleDetailsCatAMod2Actions.Types,
): CatAM2UniqueTypes.VehicleDetails => {
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
    case vehicleDetailsCatAMod2Actions.SCHOOL_BIKE_TOGGLED:
      return {
        ...state,
        schoolBike: !state.schoolBike,
      };
    default:
      return state;
  }
};

export const getVehicleDetails = createFeatureSelector<CatAM2UniqueTypes.VehicleDetails>('vehicleDetails');
