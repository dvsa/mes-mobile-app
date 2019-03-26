import * as vehicleDetailsActions from './vehicle-details.actions';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/B';

const initialState: VehicleDetails = {
  dualControls: false,
  gearboxCategory: null,
  registrationNumber: '',
  schoolCar: false,
};

export const vehicleDetailsReducer = (state = initialState, action: vehicleDetailsActions.Types) => {
  return initialState;
};
