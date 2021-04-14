export var POPULATE_TEST_SLOT_ATTRIBUTES = '[TestSlotAttributesEffects] Populate Test slot attributes';
export var SET_START_TIME = '[Delegated Office Page] Set Start Time';
var PopulateTestSlotAttributes = /** @class */ (function () {
    function PopulateTestSlotAttributes(payload) {
        this.payload = payload;
        this.type = POPULATE_TEST_SLOT_ATTRIBUTES;
    }
    return PopulateTestSlotAttributes;
}());
export { PopulateTestSlotAttributes };
var SetStartDate = /** @class */ (function () {
    function SetStartDate(payload) {
        this.payload = payload;
        this.type = SET_START_TIME;
    }
    return SetStartDate;
}());
export { SetStartDate };
//# sourceMappingURL=test-slot-attributes.actions.js.map