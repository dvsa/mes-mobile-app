import { vehicleDetailsCatManoeuvresReducer } from '../vehicle-details.cat-manoeuvres.reducer';
import { ClearGearboxCategory, GearboxCategoryChanged } from '../../common/vehicle-details.actions';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/CM';

const initialState: VehicleDetails = {};

describe('vehicleDetailsCatManoeuvresReducer', () => {
  it('should set the transmission to Automatic', () => {
    const result = vehicleDetailsCatManoeuvresReducer(
      initialState,
      new GearboxCategoryChanged('Automatic'),
    );
    expect(result.gearboxCategory).toBe('Automatic');
  });
  it('should set the transmission to Manual', () => {
    const result = vehicleDetailsCatManoeuvresReducer(
      initialState,
      new GearboxCategoryChanged('Manual'),
    );
    expect(result.gearboxCategory).toBe('Manual');
  });
  it('should clear the transmission', () => {
    const result = vehicleDetailsCatManoeuvresReducer(
      initialState,
      new ClearGearboxCategory(),
    );
    expect(result.gearboxCategory).toBe(null);
  });
});
