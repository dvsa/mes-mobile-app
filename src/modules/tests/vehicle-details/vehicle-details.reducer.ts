import * as vehicleDetailsActions from './vehicle-details.actions';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/B';

const initialState: VehicleDetails = {
  dualControls: false,
  gearboxCategory: null,
  registrationNumber: '',
  schoolCar: false,
};

export const vehicleDetailsReducer = (state = initialState, action: vehicleDetailsActions.Types) => {
  switch (action.type) {
    case vehicleDetailsActions.SCHOOL_CAR_TOGGLED:
      return {
        ...state,
        schoolCar: !state.schoolCar,
      };
    default:
      return initialState;
  }
};
