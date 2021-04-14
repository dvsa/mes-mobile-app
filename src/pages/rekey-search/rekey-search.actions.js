export var REKEY_SEARCH_VIEW_DID_ENTER = '[RekeySearch] Rekey Search Did Enter';
export var REKEY_SEARCH_CLEAR_STATE = '[RekeySearch] Rekey Search Clear State';
export var SEARCH_BOOKED_TEST = '[RekeySearch] Search Booked Test';
export var SEARCH_BOOKED_TEST_SUCCESS = '[RekeySearchEffects] Search Booked Test Success';
export var SEARCH_BOOKED_TEST_FAILURE = '[RekeySearchEffects] Search Booked Test Failure';
var RekeySearchViewDidEnter = /** @class */ (function () {
    function RekeySearchViewDidEnter() {
        this.type = REKEY_SEARCH_VIEW_DID_ENTER;
    }
    return RekeySearchViewDidEnter;
}());
export { RekeySearchViewDidEnter };
var SearchBookedTest = /** @class */ (function () {
    function SearchBookedTest(appRef, staffNumber) {
        this.appRef = appRef;
        this.staffNumber = staffNumber;
        this.type = SEARCH_BOOKED_TEST;
    }
    return SearchBookedTest;
}());
export { SearchBookedTest };
var SearchBookedTestSuccess = /** @class */ (function () {
    function SearchBookedTestSuccess(testSlot, staffNumber) {
        this.testSlot = testSlot;
        this.staffNumber = staffNumber;
        this.type = SEARCH_BOOKED_TEST_SUCCESS;
    }
    return SearchBookedTestSuccess;
}());
export { SearchBookedTestSuccess };
var SearchBookedTestFailure = /** @class */ (function () {
    function SearchBookedTestFailure(err) {
        this.err = err;
        this.type = SEARCH_BOOKED_TEST_FAILURE;
    }
    return SearchBookedTestFailure;
}());
export { SearchBookedTestFailure };
var RekeySearchClearState = /** @class */ (function () {
    function RekeySearchClearState() {
        this.type = REKEY_SEARCH_CLEAR_STATE;
    }
    return RekeySearchClearState;
}());
export { RekeySearchClearState };
//# sourceMappingURL=rekey-search.actions.js.map