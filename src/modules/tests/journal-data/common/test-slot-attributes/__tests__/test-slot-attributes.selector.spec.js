import { getTestTime, getSlotId, isWelshTest, isSpecialNeeds, isExtendedTest, extractTestSlotAttributes, getTestDate, getTestStartDateTime, } from '../test-slot-attributes.selector';
import { DateTime } from '../../../../../../shared/helpers/date-time';
import { SlotTypes } from '../../../../../../shared/models/slot-types';
var testTime = new DateTime().toString();
var formattedTime = DateTime.at(testTime).format('HH:mm');
describe('testSlotAttributes selector', function () {
    var testSlotAttributes = {
        slotId: 1234,
        specialNeeds: true,
        start: testTime,
        vehicleTypeCode: 'C',
        extendedTest: true,
        welshTest: true,
    };
    describe('getTestTime', function () {
        it('should return the time of the test', function () {
            expect(getTestTime(testSlotAttributes)).toBe(formattedTime);
        });
    });
    describe('getTestDate', function () {
        it('should return the date of the test', function () {
            var startDateTime = '2021-01-15T08:10:00.000Z';
            testSlotAttributes.start = startDateTime;
            expect(getTestDate(testSlotAttributes)).toBe('15/01/2021');
        });
    });
    describe('getTestStartDateTime', function () {
        it('should return the start date and time of the test as string', function () {
            var startDateTime = '2021-01-15T08:10:00.000Z';
            testSlotAttributes.start = startDateTime;
            expect(getTestStartDateTime(testSlotAttributes)).toBe(startDateTime);
        });
    });
    describe('isExtendedTest', function () {
        it('should return true if test is an extended test', function () {
            expect(isExtendedTest(testSlotAttributes)).toEqual(true);
        });
    });
    describe('isSpecialNeeds', function () {
        it('should return true if special needs', function () {
            expect(isSpecialNeeds(testSlotAttributes)).toEqual(true);
        });
    });
    describe('getSlotId', function () {
        it('should return the slot id of the test', function () {
            expect(getSlotId(testSlotAttributes)).toBe(1234);
        });
    });
    describe('isWelshTest', function () {
        it('should return if the test is welsh', function () {
            expect(isWelshTest(testSlotAttributes)).toEqual(true);
        });
    });
    describe('extractTestSlotAttributes', function () {
        var slotData = {
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                    welshTest: true,
                    specialNeeds: 'special need 1;special need 2',
                    specialNeedsCode: 'YES',
                    extendedTest: true,
                    entitlementCheck: true,
                    specialNeedsExtendedTest: false,
                },
                previousCancellation: ['Act of nature'],
            },
            slotDetail: {
                slotId: 12345,
                start: 'now',
            },
            vehicleSlotTypeCode: 6,
            vehicleTypeCode: 'B',
            examinerVisiting: true,
        };
        it('should return a TestSlotAttributes object from slot data', function () {
            var testSlotAttributes = extractTestSlotAttributes(slotData);
            expect(testSlotAttributes.welshTest).toBe(slotData.booking.application.welshTest);
            expect(testSlotAttributes.slotId).toBe(slotData.slotDetail.slotId);
            expect(testSlotAttributes.start).toBe(slotData.slotDetail.start);
            expect(testSlotAttributes.specialNeeds).toBe(true);
            expect(testSlotAttributes.specialNeedsCode).toBe(slotData.booking.application.specialNeedsCode);
            expect(testSlotAttributes.specialNeedsArray).toEqual(['special need 1', 'special need 2']);
            expect(testSlotAttributes.vehicleTypeCode).toBe(slotData.vehicleTypeCode);
            expect(testSlotAttributes.extendedTest).toBe(slotData.booking.application.extendedTest);
            expect(testSlotAttributes.examinerVisiting).toBe(slotData.examinerVisiting);
            expect(testSlotAttributes.previousCancellation).toBe(slotData.booking.previousCancellation);
            expect(testSlotAttributes.entitlementCheck).toBe(slotData.booking.application.entitlementCheck);
            expect(testSlotAttributes.slotType).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
        });
        it('should populate specialNeedsArray with only one element: None', function () {
            var slotDataWithNoSpecialNeeds = slotData;
            slotDataWithNoSpecialNeeds.booking.application.specialNeeds = null;
            var testSlotAttributes = extractTestSlotAttributes(slotDataWithNoSpecialNeeds);
            expect(testSlotAttributes.specialNeedsArray).toEqual(['None']);
        });
    });
});
//# sourceMappingURL=test-slot-attributes.selector.spec.js.map