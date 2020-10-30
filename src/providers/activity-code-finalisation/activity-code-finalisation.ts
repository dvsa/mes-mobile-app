import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';

import { ActivityCodes } from '../../shared/models/activity-codes';

@Injectable()
export class ActivityCodeFinalisationProvider {

  testDataIsInvalid(activityCode, testData): boolean {
    const { dangerousFaults, seriousFaults } = testData;
    const activityCodeIs4or5 =
      (activityCode === ActivityCodes.FAIL_PUBLIC_SAFETY) ||
      (activityCode === ActivityCodes.FAIL_CANDIDATE_STOPS_TEST);
    const hasSeriousOrDangerousFaults =
      !isEmpty(dangerousFaults) ||
      !isEmpty(seriousFaults);

    return activityCodeIs4or5 && !hasSeriousOrDangerousFaults;
  }

}
