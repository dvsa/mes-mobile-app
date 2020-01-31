import { getDriverOrRiderLabel } from '../driver-type';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('getDriverOrRiderLabel()', () => {
  it('should return Rider when a category equals EUAM1,', () => {
    const driverType = getDriverOrRiderLabel(TestCategory.EUAM1);
    expect(driverType).toEqual('Rider');
  });

  it('should return Driver when a category equals B', () => {
    const driverType = getDriverOrRiderLabel(TestCategory.B);
    expect(driverType).toEqual('Driver');
  });
});
