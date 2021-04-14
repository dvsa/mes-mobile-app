export var INITIALIZE_VEHICLE_CHECKS = '[VehicleChecksPage] [CatD] Initialize Vehicle Checks';
export var SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatD] Show Me Question Selected';
export var SHOW_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatD] Show Me Question Outcome Changed';
export var TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatD] Tell Me Question Selected';
export var TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatD] Tell Me Question Outcome Changed';
export var ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] [CatD] Add Show me Tell me comment';
export var VEHICLE_CHECKS_COMPLETED = '[Vehicle Checks] [CatD] Vehicle Checks Completed';
export var VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED = '[Vehicle Checks] [CatD] Vehicle Checks Driving Faults Number Changed';
var InitializeVehicleChecks = /** @class */ (function () {
    function InitializeVehicleChecks(category) {
        this.category = category;
        this.type = INITIALIZE_VEHICLE_CHECKS;
    }
    return InitializeVehicleChecks;
}());
export { InitializeVehicleChecks };
var ShowMeQuestionSelected = /** @class */ (function () {
    function ShowMeQuestionSelected(showMeQuestion, index) {
        this.showMeQuestion = showMeQuestion;
        this.index = index;
        this.type = SHOW_ME_QUESTION_SELECTED;
    }
    return ShowMeQuestionSelected;
}());
export { ShowMeQuestionSelected };
var ShowMeQuestionOutcomeChanged = /** @class */ (function () {
    function ShowMeQuestionOutcomeChanged(showMeQuestionOutcome, index) {
        this.showMeQuestionOutcome = showMeQuestionOutcome;
        this.index = index;
        this.type = SHOW_ME_QUESTION_OUTCOME_CHANGED;
    }
    return ShowMeQuestionOutcomeChanged;
}());
export { ShowMeQuestionOutcomeChanged };
var TellMeQuestionSelected = /** @class */ (function () {
    function TellMeQuestionSelected(tellMeQuestion, index) {
        this.tellMeQuestion = tellMeQuestion;
        this.index = index;
        this.type = TELL_ME_QUESTION_SELECTED;
    }
    return TellMeQuestionSelected;
}());
export { TellMeQuestionSelected };
var TellMeQuestionOutcomeChanged = /** @class */ (function () {
    function TellMeQuestionOutcomeChanged(tellMeQuestionOutcome, index) {
        this.tellMeQuestionOutcome = tellMeQuestionOutcome;
        this.index = index;
        this.type = TELL_ME_QUESTION_OUTCOME_CHANGED;
    }
    return TellMeQuestionOutcomeChanged;
}());
export { TellMeQuestionOutcomeChanged };
var AddShowMeTellMeComment = /** @class */ (function () {
    function AddShowMeTellMeComment(comment) {
        this.comment = comment;
        this.type = ADD_SHOW_ME_TELL_ME_COMMENT;
    }
    return AddShowMeTellMeComment;
}());
export { AddShowMeTellMeComment };
var VehicleChecksCompletedToggled = /** @class */ (function () {
    function VehicleChecksCompletedToggled(toggled) {
        this.toggled = toggled;
        this.type = VEHICLE_CHECKS_COMPLETED;
    }
    return VehicleChecksCompletedToggled;
}());
export { VehicleChecksCompletedToggled };
var VehicleChecksDrivingFaultsNumberChanged = /** @class */ (function () {
    function VehicleChecksDrivingFaultsNumberChanged(payload) {
        this.payload = payload;
        this.type = VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED;
    }
    return VehicleChecksDrivingFaultsNumberChanged;
}());
export { VehicleChecksDrivingFaultsNumberChanged };
//# sourceMappingURL=vehicle-checks.cat-d.action.js.map