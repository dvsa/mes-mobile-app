export var SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatADI2] Show Me Question Selected';
export var SHOW_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatADI2] Show Me Question Outcome Changed';
export var TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatADI2] Tell Me Question Selected';
export var TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatADI2] Tell Me Question Outcome Changed';
export var SHOW_ME_QUESTION_ADD_DRIVING_FAULT = '[Vehicle Checks] [CatADI2] Show Me Question Add Driving Fault';
export var SHOW_ME_QUESTION_REMOVE_DRIVING_FAULT = '[Vehicle Checks] [CatADI2] Show Me Question Remove Driving Fault';
export var VEHICLE_CHECKS_ADD_SERIOUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Add Serious Fault';
export var VEHICLE_CHECKS_REMOVE_SERIOUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Remove Serious Fault';
export var VEHICLE_CHECKS_ADD_DANGEROUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Add Dangerous Fault';
export var VEHICLE_CHECKS_REMOVE_DANGEROUS_FAULT = '[Vehicle Checks] [CatADI2] Vehicle Checks Remove Dangerous Fault';
export var ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] [CatADI2] Add Show Me / Tell Me comment';
export var VEHICLE_CHECKS_TOGGLE = '[Vehicle Checks] [CatADI2] Vehicle Checks Completed Toggled';
var ShowMeQuestionSelected = /** @class */ (function () {
    function ShowMeQuestionSelected(showMeQuestion, index) {
        this.showMeQuestion = showMeQuestion;
        this.index = index;
        this.type = SHOW_ME_QUESTION_SELECTED;
    }
    return ShowMeQuestionSelected;
}());
export { ShowMeQuestionSelected };
var VehicleChecksCompletedToggle = /** @class */ (function () {
    function VehicleChecksCompletedToggle() {
        this.type = VEHICLE_CHECKS_TOGGLE;
    }
    return VehicleChecksCompletedToggle;
}());
export { VehicleChecksCompletedToggle };
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
var ShowMeQuestionAddDrivingFault = /** @class */ (function () {
    function ShowMeQuestionAddDrivingFault(index) {
        this.index = index;
        this.type = SHOW_ME_QUESTION_ADD_DRIVING_FAULT;
    }
    return ShowMeQuestionAddDrivingFault;
}());
export { ShowMeQuestionAddDrivingFault };
var ShowMeQuestionRemoveDrivingFault = /** @class */ (function () {
    function ShowMeQuestionRemoveDrivingFault(index) {
        this.index = index;
        this.type = SHOW_ME_QUESTION_REMOVE_DRIVING_FAULT;
    }
    return ShowMeQuestionRemoveDrivingFault;
}());
export { ShowMeQuestionRemoveDrivingFault };
var VehicleChecksAddSeriousFault = /** @class */ (function () {
    function VehicleChecksAddSeriousFault() {
        this.type = VEHICLE_CHECKS_ADD_SERIOUS_FAULT;
    }
    return VehicleChecksAddSeriousFault;
}());
export { VehicleChecksAddSeriousFault };
var VehicleChecksAddDangerousFault = /** @class */ (function () {
    function VehicleChecksAddDangerousFault() {
        this.type = VEHICLE_CHECKS_ADD_DANGEROUS_FAULT;
    }
    return VehicleChecksAddDangerousFault;
}());
export { VehicleChecksAddDangerousFault };
var VehicleChecksRemoveSeriousFault = /** @class */ (function () {
    function VehicleChecksRemoveSeriousFault() {
        this.type = VEHICLE_CHECKS_REMOVE_SERIOUS_FAULT;
    }
    return VehicleChecksRemoveSeriousFault;
}());
export { VehicleChecksRemoveSeriousFault };
var VehicleChecksRemoveDangerousFault = /** @class */ (function () {
    function VehicleChecksRemoveDangerousFault() {
        this.type = VEHICLE_CHECKS_REMOVE_DANGEROUS_FAULT;
    }
    return VehicleChecksRemoveDangerousFault;
}());
export { VehicleChecksRemoveDangerousFault };
//# sourceMappingURL=vehicle-checks.cat-adi-part2.action.js.map