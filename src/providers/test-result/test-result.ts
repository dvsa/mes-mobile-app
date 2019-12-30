import { Injectable } from '@angular/core';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FaultCountProvider } from '../fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';

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
        return this.calculateCatCTestResult(testData as CatCUniqueTypes.TestData);
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

  private calculateCatCTestResult = (testData: CatCUniqueTypes.TestData): Observable<ActivityCode> => {

    if (this.faultCountProvider.getDangerousFaultSumCount(TestCategory.C, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getSeriousFaultSumCount(TestCategory.C, testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (this.faultCountProvider.getDrivingFaultSumCount(TestCategory.C, testData) > 15) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }
}
