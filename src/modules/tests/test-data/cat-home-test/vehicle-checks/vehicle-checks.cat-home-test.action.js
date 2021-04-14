export var SHOW_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatHomeTest] Show Me Question Selected';
export var SHOW_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatHomeTest] Show Me Question Outcome Changed';
export var TELL_ME_QUESTION_SELECTED = '[VehicleChecksPage] [CatHomeTest] Tell Me Question Selected';
export var TELL_ME_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatHomeTest] Tell Me Question Outcome Changed';
export var ADD_SHOW_ME_TELL_ME_COMMENT = '[Vehicle Checks] [CatHomeTest] Add Show me Tell me comment';
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
//# sourceMappingURL=vehicle-checks.cat-home-test.action.js.map