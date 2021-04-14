import { ActivityCodes } from '../../shared/models/activity-codes';
export var getTestOutcome = function (test) {
    switch (test.activityCode) {
        case ActivityCodes.PASS:
            return 'Pass';
        case ActivityCodes.FAIL:
        case ActivityCodes.FAIL_EYESIGHT:
        case ActivityCodes.FAIL_PUBLIC_SAFETY:
        case ActivityCodes.FAIL_CANDIDATE_STOPS_TEST:
            return 'Fail';
        default:
            return 'Terminated';
    }
};
//# sourceMappingURL=debrief.selector.js.map