export var EYESIGHT_TEST_PASSED = '[EyesightTest] Set passed';
export var EYESIGHT_TEST_FAILED = '[EyesightTest] Set failed';
export var EYESIGHT_TEST_RESET = '[EyesightTest] Reset state';
export var EYESIGHT_TEST_ADD_COMMENT = '[EyesightTest] Add comment';
var EyesightTestPassed = /** @class */ (function () {
    function EyesightTestPassed() {
        this.type = EYESIGHT_TEST_PASSED;
    }
    return EyesightTestPassed;
}());
export { EyesightTestPassed };
var EyesightTestFailed = /** @class */ (function () {
    function EyesightTestFailed() {
        this.type = EYESIGHT_TEST_FAILED;
    }
    return EyesightTestFailed;
}());
export { EyesightTestFailed };
var EyesightTestReset = /** @class */ (function () {
    function EyesightTestReset() {
        this.type = EYESIGHT_TEST_RESET;
    }
    return EyesightTestReset;
}());
export { EyesightTestReset };
var EyesightTestAddComment = /** @class */ (function () {
    function EyesightTestAddComment(comment) {
        this.comment = comment;
        this.type = EYESIGHT_TEST_ADD_COMMENT;
    }
    return EyesightTestAddComment;
}());
export { EyesightTestAddComment };
//# sourceMappingURL=eyesight-test.actions.js.map