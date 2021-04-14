import { getSlotType } from '../../../../../shared/helpers/get-slot-type';
import moment from 'moment';
export var getTestTime = function (attributes) { return moment(attributes.start).format('HH:mm'); };
export var getTestDate = function (attributes) { return moment(attributes.start).format('DD/MM/YYYY'); };
export var getTestStartDateTime = function (attributes) { return attributes.start; };
export var isExtendedTest = function (attributes) { return attributes.extendedTest || false; };
export var isSpecialNeeds = function (attributes) { return attributes.specialNeeds || false; };
export var getSlotId = function (attributes) { return attributes.slotId; };
export var isWelshTest = function (attributes) { return attributes.welshTest; };
export var extractTestSlotAttributes = function (slotData) { return ({
    welshTest: slotData.booking.application.welshTest,
    slotId: slotData.slotDetail.slotId,
    start: slotData.slotDetail.start,
    specialNeeds: slotData.booking.application.specialNeeds ? true : false,
    specialNeedsCode: slotData.booking.application.specialNeedsCode,
    specialNeedsArray: slotData.booking.application.specialNeeds ? slotData.booking.application.specialNeeds.split(';') : ['None'],
    vehicleTypeCode: slotData.vehicleTypeCode,
    extendedTest: slotData.booking.application.extendedTest,
    examinerVisiting: slotData.examinerVisiting,
    previousCancellation: slotData.booking.previousCancellation,
    entitlementCheck: slotData.booking.application.entitlementCheck,
    slotType: getSlotType(slotData),
}); };
//# sourceMappingURL=test-slot-attributes.selector.js.map