import { Injectable } from '@angular/core';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FaultCountProvider } from '../fault-count/fault-count';
import { TestCategory } from '../../shared/models/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

@Injectable()
export class TestResultProvider {

  constructor(
    private faultCountProvider: FaultCountProvider,
  ) {}

  calculateTestResult = (category: string,
                         testData: CatBUniqueTypes.TestData| CatBEUniqueTypes.TestData): Observable<ActivityCode> => {
    if (category === TestCategory.B) {
      return this.calculateCatBTestResult(testData as CatBUniqueTypes.TestData);
    }
    if (category === TestCategory.BE) {
      return this.calculateCatBETestResult(testData as CatBEUniqueTypes.TestData);
    }
  }

  calculateCatBTestResult = (testData: CatBUniqueTypes.TestData |
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
  calculateCatBETestResult = (testData: CatBEUniqueTypes.TestData): Observable<ActivityCode> => {

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
}
