export var HEALTH_DECLARATION_VIEW_DID_ENTER = '[HealthDeclarationPage] Health declaration did enter';
export var CONTINUE_FROM_DECLARATION = '[HealthDeclarationPage] Continue from declaration';
export var HEALTH_DECLARATION_VALIDATION_ERROR = '[HealthDeclarationPage] Validation Error';
var HealthDeclarationViewDidEnter = /** @class */ (function () {
    function HealthDeclarationViewDidEnter() {
        this.type = HEALTH_DECLARATION_VIEW_DID_ENTER;
    }
    return HealthDeclarationViewDidEnter;
}());
export { HealthDeclarationViewDidEnter };
var ContinueFromDeclaration = /** @class */ (function () {
    function ContinueFromDeclaration() {
        this.type = CONTINUE_FROM_DECLARATION;
    }
    return ContinueFromDeclaration;
}());
export { ContinueFromDeclaration };
var HealthDeclarationValidationError = /** @class */ (function () {
    function HealthDeclarationValidationError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = HEALTH_DECLARATION_VALIDATION_ERROR;
    }
    return HealthDeclarationValidationError;
}());
export { HealthDeclarationValidationError };
//# sourceMappingURL=health-declaration.actions.js.map