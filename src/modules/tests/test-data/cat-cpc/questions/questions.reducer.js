var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as questionActionTypes from './questions.action';
import { QuestionNumber } from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
var initialState = {
    questionCode: null,
    title: null,
    subtitle: null,
    additionalItems: [],
    answer1: null,
    answer2: null,
    answer3: null,
    answer4: null,
    score: 0,
};
var additionalAnswers = {
    answer5: null,
    answer6: null,
    answer7: null,
    answer8: null,
    answer9: null,
    answer10: null,
};
var initialStateQ5 = __assign(__assign({}, initialState), additionalAnswers);
export function question1Reducer(state, action) {
    if (state === void 0) { state = initialState; }
    return questionReducer(state, action, QuestionNumber.ONE);
}
export function question2Reducer(state, action) {
    if (state === void 0) { state = initialState; }
    return questionReducer(state, action, QuestionNumber.TWO);
}
export function question3Reducer(state, action) {
    if (state === void 0) { state = initialState; }
    return questionReducer(state, action, QuestionNumber.THREE);
}
export function question4Reducer(state, action) {
    if (state === void 0) { state = initialState; }
    return questionReducer(state, action, QuestionNumber.FOUR);
}
export function question5Reducer(state, action) {
    if (state === void 0) { state = initialStateQ5; }
    return questionReducer(state, action, QuestionNumber.FIVE);
}
var questionReducer = function (state, action, questionNumber) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case questionActionTypes.POPULATE_QUESTIONS:
            return action.payload[questionNumber];
        case questionActionTypes.ANSWER_TOGGLED:
            var key = getAnswerNumberKey(action.answerNumber);
            return (action.questionNumber === questionNumber) ? __assign(__assign({}, state), (_a = {}, _a[key] = {
                selected: !action.toggled,
                label: state[key].label,
            }, _a)) : state;
        case questionActionTypes.POPULATE_QUESTION_SCORE:
            return (action.questionNumber === questionNumber) ? __assign(__assign({}, state), { score: action.score }) : state;
        default:
            return state;
    }
};
var getAnswerNumberKey = function (questionNumber) { return "answer" + questionNumber; };
//# sourceMappingURL=questions.reducer.js.map