export var COMMUNICATION_VIEW_DID_ENTER = '[CommunicationPage] Communication page did enter';
export var COMMUNICATION_VIEW_CHOSE_EMAIL_PROVIDED_AT_BOOKING = '[CommunicationPage] Communication page chose email provided at booking';
export var COMMUNICATION_VIEW_CHOSE_NEW_EMAIL = '[CommunicationPage] Communication page chose new email';
export var COMMUNICATION_VIEW_ADDED_NEW_CANDIDATE_EMAIL = '[CommunicationPage] Added new candidate email';
export var COMMUNICATION_SUBMIT_INFO = '[CommunicationPage] Submit Waiting Room Info';
export var COMMUNICATION_SUBMIT_INFO_ERROR = '[CommunicationPage] Submit Waiting Room Info Error';
export var COMMUNICATION_VALIDATION_ERROR = '[CommunicationPage] Communication page validation error';
var CommunicationViewDidEnter = /** @class */ (function () {
    function CommunicationViewDidEnter() {
        this.type = COMMUNICATION_VIEW_DID_ENTER;
    }
    return CommunicationViewDidEnter;
}());
export { CommunicationViewDidEnter };
var CommunicationViewChoseEmailProvidedAtBooking = /** @class */ (function () {
    function CommunicationViewChoseEmailProvidedAtBooking() {
        this.type = COMMUNICATION_VIEW_CHOSE_EMAIL_PROVIDED_AT_BOOKING;
    }
    return CommunicationViewChoseEmailProvidedAtBooking;
}());
export { CommunicationViewChoseEmailProvidedAtBooking };
var CommunicationViewChoseNewEmail = /** @class */ (function () {
    function CommunicationViewChoseNewEmail() {
        this.type = COMMUNICATION_VIEW_CHOSE_NEW_EMAIL;
    }
    return CommunicationViewChoseNewEmail;
}());
export { CommunicationViewChoseNewEmail };
var CommunicationViewInputNewEmail = /** @class */ (function () {
    function CommunicationViewInputNewEmail(payload) {
        this.payload = payload;
        this.type = COMMUNICATION_VIEW_ADDED_NEW_CANDIDATE_EMAIL;
    }
    return CommunicationViewInputNewEmail;
}());
export { CommunicationViewInputNewEmail };
var CommunicationSubmitInfo = /** @class */ (function () {
    function CommunicationSubmitInfo() {
        this.type = COMMUNICATION_SUBMIT_INFO;
    }
    return CommunicationSubmitInfo;
}());
export { CommunicationSubmitInfo };
var CommunicationSubmitInfoError = /** @class */ (function () {
    function CommunicationSubmitInfoError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = COMMUNICATION_SUBMIT_INFO_ERROR;
    }
    return CommunicationSubmitInfoError;
}());
export { CommunicationSubmitInfoError };
var CommunicationValidationError = /** @class */ (function () {
    function CommunicationValidationError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = COMMUNICATION_VALIDATION_ERROR;
    }
    return CommunicationValidationError;
}());
export { CommunicationValidationError };
//# sourceMappingURL=communication.actions.js.map