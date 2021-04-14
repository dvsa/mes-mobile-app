export var SAFETY_QUESTION_SELECTED = '[VehicleChecksPage] [CatAMod2] Safety Question Selected';
export var SAFETY_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatAMod2] Safety Question Outcome Changed';
export var BALANCE_QUESTION_SELECTED = '[VehicleChecksPage] [CatAMod2] Balance Question Selected';
export var BALANCE_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatAMod2] Balance Question Outcome Changed';
export var ADD_SAFETY_AND_BALANCE_COMMENT = '[Vehicle Checks] [CatAMod2] Add Safety and Balance comment';
var SafetyQuestionSelected = /** @class */ (function () {
    function SafetyQuestionSelected(safetyQuestion, index) {
        this.safetyQuestion = safetyQuestion;
        this.index = index;
        this.type = SAFETY_QUESTION_SELECTED;
    }
    return SafetyQuestionSelected;
}());
export { SafetyQuestionSelected };
var SafetyQuestionOutcomeChanged = /** @class */ (function () {
    function SafetyQuestionOutcomeChanged(safetyQuestionOutcome, index) {
        this.safetyQuestionOutcome = safetyQuestionOutcome;
        this.index = index;
        this.type = SAFETY_QUESTION_OUTCOME_CHANGED;
    }
    return SafetyQuestionOutcomeChanged;
}());
export { SafetyQuestionOutcomeChanged };
var BalanceQuestionSelected = /** @class */ (function () {
    function BalanceQuestionSelected(balanceQuestion, index) {
        this.balanceQuestion = balanceQuestion;
        this.index = index;
        this.type = BALANCE_QUESTION_SELECTED;
    }
    return BalanceQuestionSelected;
}());
export { BalanceQuestionSelected };
var BalanceQuestionOutcomeChanged = /** @class */ (function () {
    function BalanceQuestionOutcomeChanged(balanceQuestionOutcome, index) {
        this.balanceQuestionOutcome = balanceQuestionOutcome;
        this.index = index;
        this.type = BALANCE_QUESTION_OUTCOME_CHANGED;
    }
    return BalanceQuestionOutcomeChanged;
}());
export { BalanceQuestionOutcomeChanged };
var AddSafetyAndBalanceComment = /** @class */ (function () {
    function AddSafetyAndBalanceComment(comment) {
        this.comment = comment;
        this.type = ADD_SAFETY_AND_BALANCE_COMMENT;
    }
    return AddSafetyAndBalanceComment;
}());
export { AddSafetyAndBalanceComment };
//# sourceMappingURL=safety-and-balance.cat-a-mod2.actions.js.map