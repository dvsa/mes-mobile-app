export var CLEAR_DECLARATIONS = '[HealthDeclarations] Clear declarations';
export var TOGGLE_HEALTH_DECLARATION = '[HealthDeclarations] Health declaration toggled';
export var HEALTH_DECLARATION_ACCEPTED = '[HealthDeclarations] Health declaration accepted';
export var PASS_CERTIFICATE_RECIEVED = '[HealthDeclarations] Pass certificate recieved';
export var TOGGLE_RECEIPT_DECLARATION = '[HealthDeclarations] Receipt declaration toggled';
export var SIGNATURE_DATA_CHANGED = '[HealthDeclarations] Signature data changed';
export var SIGNATURE_DATA_CLEARED = '[HealthDeclarations] Signature data cleared';
var ClearPostTestDeclarations = /** @class */ (function () {
    function ClearPostTestDeclarations() {
        this.type = CLEAR_DECLARATIONS;
    }
    return ClearPostTestDeclarations;
}());
export { ClearPostTestDeclarations };
var ToggleHealthDeclaration = /** @class */ (function () {
    function ToggleHealthDeclaration() {
        this.type = TOGGLE_HEALTH_DECLARATION;
    }
    return ToggleHealthDeclaration;
}());
export { ToggleHealthDeclaration };
var HealthDeclarationAccepted = /** @class */ (function () {
    function HealthDeclarationAccepted(payload) {
        this.payload = payload;
        this.type = HEALTH_DECLARATION_ACCEPTED;
    }
    return HealthDeclarationAccepted;
}());
export { HealthDeclarationAccepted };
var ToggleReceiptDeclaration = /** @class */ (function () {
    function ToggleReceiptDeclaration() {
        this.type = TOGGLE_RECEIPT_DECLARATION;
    }
    return ToggleReceiptDeclaration;
}());
export { ToggleReceiptDeclaration };
var PassCertificateNumberRecieved = /** @class */ (function () {
    function PassCertificateNumberRecieved(payload) {
        this.payload = payload;
        this.type = PASS_CERTIFICATE_RECIEVED;
    }
    return PassCertificateNumberRecieved;
}());
export { PassCertificateNumberRecieved };
var SignatureDataChanged = /** @class */ (function () {
    function SignatureDataChanged(payload) {
        this.payload = payload;
        this.type = SIGNATURE_DATA_CHANGED;
    }
    return SignatureDataChanged;
}());
export { SignatureDataChanged };
var SignatureDataCleared = /** @class */ (function () {
    function SignatureDataCleared() {
        this.type = SIGNATURE_DATA_CLEARED;
    }
    return SignatureDataCleared;
}());
export { SignatureDataCleared };
//# sourceMappingURL=post-test-declarations.actions.js.map