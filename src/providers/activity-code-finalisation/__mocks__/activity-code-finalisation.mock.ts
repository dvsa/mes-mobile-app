import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { TestData as CatAMod2TestData } from '@dvsa/mes-test-schema/categories/AM2';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCTestData, CatDTestData, CatHomeTestData } from '../../../shared/unions/test-schema-unions';

export class ActivityCodeFinalisationProviderMock {
  async catAMod1TestDataIsInvalid(activityCode: ActivityCode, testData: CatAMod1TestData): Promise<boolean> {
    return Promise.resolve(true);
  }

  async catAMod2TestDataIsInvalid(activityCode: ActivityCode, testData: CatAMod2TestData): Promise<boolean> {
    return Promise.resolve(true);
  }

  async catADIPart2TestDataIsInvalid(
    activityCode: ActivityCode, testData: CatADI2UniqueTypes.TestData,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  async catBTestDataIsInvalid(activityCode: ActivityCode, testData: CatBUniqueTypes.TestData): Promise<boolean> {
    return Promise.resolve(true);
  }

  async catBETestDataIsInvalid(activityCode: ActivityCode, testData: CatBEUniqueTypes.TestData): Promise<boolean> {
    return Promise.resolve(true);
  }

  async catCTestDataIsInvalid(activityCode: ActivityCode, testData: CatCTestData): Promise<boolean> {
    return Promise.resolve(true);
  }

  async catDTestDataIsInvalid(activityCode: ActivityCode, testData: CatDTestData): Promise<boolean> {
    return Promise.resolve(true);
  }

  async catHomeTestDataIsInvalid(activityCode: ActivityCode, testData: CatHomeTestData): Promise<boolean> {
    return Promise.resolve(true);
  }
}
