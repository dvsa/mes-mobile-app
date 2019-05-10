import { Injectable } from '@angular/core';
import { TestData, ActivityCode } from '@dvsa/mes-test-schema/categories/B';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { getDrivingFaultSummaryCount, getSeriousFaultSummaryCount, getDangerousFaultSummaryCount }
  from '../../modules/tests/test-data/test-data.selector';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TestResultProvider {

  calculateCatBTestResult = (testData: TestData): Observable<ActivityCode> => {

    if (getSeriousFaultSummaryCount(testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (getDangerousFaultSummaryCount(testData) > 0) {
      return of(ActivityCodes.FAIL);
    }

    if (getDrivingFaultSummaryCount(testData) > 15) {
      return of(ActivityCodes.FAIL);
    }

    return of(ActivityCodes.PASS);
  }
}
