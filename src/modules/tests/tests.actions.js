export var START_SENDING_COMPLETED_TESTS = '[TestsEffects] Start Sending Completed Test';
export var SEND_COMPLETED_TESTS = '[TestsEffects] Send Completed Tests';
export var SEND_COMPLETED_TEST_SUCCESS = '[TestsEffects] Send Completed Tests Success';
export var SEND_COMPLETED_TESTS_FAILURE = '[TestsEffects] Send Completed Tests Failure';
export var SEND_CURRENT_TEST = '[TestsEffects] Send Current Test';
export var SEND_CURRENT_TEST_SUCCESS = '[Tests] Send Test Success';
export var SEND_CURRENT_TEST_FAILURE = '[Tests] Send Test Failure';
export var SEND_PARTIAL_TEST_SUCCESS = '[TestsEffects] Send Partial Tests Success';
export var SEND_PARTIAL_TESTS_FAILURE = '[TestsEffects] Send Partial Tests Failure';
export var PERSIST_TESTS = '[Tests] Persist';
export var LOAD_PERSISTED_TESTS = '[Tests] Load persisted';
export var LOAD_PERSISTED_TESTS_SUCCESS = '[Tests] Load persisted success';
export var START_TEST_REPORT_PRACTICE_TEST = '[Tests] Start practice test';
export var START_TEST = '[Tests] Start Test';
// Differs from START_TEST in that it won't trigger the journal -> test state copy effect
export var ACTIVATE_TEST = '[Tests] Activate Test';
export var TEST_OUTCOME_CHANGED = '[TestReportEffects] Test outcome changed';
var PersistTests = /** @class */ (function () {
    function PersistTests() {
        this.type = PERSIST_TESTS;
    }
    return PersistTests;
}());
export { PersistTests };
var LoadPersistedTests = /** @class */ (function () {
    function LoadPersistedTests() {
        this.type = LOAD_PERSISTED_TESTS;
    }
    return LoadPersistedTests;
}());
export { LoadPersistedTests };
var LoadPersistedTestsSuccess = /** @class */ (function () {
    function LoadPersistedTestsSuccess(tests) {
        this.tests = tests;
        this.type = LOAD_PERSISTED_TESTS_SUCCESS;
    }
    return LoadPersistedTestsSuccess;
}());
export { LoadPersistedTestsSuccess };
var TestOutcomeChanged = /** @class */ (function () {
    function TestOutcomeChanged(payload) {
        this.payload = payload;
        this.type = TEST_OUTCOME_CHANGED;
    }
    return TestOutcomeChanged;
}());
export { TestOutcomeChanged };
var StartTest = /** @class */ (function () {
    function StartTest(slotId, category, rekey, delegatedTest) {
        if (rekey === void 0) { rekey = false; }
        if (delegatedTest === void 0) { delegatedTest = false; }
        this.slotId = slotId;
        this.category = category;
        this.rekey = rekey;
        this.delegatedTest = delegatedTest;
        this.type = START_TEST;
    }
    return StartTest;
}());
export { StartTest };
var ActivateTest = /** @class */ (function () {
    function ActivateTest(slotId, category, rekey) {
        if (rekey === void 0) { rekey = false; }
        this.slotId = slotId;
        this.category = category;
        this.rekey = rekey;
        this.type = ACTIVATE_TEST;
    }
    return ActivateTest;
}());
export { ActivateTest };
var StartTestReportPracticeTest = /** @class */ (function () {
    function StartTestReportPracticeTest(slotId, category) {
        if (category === void 0) { category = "B" /* B */; }
        this.slotId = slotId;
        this.category = category;
        this.type = START_TEST_REPORT_PRACTICE_TEST;
    }
    return StartTestReportPracticeTest;
}());
export { StartTestReportPracticeTest };
var StartSendingCompletedTests = /** @class */ (function () {
    function StartSendingCompletedTests() {
        this.type = START_SENDING_COMPLETED_TESTS;
    }
    return StartSendingCompletedTests;
}());
export { StartSendingCompletedTests };
var SendCompletedTests = /** @class */ (function () {
    function SendCompletedTests() {
        this.type = SEND_COMPLETED_TESTS;
    }
    return SendCompletedTests;
}());
export { SendCompletedTests };
var SendCompletedTestSuccess = /** @class */ (function () {
    function SendCompletedTestSuccess(completedTestId) {
        this.completedTestId = completedTestId;
        this.type = SEND_COMPLETED_TEST_SUCCESS;
    }
    return SendCompletedTestSuccess;
}());
export { SendCompletedTestSuccess };
var SendCompletedTestsFailure = /** @class */ (function () {
    function SendCompletedTestsFailure() {
        this.type = SEND_COMPLETED_TESTS_FAILURE;
    }
    return SendCompletedTestsFailure;
}());
export { SendCompletedTestsFailure };
var SendPartialTestSuccess = /** @class */ (function () {
    function SendPartialTestSuccess(slotId) {
        this.slotId = slotId;
        this.type = SEND_PARTIAL_TEST_SUCCESS;
    }
    return SendPartialTestSuccess;
}());
export { SendPartialTestSuccess };
var SendPartialTestsFailure = /** @class */ (function () {
    function SendPartialTestsFailure() {
        this.type = SEND_PARTIAL_TESTS_FAILURE;
    }
    return SendPartialTestsFailure;
}());
export { SendPartialTestsFailure };
var SendCurrentTest = /** @class */ (function () {
    function SendCurrentTest() {
        this.type = SEND_CURRENT_TEST;
    }
    return SendCurrentTest;
}());
export { SendCurrentTest };
var SendCurrentTestSuccess = /** @class */ (function () {
    function SendCurrentTestSuccess() {
        this.type = SEND_CURRENT_TEST_SUCCESS;
    }
    return SendCurrentTestSuccess;
}());
export { SendCurrentTestSuccess };
var SendCurrentTestFailure = /** @class */ (function () {
    function SendCurrentTestFailure(isDuplicateUpload) {
        this.isDuplicateUpload = isDuplicateUpload;
        this.type = SEND_CURRENT_TEST_FAILURE;
    }
    return SendCurrentTestFailure;
}());
export { SendCurrentTestFailure };
//# sourceMappingURL=tests.actions.js.map