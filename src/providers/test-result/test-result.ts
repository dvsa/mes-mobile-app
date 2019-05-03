import { Injectable } from '@angular/core';
import { TestData, ActivityCode } from '@dvsa/mes-test-schema/categories/B';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { getDrivingFaultSummaryCount } from '../../modules/tests/test-data/test-data.selector';
import { getSeriousOrDangerousFaults } from '../../pages/debrief/debrief.selector';

@Injectable()
export class TestResultProvider {

  calculateCatBTestResult = (testData: TestData): ActivityCode => {
    if (getSeriousOrDangerousFaults(testData.dangerousFaults).length > 0) {
      return ActivityCodes.FAIL;
    }

    if (getSeriousOrDangerousFaults(testData.seriousFaults).length > 0) {
      return ActivityCodes.FAIL;
    }

    if (getDrivingFaultSummaryCount(testData) > 15) {
      return ActivityCodes.FAIL;
    }

    return ActivityCodes.PASS;
  }
}
