import { driverTypeSwitch } from '../driver-type';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('driverTypeSwitch()', () => {
  it('should return Rider when a category equals EUAM1,', () => {
    const driverType = driverTypeSwitch(TestCategory.EUAM1);
    expect(driverType).toEqual('Rider');
  });

  it('should return Driver when a category equals B', () => {
    const driverType = driverTypeSwitch(TestCategory.B);
    expect(driverType).toEqual('Driver');
  });
});
