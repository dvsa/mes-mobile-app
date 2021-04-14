export var PASS_FINALISTATION_VIEW_DID_ENTER = '[PassFinalisationPage] Pass Finalisation view did enter';
export var PASS_FINALISTATION_VALIDATION_ERROR = '[PassFinalisationPage] Validation error';
var PassFinalisationViewDidEnter = /** @class */ (function () {
    function PassFinalisationViewDidEnter() {
        this.type = PASS_FINALISTATION_VIEW_DID_ENTER;
    }
    return PassFinalisationViewDidEnter;
}());
export { PassFinalisationViewDidEnter };
var PassFinalisationValidationError = /** @class */ (function () {
    function PassFinalisationValidationError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = PASS_FINALISTATION_VALIDATION_ERROR;
    }
    return PassFinalisationValidationError;
}());
export { PassFinalisationValidationError };
//# sourceMappingURL=pass-finalisation.actions.js.map