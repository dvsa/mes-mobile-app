export var NON_PASS_FINALISATION_VIEW_DID_ENTER = '[NonPassFinalisationPage] NonPassFinalisation view did enter';
export var NON_PASS_FINALISATION_VALIDATION_ERROR = '[NonPassFinalisationPage] Validation Error';
var NonPassFinalisationViewDidEnter = /** @class */ (function () {
    function NonPassFinalisationViewDidEnter() {
        this.type = NON_PASS_FINALISATION_VIEW_DID_ENTER;
    }
    return NonPassFinalisationViewDidEnter;
}());
export { NonPassFinalisationViewDidEnter };
var NonPassFinalisationValidationError = /** @class */ (function () {
    function NonPassFinalisationValidationError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = NON_PASS_FINALISATION_VALIDATION_ERROR;
    }
    return NonPassFinalisationValidationError;
}());
export { NonPassFinalisationValidationError };
//# sourceMappingURL=non-pass-finalisation.actions.js.map