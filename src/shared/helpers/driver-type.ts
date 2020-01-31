import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export enum driverTypeDescription {
  RIDER = 'Rider',
  DRIVER = 'Driver',
}

export const getDriverOrRiderLabel = (cat: TestCategory): driverTypeDescription => {
    // switch to determine Driver or Rider based upon category
  if (cat.includes('EUA')) {
    return driverTypeDescription.RIDER;
  }
  return driverTypeDescription.DRIVER;
};
