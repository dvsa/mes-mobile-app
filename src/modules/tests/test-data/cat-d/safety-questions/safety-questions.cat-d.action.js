export var SAFETY_QUESTION_OUTCOME_CHANGED = '[VehicleChecksPage] [CatD] Safety Question Outcome Changed';
export var ADD_SAFETY_QUESTION_COMMENT = '[Vehicle Checks] [CatD] Add SafetyQuestion comment';
var SafetyQuestionOutcomeChanged = /** @class */ (function () {
    function SafetyQuestionOutcomeChanged(safetyQuestionOutcome, index) {
        this.safetyQuestionOutcome = safetyQuestionOutcome;
        this.index = index;
        this.type = SAFETY_QUESTION_OUTCOME_CHANGED;
    }
    return SafetyQuestionOutcomeChanged;
}());
export { SafetyQuestionOutcomeChanged };
var AddSafetyQuestionComment = /** @class */ (function () {
    function AddSafetyQuestionComment(comment) {
        this.comment = comment;
        this.type = ADD_SAFETY_QUESTION_COMMENT;
    }
    return AddSafetyQuestionComment;
}());
export { AddSafetyQuestionComment };
//# sourceMappingURL=safety-questions.cat-d.action.js.map