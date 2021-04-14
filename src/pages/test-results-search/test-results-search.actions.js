export var TEST_RESULT_SEARCH_VIEW_DID_ENTER = '[TestResultSearch] Test Result Search Did Enter';
export var PERFORM_APPLICATION_REFERENCE_SEARCH = '[TestResultSearch] Performed an application reference search';
export var PERFORM_DRIVER_NUMBER_SEARCH = '[TestResultSearch] Performed an driver number search';
export var PERFORM_LDTM_SEARCH = '[TestResultSearch] Performed an LDTM search';
var TestResultSearchViewDidEnter = /** @class */ (function () {
    function TestResultSearchViewDidEnter() {
        this.type = TEST_RESULT_SEARCH_VIEW_DID_ENTER;
    }
    return TestResultSearchViewDidEnter;
}());
export { TestResultSearchViewDidEnter };
var PerformApplicationReferenceSearch = /** @class */ (function () {
    function PerformApplicationReferenceSearch() {
        this.type = PERFORM_APPLICATION_REFERENCE_SEARCH;
    }
    return PerformApplicationReferenceSearch;
}());
export { PerformApplicationReferenceSearch };
var PerformDriverNumberSearch = /** @class */ (function () {
    function PerformDriverNumberSearch() {
        this.type = PERFORM_DRIVER_NUMBER_SEARCH;
    }
    return PerformDriverNumberSearch;
}());
export { PerformDriverNumberSearch };
var PerformLDTMSearch = /** @class */ (function () {
    function PerformLDTMSearch(advancedSearchParams) {
        this.advancedSearchParams = advancedSearchParams;
        this.type = PERFORM_LDTM_SEARCH;
    }
    return PerformLDTMSearch;
}());
export { PerformLDTMSearch };
//# sourceMappingURL=test-results-search.actions.js.map