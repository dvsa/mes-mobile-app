import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

export type BikeCategoryDetail = {
  testType: string;
  categoryCode: CategoryCode;
  displayId: string;
  displayName: string;
  imageUrl: string;
};

export type BikeTestType = 'MOD1' | 'MOD2';
