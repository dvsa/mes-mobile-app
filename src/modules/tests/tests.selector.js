import { TestStatus } from './test-status/test-status.model';
import { activityCodeModelList, activityCodeModelListDelegatedExaminer, } from '../../pages/office/components/activity-code/activity-code.constants';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { startsWith } from 'lodash';
import { TestOutcome } from './tests.constants';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { DateTime } from '../../shared/helpers/date-time';
export var getCurrentTestSlotId = function (tests) { return tests.currentTest.slotId; };
export var getCurrentTest = function (tests) {
    var currentTestSlotId = tests.currentTest.slotId;
    return tests.startedTests[currentTestSlotId];
};
export var getCurrentTestStatus = function (tests) {
    var currentTestSlotId = tests.currentTest.slotId;
    return tests.testStatus[currentTestSlotId];
};
export var getTestById = function (tests, slotId) {
    return tests.startedTests[slotId];
};
export var getJournalData = function (test) { return test.journalData; };
export var getTestStatus = function (tests, slotId) { return tests.testStatus[slotId] || TestStatus.Booked; };
export var getTestOutcome = function (test) { return test.activityCode; };
export var getTestOutcomeText = function (test) {
    if (test.activityCode === ActivityCodes.PASS) {
        return TestOutcome.Passed;
    }
    if (test.activityCode === ActivityCodes.FAIL ||
        test.activityCode === ActivityCodes.FAIL_CANDIDATE_STOPS_TEST ||
        test.activityCode === ActivityCodes.FAIL_EYESIGHT ||
        test.activityCode === ActivityCodes.FAIL_PUBLIC_SAFETY) {
        return TestOutcome.Failed;
    }
    return TestOutcome.Terminated;
};
export var isTestOutcomeSet = function (test) {
    if (test.activityCode) {
        return true;
    }
    return false;
};
export var isPassed = function (test) {
    return test.activityCode === ActivityCodes.PASS;
};
export var getActivityCode = function (test) {
    if (test.delegatedTest) {
        return activityCodeModelListDelegatedExaminer.find(function (code) {
            return code.activityCode === test.activityCode;
        });
    }
    return activityCodeModelList.find(function (code) {
        return code.activityCode === test.activityCode;
    });
};
export var isPracticeMode = function (tests) {
    return isTestReportPracticeTest(tests) || isEndToEndPracticeTest(tests);
};
export var isTestReportPracticeTest = function (tests) {
    return tests.currentTest.slotId === testReportPracticeSlotId;
};
export var isEndToEndPracticeTest = function (tests) {
    return startsWith(tests.currentTest.slotId, end2endPracticeSlotId);
};
export var isDelegatedTest = function (tests) {
    var test = getCurrentTest(tests);
    if (test.category === "B+E" /* BE */
        || test.category === "C" /* C */
        || test.category === "C+E" /* CE */
        || test.category === "C1" /* C1 */
        || test.category === "C1+E" /* C1E */
        || test.category === "D" /* D */
        || test.category === "D+E" /* DE */
        || test.category === "D1" /* D1 */
        || test.category === "D1+E" /* D1E */) {
        return test.delegatedTest || false;
    }
    if (test.category === "CCPC" /* CCPC */
        || test.category === "DCPC" /* DCPC */) {
        return test.delegatedTest || false;
    }
    return false;
};
export var getAllTestStatuses = function (test) {
    return test.testStatus;
};
export var getActivityCodeBySlotId = function (testsModel, id) {
    if (testsModel && testsModel.startedTests && testsModel.startedTests[id]) {
        return testsModel.startedTests[id].activityCode;
    }
    return null;
};
export var getIncompleteTestsSlotIds = function (tests) {
    return Object.keys(tests.testStatus).filter(function (slotId) {
        return isTestBeforeToday(tests.startedTests[slotId])
            && tests.testStatus[slotId] !== TestStatus.Submitted
            && tests.testStatus[slotId] !== TestStatus.Completed;
    });
};
var isTestBeforeToday = function (test) {
    var testDate = new DateTime(test.journalData.testSlotAttributes.start);
    var today = new DateTime();
    return today.daysDiff(new Date(testDate.format('YYYY-MM-DD'))) < 0;
};
export var getIncompleteTests = function (tests) {
    var incompleteTestsSlotIds = getIncompleteTestsSlotIds(tests);
    return incompleteTestsSlotIds.map(function (slotId) { return tests.startedTests[slotId]; });
};
export var getIncompleteTestsCount = function (tests) {
    var incompleteTestsSlotIds = getIncompleteTestsSlotIds(tests);
    return incompleteTestsSlotIds.length;
};
export var getOldestIncompleteTest = function (tests) {
    var incompleteTestsSlotIds = getIncompleteTestsSlotIds(tests);
    var oldestTest;
    incompleteTestsSlotIds.forEach(function (slotId) {
        if (!oldestTest) {
            oldestTest = tests.startedTests[slotId];
            return;
        }
        var oldestStartDate = new DateTime(oldestTest.journalData.testSlotAttributes.start);
        var currentStartDate = new DateTime(tests.startedTests[slotId].journalData.testSlotAttributes.start);
        if (currentStartDate.isBefore(oldestStartDate)) {
            oldestTest = tests.startedTests[slotId];
        }
    });
    return oldestTest;
};
export var hasStartedTests = function (tests) {
    return Object.keys(tests.startedTests).length > 0;
};
//# sourceMappingURL=tests.selector.js.map