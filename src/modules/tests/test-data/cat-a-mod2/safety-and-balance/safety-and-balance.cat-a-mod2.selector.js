var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { createFeatureSelector } from '@ngrx/store';
export var getSelectedSafetyQuestions = function (safetyAndBalanceQuestions) {
    return safetyAndBalanceQuestions.safetyQuestions;
};
export var getSelectedBalanceQuestions = function (safetyAndBalanceQuestions) {
    return safetyAndBalanceQuestions.balanceQuestions;
};
export var safetyAndBalanceQuestionsExist = function (safetyAndBalanceQuestions) {
    var questions = __spreadArray(__spreadArray([], safetyAndBalanceQuestions.safetyQuestions), safetyAndBalanceQuestions.balanceQuestions);
    return questions.some(function (fault) { return !!fault.outcome; });
};
export var getSafetyAndBalanceQuestions = createFeatureSelector('safetyAndBalanceQuestions');
//# sourceMappingURL=safety-and-balance.cat-a-mod2.selector.js.map