var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { createFeatureSelector } from '@ngrx/store';
import { some } from 'lodash';
export var getSafetyQuestions = function (safetyQuestionsCatDReducer) {
    return safetyQuestionsCatDReducer.questions;
};
export var safetyQuestionsExist = function (safetyQuestions) {
    var questions = __spreadArray([], safetyQuestions.questions);
    return some(questions, function (fault) { return fault.outcome != null; });
};
export var getSafetyQuestionsCatD = createFeatureSelector('safetyQuestions');
//# sourceMappingURL=safety-questions.cat-d.selector.js.map