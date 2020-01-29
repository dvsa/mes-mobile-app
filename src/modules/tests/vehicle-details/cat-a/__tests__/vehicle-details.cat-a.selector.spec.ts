import { VehicleDetails } from '@dvsa/mes-test-schema/categories/AM2';
import { getSchoolBike } from '../vehicle-details.cat-a.selector';

describe('vehicle details CAT A selector', () => {
  const state: VehicleDetails = {
    schoolBike: true,
  };

  describe('getSchoolBike', () => {
    it('should retrieve if the bike is a school one from the vehicle details', () => {
      expect(getSchoolBike(state)).toBe(true);
    });
  });
});
