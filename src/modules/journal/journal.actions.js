export var LOAD_JOURNAL = '[JournalPage] Load Journal';
export var LOAD_JOURNAL_SUCCESS = '[JournalEffects] Load Journal Success';
export var LOAD_JOURNAL_FAILURE = '[JournalEffects] Load Journal Failure';
export var LOAD_JOURNAL_SILENT = '[JournalEffect] Load Journal Silent';
export var LOAD_JOURNAL_SILENT_FAILURE = '[JournalEffect] Load Journal Silent Failure';
export var LOAD_COMPLETED_TESTS = '[JournalEffect] Load Completed Tests';
export var LOAD_COMPLETED_TESTS_SUCCESS = '[JournalEffect] Load Completed Tests Success';
export var LOAD_COMPLETED_TESTS_FAILURE = '[JournalEffect] Load Completed Tests Failure';
export var SETUP_JOURNAL_POLLING = '[JournalPage] Setup Journal Polling';
export var STOP_JOURNAL_POLLING = '[JournalPage] Stop Journal Polling';
export var UNLOAD_JOURNAL = '[JournalPage] Unload Journal';
export var CLEAR_CHANGED_SLOT = '[JournalPage] Clear Changed Slot';
export var UNSET_ERROR = '[JournalPage] Unset Error';
export var SELECT_PREVIOUS_DAY = '[JournalPage] Select Previous Day';
export var SELECT_NEXT_DAY = '[JournalPage] Select Next Day';
export var SET_SELECTED_DAY = '[JournalEffects] Set Selected Day';
export var CANDIDATE_DETAILS_SEEN = '[JournalPage] Candidate Details Seen';
// Analytic actions
export var EARLY_START_MODAL_DID_ENTER = '[JournalPage] Early Start Modal Entered';
export var EARLY_START_MODAL_RETURN_TO_JOURNAL = '[JournalPage] Early Start Modal Exited - Return to Journal';
export var EARLY_START_MODAL_CONTINUE_TO_TEST = '[JournalPage] Early Start Modal Exited - Continue to Test';
export var JOURNAL_VIEW_DID_ENTER = '[JournalPage] Journal view did enter';
export var JOURNAL_NAVIGATE_DAY = '[JournalPage] Navigate Day';
export var JOURNAL_REFRESH = '[JournalPage] Journal Refresh';
export var JOURNAL_REFRESH_ERROR = '[JournalPage] Journal Refresh Error';
export var RESUMING_WRITE_UP = '[JournalPage] Resuming write-up';
var EarlyStartModalDidEnter = /** @class */ (function () {
    function EarlyStartModalDidEnter() {
        this.type = EARLY_START_MODAL_DID_ENTER;
    }
    return EarlyStartModalDidEnter;
}());
export { EarlyStartModalDidEnter };
var EarlyStartDidContinue = /** @class */ (function () {
    function EarlyStartDidContinue() {
        this.type = EARLY_START_MODAL_CONTINUE_TO_TEST;
    }
    return EarlyStartDidContinue;
}());
export { EarlyStartDidContinue };
var EarlyStartDidReturn = /** @class */ (function () {
    function EarlyStartDidReturn() {
        this.type = EARLY_START_MODAL_RETURN_TO_JOURNAL;
    }
    return EarlyStartDidReturn;
}());
export { EarlyStartDidReturn };
var LoadJournal = /** @class */ (function () {
    function LoadJournal() {
        this.type = LOAD_JOURNAL;
    }
    return LoadJournal;
}());
export { LoadJournal };
var LoadJournalSilent = /** @class */ (function () {
    function LoadJournalSilent() {
        this.type = LOAD_JOURNAL_SILENT;
    }
    return LoadJournalSilent;
}());
export { LoadJournalSilent };
var LoadJournalSuccess = /** @class */ (function () {
    // TODO: declare payload with the correct type when we have a slot type in place
    function LoadJournalSuccess(payload, onlineOffline, unAuthenticatedMode, lastRefreshed) {
        this.payload = payload;
        this.onlineOffline = onlineOffline;
        this.unAuthenticatedMode = unAuthenticatedMode;
        this.lastRefreshed = lastRefreshed;
        this.type = LOAD_JOURNAL_SUCCESS;
    }
    return LoadJournalSuccess;
}());
export { LoadJournalSuccess };
var LoadJournalFailure = /** @class */ (function () {
    function LoadJournalFailure(payload) {
        this.payload = payload;
        this.type = LOAD_JOURNAL_FAILURE;
    }
    return LoadJournalFailure;
}());
export { LoadJournalFailure };
var LoadJournalSilentFailure = /** @class */ (function () {
    function LoadJournalSilentFailure(payload) {
        this.payload = payload;
        this.type = LOAD_JOURNAL_SILENT_FAILURE;
    }
    return LoadJournalSilentFailure;
}());
export { LoadJournalSilentFailure };
var UnloadJournal = /** @class */ (function () {
    function UnloadJournal() {
        this.type = UNLOAD_JOURNAL;
    }
    return UnloadJournal;
}());
export { UnloadJournal };
var LoadCompletedTests = /** @class */ (function () {
    function LoadCompletedTests(callThrough) {
        if (callThrough === void 0) { callThrough = false; }
        this.callThrough = callThrough;
        this.type = LOAD_COMPLETED_TESTS;
    }
    return LoadCompletedTests;
}());
export { LoadCompletedTests };
var LoadCompletedTestsSuccess = /** @class */ (function () {
    function LoadCompletedTestsSuccess(payload) {
        this.payload = payload;
        this.type = LOAD_COMPLETED_TESTS_SUCCESS;
    }
    return LoadCompletedTestsSuccess;
}());
export { LoadCompletedTestsSuccess };
var LoadCompletedTestsFailure = /** @class */ (function () {
    function LoadCompletedTestsFailure(payload) {
        this.payload = payload;
        this.type = LOAD_COMPLETED_TESTS_FAILURE;
    }
    return LoadCompletedTestsFailure;
}());
export { LoadCompletedTestsFailure };
var UnsetError = /** @class */ (function () {
    function UnsetError() {
        this.type = UNSET_ERROR;
    }
    return UnsetError;
}());
export { UnsetError };
var ClearChangedSlot = /** @class */ (function () {
    function ClearChangedSlot(slotId) {
        this.slotId = slotId;
        this.type = CLEAR_CHANGED_SLOT;
    }
    return ClearChangedSlot;
}());
export { ClearChangedSlot };
var SelectPreviousDay = /** @class */ (function () {
    function SelectPreviousDay() {
        this.type = SELECT_PREVIOUS_DAY;
    }
    return SelectPreviousDay;
}());
export { SelectPreviousDay };
var SelectNextDay = /** @class */ (function () {
    function SelectNextDay() {
        this.type = SELECT_NEXT_DAY;
    }
    return SelectNextDay;
}());
export { SelectNextDay };
var SetSelectedDate = /** @class */ (function () {
    function SetSelectedDate(payload) {
        this.payload = payload;
        this.type = SET_SELECTED_DAY;
    }
    return SetSelectedDate;
}());
export { SetSelectedDate };
var SetupPolling = /** @class */ (function () {
    function SetupPolling() {
        this.type = SETUP_JOURNAL_POLLING;
    }
    return SetupPolling;
}());
export { SetupPolling };
var StopPolling = /** @class */ (function () {
    function StopPolling() {
        this.type = STOP_JOURNAL_POLLING;
    }
    return StopPolling;
}());
export { StopPolling };
var JournalViewDidEnter = /** @class */ (function () {
    function JournalViewDidEnter() {
        this.type = JOURNAL_VIEW_DID_ENTER;
    }
    return JournalViewDidEnter;
}());
export { JournalViewDidEnter };
var JournalNavigateDay = /** @class */ (function () {
    function JournalNavigateDay(day) {
        this.day = day;
        this.type = JOURNAL_NAVIGATE_DAY;
    }
    return JournalNavigateDay;
}());
export { JournalNavigateDay };
var ResumingWriteUp = /** @class */ (function () {
    function ResumingWriteUp(slotId) {
        this.slotId = slotId;
        this.type = RESUMING_WRITE_UP;
    }
    return ResumingWriteUp;
}());
export { ResumingWriteUp };
var JournalRefreshError = /** @class */ (function () {
    function JournalRefreshError(errorDescription, errorMessage) {
        this.errorDescription = errorDescription;
        this.errorMessage = errorMessage;
        this.type = JOURNAL_REFRESH_ERROR;
    }
    return JournalRefreshError;
}());
export { JournalRefreshError };
var JournalRefresh = /** @class */ (function () {
    function JournalRefresh(mode) {
        this.mode = mode;
        this.type = JOURNAL_REFRESH;
    }
    return JournalRefresh;
}());
export { JournalRefresh };
var CandidateDetailsSeen = /** @class */ (function () {
    function CandidateDetailsSeen(slotId) {
        this.slotId = slotId;
        this.type = CANDIDATE_DETAILS_SEEN;
    }
    return CandidateDetailsSeen;
}());
export { CandidateDetailsSeen };
//# sourceMappingURL=journal.actions.js.map