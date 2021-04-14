export var PASS_CERTIFICATE_NUMBER_CHANGED = '[Pass Completion] Pass certificate number changed';
export var PROVISIONAL_LICENSE_RECEIVED = '[Pass Completion] Provisional license received';
export var PROVISIONAL_LICENSE_NOT_RECEIVED = '[Pass Completion] Provisional license not received';
export var CODE_78_PRESENT = '[Pass Completion] Code 78 present';
export var CODE_78_NOT_PRESENT = '[Pass Completion] Code 78 not present';
var PassCertificateNumberChanged = /** @class */ (function () {
    function PassCertificateNumberChanged(passCertificateNumber) {
        this.passCertificateNumber = passCertificateNumber;
        this.type = PASS_CERTIFICATE_NUMBER_CHANGED;
    }
    return PassCertificateNumberChanged;
}());
export { PassCertificateNumberChanged };
var ProvisionalLicenseReceived = /** @class */ (function () {
    function ProvisionalLicenseReceived() {
        this.type = PROVISIONAL_LICENSE_RECEIVED;
    }
    return ProvisionalLicenseReceived;
}());
export { ProvisionalLicenseReceived };
var ProvisionalLicenseNotReceived = /** @class */ (function () {
    function ProvisionalLicenseNotReceived() {
        this.type = PROVISIONAL_LICENSE_NOT_RECEIVED;
    }
    return ProvisionalLicenseNotReceived;
}());
export { ProvisionalLicenseNotReceived };
var Code78Present = /** @class */ (function () {
    function Code78Present() {
        this.type = CODE_78_PRESENT;
    }
    return Code78Present;
}());
export { Code78Present };
var Code78NotPresent = /** @class */ (function () {
    function Code78NotPresent() {
        this.type = CODE_78_NOT_PRESENT;
    }
    return Code78NotPresent;
}());
export { Code78NotPresent };
//# sourceMappingURL=pass-completion.actions.js.map