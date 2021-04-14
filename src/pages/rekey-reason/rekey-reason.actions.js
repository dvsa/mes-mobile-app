export var REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export var VALIDATE_TRANSFER_REKEY = '[RekeyReasonPage] Validate transfer rekey';
export var VALIDATE_TRANSFER_REKEY_FAILED = '[RekeyReasonPage] Validate transfer rekey failed';
export var RESET_STAFF_NUMBER_VALIDATION_ERROR = '[RekeyReasonPage] Reset staff number validation error';
var RekeyReasonViewDidEnter = /** @class */ (function () {
    function RekeyReasonViewDidEnter() {
        this.type = REKEY_REASON_VIEW_DID_ENTER;
    }
    return RekeyReasonViewDidEnter;
}());
export { RekeyReasonViewDidEnter };
var ValidateTransferRekey = /** @class */ (function () {
    function ValidateTransferRekey() {
        this.type = VALIDATE_TRANSFER_REKEY;
    }
    return ValidateTransferRekey;
}());
export { ValidateTransferRekey };
var ValidateTransferRekeyFailed = /** @class */ (function () {
    function ValidateTransferRekeyFailed(staffNumberNotFound) {
        this.staffNumberNotFound = staffNumberNotFound;
        this.type = VALIDATE_TRANSFER_REKEY_FAILED;
    }
    return ValidateTransferRekeyFailed;
}());
export { ValidateTransferRekeyFailed };
var ResetStaffNumberValidationError = /** @class */ (function () {
    function ResetStaffNumberValidationError() {
        this.type = RESET_STAFF_NUMBER_VALIDATION_ERROR;
    }
    return ResetStaffNumberValidationError;
}());
export { ResetStaffNumberValidationError };
//# sourceMappingURL=rekey-reason.actions.js.map