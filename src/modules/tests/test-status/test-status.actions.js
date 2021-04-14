export var SET_TEST_STATUS_BOOKED = '[JournalEffects] Set Test Status to Booked';
export var SET_TEST_STATUS_STARTED = '[WaitingRoomEffects] Set Test Status to Started';
export var SET_TEST_STATUS_DECIDED = '[DebriefEffects] Set Test Status to Decided';
export var SET_TEST_STATUS_WRITE_UP = '[PostTestDeclarationsEffects] Set Test Status to WriteUp';
export var SET_TEST_STATUS_AUTOSAVED = '[AutoSaveEffects] Set Test Status to Autosaved';
export var SET_TEST_STATUS_COMPLETED = '[OfficeEffects] Set Test Status to Completed';
export var SET_TEST_STATUS_SUBMITTED = '[TestsEffects] Set Test Status to Submitted';
var SetTestStatusBooked = /** @class */ (function () {
    function SetTestStatusBooked(slotId) {
        this.slotId = slotId;
        this.type = SET_TEST_STATUS_BOOKED;
    }
    return SetTestStatusBooked;
}());
export { SetTestStatusBooked };
var SetTestStatusStarted = /** @class */ (function () {
    function SetTestStatusStarted(slotId) {
        this.slotId = slotId;
        this.type = SET_TEST_STATUS_STARTED;
    }
    return SetTestStatusStarted;
}());
export { SetTestStatusStarted };
var SetTestStatusDecided = /** @class */ (function () {
    function SetTestStatusDecided(slotId) {
        this.slotId = slotId;
        this.type = SET_TEST_STATUS_DECIDED;
    }
    return SetTestStatusDecided;
}());
export { SetTestStatusDecided };
var SetTestStatusWriteUp = /** @class */ (function () {
    function SetTestStatusWriteUp(slotId) {
        this.slotId = slotId;
        this.type = SET_TEST_STATUS_WRITE_UP;
    }
    return SetTestStatusWriteUp;
}());
export { SetTestStatusWriteUp };
var SetTestStatusAutosaved = /** @class */ (function () {
    function SetTestStatusAutosaved(slotId) {
        this.slotId = slotId;
        this.type = SET_TEST_STATUS_AUTOSAVED;
    }
    return SetTestStatusAutosaved;
}());
export { SetTestStatusAutosaved };
var SetTestStatusCompleted = /** @class */ (function () {
    function SetTestStatusCompleted(slotId) {
        this.slotId = slotId;
        this.type = SET_TEST_STATUS_COMPLETED;
    }
    return SetTestStatusCompleted;
}());
export { SetTestStatusCompleted };
var SetTestStatusSubmitted = /** @class */ (function () {
    function SetTestStatusSubmitted(slotId) {
        this.slotId = slotId;
        this.type = SET_TEST_STATUS_SUBMITTED;
    }
    return SetTestStatusSubmitted;
}());
export { SetTestStatusSubmitted };
//# sourceMappingURL=test-status.actions.js.map