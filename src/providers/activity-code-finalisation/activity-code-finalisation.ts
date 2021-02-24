import { Injectable } from '@angular/core';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { TestData as CatAMod2TestData } from '@dvsa/mes-test-schema/categories/AM2';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { CatCTestData, CatDTestData, CatHomeTestData } from '../../shared/unions/test-schema-unions';
import { FaultCountAM1Helper } from '../fault-count/cat-a-mod1/fault-count.cat-a-mod1';
import { FaultCountAM2Helper } from '../fault-count/cat-a-mod2/fault-count.cat-a-mod2';
import { FaultCountADIPart2Helper } from '../fault-count/cat-adi-part2/fault-count.cat-adi-part2';
import { FaultCountBHelper } from '../fault-count/cat-b/fault-count.cat-b';
import { FaultCountBEHelper } from '../fault-count/cat-be/fault-count.cat-be';
import { FaultCountCHelper } from '../fault-count/cat-c/fault-count.cat-c';
import { FaultCountDHelper } from '../fault-count/cat-d/fault-count.cat-d';
import { FaultCountHomeTestHelper } from '../fault-count/cat-home-test/fault-count.cat-home-test';

@Injectable()
export class ActivityCodeFinalisationProvider {

  catAMod1TestDataIsInvalid(activityCode: ActivityCode, testData: CatAMod1TestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) {
      return false;
    }

    const numberOfSeriousFaults = FaultCountAM1Helper.getSeriousFaultSumCountCatAM1(testData);
    const numberOfDangerousFaults = FaultCountAM1Helper.getDangerousFaultSumCountCatAM1(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  catAMod2TestDataIsInvalid(activityCode: ActivityCode, testData: CatAMod2TestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) return false;

    const numberOfSeriousFaults = FaultCountAM2Helper.getSeriousFaultSumCountCatAM2(testData);
    const numberOfDangerousFaults = FaultCountAM2Helper.getDangerousFaultSumCountCatAM2(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  catADIPart2TestDataIsInvalid(activityCode: ActivityCode, testData: CatADI2UniqueTypes.TestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) return false;

    const numberOfSeriousFaults = FaultCountADIPart2Helper.getSeriousFaultSumCountCatADIPart2(testData);
    const numberOfDangerousFaults = FaultCountADIPart2Helper.getDangerousFaultSumCountCatADIPart2(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  catBTestDataIsInvalid(activityCode: ActivityCode, testData: CatBUniqueTypes.TestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) return false;

    const numberOfSeriousFaults = FaultCountBHelper.getSeriousFaultSumCountCatB(testData);
    const numberOfDangerousFaults = FaultCountBHelper.getDangerousFaultSumCountCatB(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  catBETestDataIsInvalid(activityCode: ActivityCode, testData: CatBEUniqueTypes.TestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) return false;

    const numberOfSeriousFaults = FaultCountBEHelper.getSeriousFaultSumCountCatBE(testData);
    const numberOfDangerousFaults = FaultCountBEHelper.getDangerousFaultSumCountCatBE(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  catCTestDataIsInvalid(activityCode: ActivityCode, testData: CatCTestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) return false;

    const numberOfSeriousFaults = FaultCountCHelper.getSeriousFaultSumCountCatC(testData);
    const numberOfDangerousFaults = FaultCountCHelper.getDangerousFaultSumCountCatC(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  catDTestDataIsInvalid(activityCode: ActivityCode, testData: CatDTestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) return false;

    const numberOfSeriousFaults = FaultCountDHelper.getSeriousFaultSumCountCatD(testData);
    const numberOfDangerousFaults = FaultCountDHelper.getDangerousFaultSumCountCatD(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  catHomeTestDataIsInvalid(activityCode: ActivityCode, testData: CatHomeTestData): boolean {
    if (!this.activityCodeIs4or5(activityCode)) return false;

    const numberOfSeriousFaults = FaultCountHomeTestHelper.getSeriousFaultSumCountHomeTest(testData);
    const numberOfDangerousFaults = FaultCountHomeTestHelper.getDangerousFaultSumCountHomeTest(testData);

    return numberOfSeriousFaults === 0 && numberOfDangerousFaults === 0;
  }

  private activityCodeIs4or5(activityCode: ActivityCode): boolean {
    return activityCode === ActivityCodes.FAIL_PUBLIC_SAFETY
      || activityCode === ActivityCodes.FAIL_CANDIDATE_STOPS_TEST;
  }

}
