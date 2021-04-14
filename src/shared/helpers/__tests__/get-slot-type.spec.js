import { getSlotType, SpecialNeedsCode } from '../get-slot-type';
import { SlotTypes } from '../../models/slot-types';
describe('getSlotType', function () {
    it('should return Single slot special needs when slot type code is 6', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    specialNeedsExtendedTest: false,
                    specialNeedsCode: SpecialNeedsCode.YES,
                },
            },
            vehicleSlotTypeCode: 6,
        };
        var result = getSlotType(slotData);
        expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
    });
    it('should return Single slot special needs when slot type code is 14', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    specialNeedsExtendedTest: false,
                    specialNeedsCode: SpecialNeedsCode.YES,
                },
            },
            vehicleSlotTypeCode: 14,
        };
        var result = getSlotType(slotData);
        expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
    });
    it('should return Extended test', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    specialNeedsExtendedTest: true,
                    specialNeedsCode: SpecialNeedsCode.NONE,
                },
            },
            vehicleSlotTypeCode: 14,
        };
        var result = getSlotType(slotData);
        expect(result).toBe(SlotTypes.EXTENDED_TEST);
    });
    it('should return Extended test special needs', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    specialNeedsExtendedTest: true,
                    specialNeedsCode: SpecialNeedsCode.YES,
                },
            },
            vehicleSlotTypeCode: 13,
        };
        var result = getSlotType(slotData);
        expect(result).toBe(SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS);
    });
    it('should return Standard test when special needs code is none', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    specialNeedsExtendedTest: false,
                    specialNeedsCode: SpecialNeedsCode.NONE,
                },
            },
            vehicleSlotTypeCode: 13,
        };
        var result = getSlotType(slotData);
        expect(result).toBe(SlotTypes.STANDARD_TEST);
    });
    it('should return Standard test when special needs code is yes', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    specialNeedsExtendedTest: false,
                    specialNeedsCode: SpecialNeedsCode.NONE,
                },
            },
            vehicleSlotTypeCode: 13,
        };
        var result = getSlotType(slotData);
        expect(result).toBe(SlotTypes.STANDARD_TEST);
    });
    it('should return Special needs extra time', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    specialNeedsExtendedTest: false,
                    specialNeedsCode: SpecialNeedsCode.EXTRA,
                },
            },
            vehicleSlotTypeCode: 13,
        };
        var result = getSlotType(slotData);
        expect(result).toBe(SlotTypes.SPECIAL_NEEDS_EXTRA_TIME);
    });
});
//# sourceMappingURL=get-slot-type.spec.js.map