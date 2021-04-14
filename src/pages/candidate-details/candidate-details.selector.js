import { isEmpty } from 'lodash';
import { getSlotType } from '../../shared/helpers/get-slot-type';
import { formatApplicationReference } from '../../shared/helpers/formatters';
export var getCandidateName = function (slot) {
    var _a = slot.booking.candidate.candidateName, title = _a.title, firstName = _a.firstName, lastName = _a.lastName;
    return title ? title + " " + firstName + " " + lastName : firstName + " " + lastName;
};
export var getTime = function (slot) { return slot.slotDetail.start; };
export var isCandidateCommentsEmpty = function (slot) {
    return isEmpty(slot.booking.previousCancellation);
};
export var getCandidateId = function (slot) { return slot.booking.candidate.candidateId; };
export var isCandidateSpecialNeeds = function (slot) { return !isEmpty(slot.booking.application.specialNeeds); };
export var isCandidateCheckNeeded = function (slot) { return slot.booking.application.entitlementCheck; };
export var getEntitlementCheckText = function () { return 'Entitlement check is required. Call deployment'; };
export var getSlotChanged = function (slot) { return slot.hasSlotChanged; };
export var getPhoneNumber = function (candidate) {
    if (!isEmpty(candidate.mobileTelephone))
        return candidate.mobileTelephone;
    if (!isEmpty(candidate.primaryTelephone))
        return candidate.primaryTelephone;
    if (!isEmpty(candidate.secondaryTelephone))
        return candidate.secondaryTelephone;
    return 'No phone number provided';
};
export var getDetails = function (slot) {
    var details = {
        testCategory: "Category " + slot.booking.application.testCategory,
        slotType: getSlotType(slot),
        meetingPlace: slot.booking.application.meetingPlace,
        driverNumber: slot.booking.candidate.driverNumber,
        applicationRef: getApplicationRef(slot.booking.application),
        specialNeeds: processSpecialNeeds(slot),
        candidateComments: {
            isSectionEmpty: isCandidateCommentsEmpty(slot),
            previousCancellations: slot.booking.previousCancellation,
        },
        entitlementCheck: {
            show: isCandidateCheckNeeded(slot),
        },
        phoneNumber: getPhoneNumber(slot.booking.candidate),
        // TODO: remove the string literal when e-mail address is configured in the service
        email: slot.booking.candidate.emailAddress || 'e-mail unavailable',
        address: slot.booking.candidate.candidateAddress,
    };
    return details;
};
export var processSpecialNeeds = function (slot) {
    return slot.booking.application.specialNeeds ? slot.booking.application.specialNeeds.split(';') : 'None';
};
export var getBusiness = function (slot) { return slot.booking.business; };
export var getApplicationRef = function (application) {
    var applicationReference = {
        applicationId: application.applicationId,
        bookingSequence: application.bookingSequence,
        checkDigit: application.checkDigit,
    };
    return formatApplicationReference(applicationReference);
};
//# sourceMappingURL=candidate-details.selector.js.map