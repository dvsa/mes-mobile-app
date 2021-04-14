export var TEST_REPORT_VIEW_DID_ENTER = '[TestReportPage] Test Report did enter';
export var TOGGLE_REMOVE_FAULT_MODE = '[TestReportPage] Toggle Remove Fault Mode';
export var TOGGLE_SERIOUS_FAULT_MODE = '[TestReportPage] Toggle Serious Fault Mode';
export var TOGGLE_DANGEROUS_FAULT_MODE = '[TestReportPage] Toggle Dangerous Fault Mode';
export var CALCULATE_TEST_RESULT = '[TestResultPage] Calculate Test Result';
export var VALIDATE_ETA = '[TestReportPage] Validate ETA';
export var TERMINATE_TEST_FROM_TEST_REPORT = '[TestReportPage] Terminate test';
export var START_TIMER = '[TestReportPage] Start Timer';
var TestReportViewDidEnter = /** @class */ (function () {
    function TestReportViewDidEnter() {
        this.type = TEST_REPORT_VIEW_DID_ENTER;
    }
    return TestReportViewDidEnter;
}());
export { TestReportViewDidEnter };
// The aim of isUserGenerated in the actions below is so we know if we should track the event in analytics.
// by default we don't as most of the time we programatically toggling the mode which we don't want to record
var ToggleRemoveFaultMode = /** @class */ (function () {
    function ToggleRemoveFaultMode(isUserGenerated) {
        if (isUserGenerated === void 0) { isUserGenerated = false; }
        this.isUserGenerated = isUserGenerated;
        this.type = TOGGLE_REMOVE_FAULT_MODE;
    }
    return ToggleRemoveFaultMode;
}());
export { ToggleRemoveFaultMode };
var ToggleSeriousFaultMode = /** @class */ (function () {
    function ToggleSeriousFaultMode(isUserGenerated) {
        if (isUserGenerated === void 0) { isUserGenerated = false; }
        this.isUserGenerated = isUserGenerated;
        this.type = TOGGLE_SERIOUS_FAULT_MODE;
    }
    return ToggleSeriousFaultMode;
}());
export { ToggleSeriousFaultMode };
var ToggleDangerousFaultMode = /** @class */ (function () {
    function ToggleDangerousFaultMode(isUserGenerated) {
        if (isUserGenerated === void 0) { isUserGenerated = false; }
        this.isUserGenerated = isUserGenerated;
        this.type = TOGGLE_DANGEROUS_FAULT_MODE;
    }
    return ToggleDangerousFaultMode;
}());
export { ToggleDangerousFaultMode };
var CalculateTestResult = /** @class */ (function () {
    function CalculateTestResult() {
        this.type = CALCULATE_TEST_RESULT;
    }
    return CalculateTestResult;
}());
export { CalculateTestResult };
var TerminateTestFromTestReport = /** @class */ (function () {
    function TerminateTestFromTestReport() {
        this.type = TERMINATE_TEST_FROM_TEST_REPORT;
    }
    return TerminateTestFromTestReport;
}());
export { TerminateTestFromTestReport };
var StartTimer = /** @class */ (function () {
    function StartTimer() {
        this.type = START_TIMER;
    }
    return StartTimer;
}());
export { StartTimer };
//# sourceMappingURL=test-report.actions.js.map