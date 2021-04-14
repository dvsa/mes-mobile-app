export var DELEGATED_REKEY_SEARCH_VIEW_DID_ENTER = '[DelegatedRekeySearch] Delegated Rekey Search Did Enter';
export var DELEGATED_REKEY_SEARCH_CLEAR_STATE = '[DelegatedRekeySearch] Delegated Rekey Search Clear State';
export var SEARCH_BOOKED_DELEGATED_TEST = '[DelegatedRekeySearch] Search Booked Test';
export var SEARCH_BOOKED_DELEGATED_TEST_SUCCESS = '[DelegatedRekeySearchEffects] Search Booked Test Success';
export var SEARCH_BOOKED_DELEGATED_TEST_FAILURE = '[DelegatedRekeySearchEffects] Search Booked Test Failure';
var DelegatedRekeySearchViewDidEnter = /** @class */ (function () {
    function DelegatedRekeySearchViewDidEnter() {
        this.type = DELEGATED_REKEY_SEARCH_VIEW_DID_ENTER;
    }
    return DelegatedRekeySearchViewDidEnter;
}());
export { DelegatedRekeySearchViewDidEnter };
var SearchBookedDelegatedTest = /** @class */ (function () {
    function SearchBookedDelegatedTest(appRef) {
        this.appRef = appRef;
        this.type = SEARCH_BOOKED_DELEGATED_TEST;
    }
    return SearchBookedDelegatedTest;
}());
export { SearchBookedDelegatedTest };
var SearchBookedDelegatedTestSuccess = /** @class */ (function () {
    function SearchBookedDelegatedTestSuccess(testSlot) {
        this.testSlot = testSlot;
        this.type = SEARCH_BOOKED_DELEGATED_TEST_SUCCESS;
    }
    return SearchBookedDelegatedTestSuccess;
}());
export { SearchBookedDelegatedTestSuccess };
var SearchBookedDelegatedTestFailure = /** @class */ (function () {
    function SearchBookedDelegatedTestFailure(err) {
        this.err = err;
        this.type = SEARCH_BOOKED_DELEGATED_TEST_FAILURE;
    }
    return SearchBookedDelegatedTestFailure;
}());
export { SearchBookedDelegatedTestFailure };
var DelegatedRekeySearchClearState = /** @class */ (function () {
    function DelegatedRekeySearchClearState() {
        this.type = DELEGATED_REKEY_SEARCH_CLEAR_STATE;
    }
    return DelegatedRekeySearchClearState;
}());
export { DelegatedRekeySearchClearState };
//# sourceMappingURL=delegated-rekey-search.actions.js.map