import { Injectable } from '@angular/core';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FaultCountProvider } from '../fault-count/fault-count';
import { TestCategory } from '../../shared/models/test-category';

@Injectable()
export class TestResultProvider {

  constructor(
    private faultCountProvider: FaultCountProvider,
  ) {}

  calculateCatBTestResult = (testData: CatBUniqueTypes.TestData): Observable<ActivityCode> => {

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
}
