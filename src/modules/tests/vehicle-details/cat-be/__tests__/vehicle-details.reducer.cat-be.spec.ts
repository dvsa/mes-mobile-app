import { vehicleDetailsReducerCatBE } from '../vehicle-details.reducer.cat-be';
import {
  VehicleRegistrationChanged,
  SchoolCarToggled,
  DualControlsToggled,
} from '../../vehicle-details.actions';

describe('vehicle details reducer', () => {
  it('should put the registration number into the state on vehicle registration changed action', () => {
    const result = vehicleDetailsReducerCatBE({}, new VehicleRegistrationChanged('abc123'));
    expect(result.registrationNumber).toBe('abc123');
  });

  it('should toggle the state of school car when school car toggled action is received', () => {
    let result;
    result = vehicleDetailsReducerCatBE({}, new SchoolCarToggled());
    expect(result.schoolCar).toBe(true);
    result = vehicleDetailsReducerCatBE(result, new SchoolCarToggled());
    expect(result.schoolCar).toBe(false);
  });

  it('should toggle the state of dual controls when dual controls toggled action is received', () => {
    let result;
    result = vehicleDetailsReducerCatBE({}, new DualControlsToggled());
    expect(result.dualControls).toBe(true);
    result = vehicleDetailsReducerCatBE(result, new DualControlsToggled());
    expect(result.dualControls).toBe(false);
  });

});
