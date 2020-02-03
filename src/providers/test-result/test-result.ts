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
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';

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
        return this.calculateCatCAndSubCategoryTestResult(TestCategory.C, testData as CatCUniqueTypes.TestData);
      case TestCategory.C1:
        return this.calculateCatCAndSubCategoryTestResult(TestCategory.C1, testData as CatC1UniqueTypes.TestData);
      case TestCategory.CE:
        return this.calculateCatCAndSubCategoryTestResult(TestCategory.CE, testData as CatCEUniqueTypes.TestData);
      case TestCategory.C1E:
        return this.calculateCatCAndSubCategoryTestResult(TestCategory.C1E, testData as CatC1EUniqueTypes.TestData);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return this.calculateCatAAndSubCategoryTestResult(TestCategory.EUAM1, testData as TestData);
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

  private calculateCatAAndSubCategoryTestResult = (
    category: TestCategory,
    testData: TestData,
  ): Observable<ActivityCode> => {
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
}
