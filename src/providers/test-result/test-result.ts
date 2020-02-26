import { Injectable } from '@angular/core';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FaultCountProvider } from '../fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { TestData as TestDataAM1 } from '@dvsa/mes-test-schema/categories/AM1';
import { TestData as TestDataAM2 } from '@dvsa/mes-test-schema/categories/AM2';
import { getSpeedRequirementNotMet } from '../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.selector';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';

@Injectable()
export class TestResultProvider {

  constructor(private faultCountProvider: FaultCountProvider) { }

  public calculateTestResult(category: string, testData: object): Observable<ActivityCode> {
    switch (category) {
      case TestCategory.B:
        return this.calculateCatBTestResult(testData as CatBUniqueTypes.TestData);
      case TestCategory.BE:
        return this.calculateCatBETestResult(testData as CatBEUniqueTypes.TestData);
      case TestCategory.C:
      case TestCategory.C1:
      case TestCategory.CE:
      case TestCategory.C1E:
        return this.calculateCatCAndSubCategoryTestResult(category, testData);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return this.calculateCatEUAM1AndSubCategoryTestResult(TestCategory.EUAM1, testData as TestDataAM1);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return this.calculateCatEUAM2AndSubCategoryTestResult(TestCategory.EUAM2, testData as TestDataAM2);
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.DE:
      case TestCategory.D1E:
        return this.calculateCatDandSubCategoryTestResult(category, testData);
      default:
        throw new Error(`Invalid Test Category when trying to calculate test result - ${category}`);
    }
  }

  private calculateCatBTestResult = (testData: CatBUniqueTypes.TestData |
    CatBEUniqueTypes.TestData): Observable<ActivityCode> => {

    if (this.faultCountProvider.getDangerousFaultSumCount(TestCategory.B, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getSeriousFaultSumCount(TestCategory.B, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getDrivingFaultSumCount(TestCategory.B, testData) > 15) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }

  private calculateCatBETestResult = (testData: CatBEUniqueTypes.TestData): Observable<ActivityCode> => {
    if (this.faultCountProvider.getDangerousFaultSumCount(TestCategory.BE, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getSeriousFaultSumCount(TestCategory.BE, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getDrivingFaultSumCount(TestCategory.BE, testData) > 15) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }

  private calculateCatCAndSubCategoryTestResult = (
    category: TestCategory,
    testData: CatCUniqueTypes.TestData |
      CatCEUniqueTypes.TestData |
      CatC1EUniqueTypes.TestData |
      CatC1UniqueTypes.TestData,
  ): Observable<ActivityCode> => {
    if (this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getDrivingFaultSumCount(category, testData) > 15) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }

  private calculateCatEUAM1AndSubCategoryTestResult = (
    category: TestCategory,
    testData: TestDataAM1,
  ): Observable<ActivityCode> => {
    if (getSpeedRequirementNotMet(testData)) {
      return of(ActivityCodes.FAIL_PUBLIC_SAFETY);
    }
    if (this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }
    if (this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }
    if (this.faultCountProvider.getDrivingFaultSumCount(category, testData) >= 6) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }

  private calculateCatEUAM2AndSubCategoryTestResult = (
    category: TestCategory,
    testData: TestDataAM2,
  ): Observable<ActivityCode> => {
    if (this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }
    if (this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }
    if (this.faultCountProvider.getDrivingFaultSumCount(category, testData) > 10) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }

  private calculateCatDandSubCategoryTestResult = (
    category: TestCategory,
    testData: CatDUniqueTypes.TestData |
      CatDEUniqueTypes.TestData |
      CatD1EUniqueTypes.TestData |
      CatD1UniqueTypes.TestData,
  ): Observable<ActivityCode> => {
    if (this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getDrivingFaultSumCount(category, testData) > 15) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }
}
