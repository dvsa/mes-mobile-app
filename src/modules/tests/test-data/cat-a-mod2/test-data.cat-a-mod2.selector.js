import { NUMBER_OF_SAFETY_QUESTIONS } from '../../../../shared/constants/safety-questions.cat-a-mod2.constants';
import { NUMBER_OF_BALANCE_QUESTIONS } from '../../../../shared/constants/balance-questions.cat-a-mod2.constants';
export var getDrivingFaultCount = function (data, competency) { return data.drivingFaults[competency]; };
export var getSafetyAndBalanceQuestions = function (state) { return state.safetyAndBalanceQuestions; };
export var getEyesightTest = function (data) { return data.eyesightTest; };
export var haveSafetyAndBalanceQuestionsBeenCompleted = function (data) {
    var safetyQuestionComplete = true;
    var balanceQuestionComplete = true;
    if (!(data && data.safetyQuestions instanceof Array) ||
        data.safetyQuestions.length !== NUMBER_OF_SAFETY_QUESTIONS) {
        safetyQuestionComplete = false;
    }
    else {
        data.safetyQuestions.forEach(function (element) {
            if (element.outcome == null) {
                safetyQuestionComplete = false;
            }
        });
    }
    if (!(data && data.balanceQuestions instanceof Array) ||
        data.balanceQuestions.length !== NUMBER_OF_BALANCE_QUESTIONS) {
        balanceQuestionComplete = false;
    }
    else {
        data.balanceQuestions.forEach(function (element) {
            if (element.outcome == null) {
                balanceQuestionComplete = false;
            }
        });
    }
    return (safetyQuestionComplete && balanceQuestionComplete);
};
//# sourceMappingURL=test-data.cat-a-mod2.selector.js.map