import { SlotTypes } from '../models/slot-types';
export var SpecialNeedsCode;
(function (SpecialNeedsCode) {
    SpecialNeedsCode["NONE"] = "NONE";
    SpecialNeedsCode["YES"] = "YES";
    SpecialNeedsCode["EXTRA"] = "EXTRA";
})(SpecialNeedsCode || (SpecialNeedsCode = {}));
export var getSlotType = function (slot) {
    var specialNeedsExtendedTest = slot.booking.application.specialNeedsExtendedTest;
    var specialNeedsCode = slot.booking.application.specialNeedsCode;
    var vehicleSlotTypeCode = slot.vehicleSlotTypeCode;
    // Check special case
    // Jira ticket is available here for more details: https://jira.i-env.net/browse/MES-1698
    if (vehicleSlotTypeCode === 6) {
        if (specialNeedsCode !== SpecialNeedsCode.NONE) {
            return SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS;
        }
    }
    if (vehicleSlotTypeCode === 14) {
        if (specialNeedsCode !== SpecialNeedsCode.NONE) {
            return SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS;
        }
    }
    // These are the non special cases
    if (specialNeedsExtendedTest) {
        if (specialNeedsCode === SpecialNeedsCode.NONE) {
            return SlotTypes.EXTENDED_TEST;
        }
        return SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS;
    }
    if (specialNeedsCode === SpecialNeedsCode.NONE) {
        return SlotTypes.STANDARD_TEST;
    }
    if (specialNeedsCode === SpecialNeedsCode.YES) {
        return SlotTypes.STANDARD_TEST;
    }
    return SlotTypes.SPECIAL_NEEDS_EXTRA_TIME;
};
//# sourceMappingURL=get-slot-type.js.map