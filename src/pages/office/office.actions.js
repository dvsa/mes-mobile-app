export var TEST_START_DATE_CHANGED = '[OfficePage] Test Start Date Changed';
export var OFFICE_VIEW_DID_ENTER = '[OfficePage] Office view did enter';
export var COMPLETE_TEST = '[OfficePage] Complete Test';
export var SAVING_WRITE_UP_FOR_LATER = '[OfficePage] Saving write-up for later';
export var OFFICE_VALIDATION_ERROR = '[OfficePage] Validation error';
var TestStartDateChanged = /** @class */ (function () {
    function TestStartDateChanged(previousStartDate, customStartDate) {
        this.previousStartDate = previousStartDate;
        this.customStartDate = customStartDate;
        this.type = TEST_START_DATE_CHANGED;
    }
    return TestStartDateChanged;
}());
export { TestStartDateChanged };
var OfficeViewDidEnter = /** @class */ (function () {
    function OfficeViewDidEnter() {
        this.type = OFFICE_VIEW_DID_ENTER;
    }
    return OfficeViewDidEnter;
}());
export { OfficeViewDidEnter };
var CompleteTest = /** @class */ (function () {
    function CompleteTest() {
        this.type = COMPLETE_TEST;
    }
    return CompleteTest;
}());
export { CompleteTest };
var SavingWriteUpForLater = /** @class */ (function () {
    function SavingWriteUpForLater() {
        this.type = SAVING_WRITE_UP_FOR_LATER;
    }
    return SavingWriteUpForLater;
}());
export { SavingWriteUpForLater };
var OfficeValidationError = /** @class */ (function () {
    function OfficeValidationError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = OFFICE_VALIDATION_ERROR;
    }
    return OfficeValidationError;
}());
export { OfficeValidationError };
//# sourceMappingURL=office.actions.js.map