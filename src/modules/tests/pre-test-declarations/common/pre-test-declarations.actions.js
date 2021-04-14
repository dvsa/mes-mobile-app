export var CLEAR_DECLARATIONS = '[PreTestDeclarations] Clear declarations';
export var TOGGLE_INSURANCE_DECLARATION = '[PreTestDeclarations] Insurance declaration toggled';
export var TOGGLE_RESIDENCY_DECLARATION = '[PreTestDeclarations] Residency declaration toggled';
export var SIGNATURE_DATA_CHANGED = '[PreTestDeclarations] Signature data changed';
export var SIGNATURE_DATA_CLEARED = '[PreTestDeclarations] Signature data cleared';
export var CANDIDATE_DECLARATION_SIGNED = '[PreTestDeclarations] Candidate declaration signed';
export var SET_DECLARATION_STATUS = '[PreTestDeclarations] Setting the residency and insurance declaration';
var ClearPreTestDeclarations = /** @class */ (function () {
    function ClearPreTestDeclarations() {
        this.type = CLEAR_DECLARATIONS;
    }
    return ClearPreTestDeclarations;
}());
export { ClearPreTestDeclarations };
var ToggleInsuranceDeclaration = /** @class */ (function () {
    function ToggleInsuranceDeclaration() {
        this.type = TOGGLE_INSURANCE_DECLARATION;
    }
    return ToggleInsuranceDeclaration;
}());
export { ToggleInsuranceDeclaration };
var ToggleResidencyDeclaration = /** @class */ (function () {
    function ToggleResidencyDeclaration() {
        this.type = TOGGLE_RESIDENCY_DECLARATION;
    }
    return ToggleResidencyDeclaration;
}());
export { ToggleResidencyDeclaration };
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
var CandidateDeclarationSigned = /** @class */ (function () {
    function CandidateDeclarationSigned() {
        this.type = CANDIDATE_DECLARATION_SIGNED;
    }
    return CandidateDeclarationSigned;
}());
export { CandidateDeclarationSigned };
var SetDeclarationStatus = /** @class */ (function () {
    function SetDeclarationStatus(payload) {
        this.payload = payload;
        this.type = SET_DECLARATION_STATUS;
    }
    return SetDeclarationStatus;
}());
export { SetDeclarationStatus };
//# sourceMappingURL=pre-test-declarations.actions.js.map