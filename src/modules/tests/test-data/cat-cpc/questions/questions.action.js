export var POPULATE_QUESTIONS = '[CatCPC] Populate questions';
export var ANSWER_TOGGLED = '[CatCPC] Answer toggled';
export var POPULATE_QUESTION_SCORE = '[CatCPC] Populate question score';
var PopulateQuestions = /** @class */ (function () {
    function PopulateQuestions(payload) {
        this.payload = payload;
        this.type = POPULATE_QUESTIONS;
    }
    return PopulateQuestions;
}());
export { PopulateQuestions };
var AnswerToggled = /** @class */ (function () {
    function AnswerToggled(toggled, questionNumber, answerNumber) {
        this.toggled = toggled;
        this.questionNumber = questionNumber;
        this.answerNumber = answerNumber;
        this.type = ANSWER_TOGGLED;
    }
    return AnswerToggled;
}());
export { AnswerToggled };
var PopulateQuestionScore = /** @class */ (function () {
    function PopulateQuestionScore(questionNumber, score) {
        this.questionNumber = questionNumber;
        this.score = score;
        this.type = POPULATE_QUESTION_SCORE;
    }
    return PopulateQuestionScore;
}());
export { PopulateQuestionScore };
//# sourceMappingURL=questions.action.js.map