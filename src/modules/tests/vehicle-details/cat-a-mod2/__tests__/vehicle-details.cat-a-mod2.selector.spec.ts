// @TODO - import Cat C Types
import { CatAM2UniqueTypes } from '@dvsa/mes-test-schema/categories/AM2';
import { getSchoolBike } from '../vehicle-details.cat-a-mod2.selector';

describe('vehicle details CAT A Mod 2 selector', () => {
  const state: CatAM2UniqueTypes.VehicleDetails = {
    schoolBike: true,
  };

  describe('getSchoolBike', () => {
    it('should retrieve if the bike is a school one from the vehicle details', () => {
      expect(getSchoolBike(state)).toBe(true);
    });
  });
});
