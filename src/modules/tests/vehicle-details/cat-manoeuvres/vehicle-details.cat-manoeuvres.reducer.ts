import { createFeatureSelector } from '@ngrx/store';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/CM';
import * as vehicleDetailsActions from '../common/vehicle-details.actions';

const initialState: VehicleDetails = {
  gearboxCategory: null,
};

export const vehicleDetailsCatManoeuvresReducer = (
  state: VehicleDetails = initialState,
  action: vehicleDetailsActions.Types,
): VehicleDetails => {
  switch (action.type) {
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
