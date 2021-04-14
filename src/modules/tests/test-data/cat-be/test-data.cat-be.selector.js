import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { QuestionProvider } from '../../../../providers/question/question';
import { NUMBER_OF_SHOW_ME_QUESTIONS } from '../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS } from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
export var getDrivingFaultCount = function (data, competency) { return data.drivingFaults[competency]; };
export var getManoeuvres = function (data) { return data.manoeuvres; };
// TODO - We should pass a Manoeuvre object here instead of TestData
export var hasManoeuvreBeenCompletedCatBE = function (data) {
    return (get(data.manoeuvres, 'reverseLeft.selected'));
};
export var hasEyesightTestBeenCompleted = function (data) { return data.eyesightTest.complete; };
export var hasEyesightTestGotSeriousFault = function (data) { return data.eyesightTest.seriousFault; };
export var hasLegalRequirementBeenCompleted = function (data, legalRequirement) {
    return data[legalRequirement];
};
export var getVehicleChecks = function (state) { return state.vehicleChecks; };
export var getTellMeQuestion = function (state) {
    var questionProvider = new QuestionProvider();
    return questionProvider
        .getTellMeQuestions("B+E" /* BE */)
        .find(function (question) { return question.code === get(state, 'tellMeQuestion.code'); });
};
export var areTellMeQuestionsSelected = function (state) { return typeof get(state, 'tellMeQuestions') !== 'undefined'; };
export var areTellMeQuestionsCorrect = function (state) {
    var tellMeQuestions = get(state, 'tellMeQuestions');
    var correct = true;
    if (typeof tellMeQuestions === 'undefined' || tellMeQuestions === null || !(tellMeQuestions instanceof Array)) {
        correct = false;
    }
    else {
        tellMeQuestions.forEach(function (question) {
            if (question.outcome !== CompetencyOutcome.P) {
                correct = false;
            }
        });
    }
    return correct;
};
// TODO - We should really pass a Vehicle Checks object here and not Test Data
export var hasVehicleChecksBeenCompletedCatBE = function (data) {
    var showMeQuestionComplete = true;
    var tellMeQuestionComplete = true;
    if (!(data.vehicleChecks && data.vehicleChecks.showMeQuestions instanceof Array) ||
        data.vehicleChecks.showMeQuestions.length !== NUMBER_OF_SHOW_ME_QUESTIONS) {
        showMeQuestionComplete = false;
    }
    else {
        data.vehicleChecks.showMeQuestions.forEach(function (element) {
            if (element.outcome == null) {
                showMeQuestionComplete = false;
            }
        });
    }
    if (!(data.vehicleChecks && data.vehicleChecks.tellMeQuestions instanceof Array) ||
        data.vehicleChecks.tellMeQuestions.length !== NUMBER_OF_TELL_ME_QUESTIONS) {
        tellMeQuestionComplete = false;
    }
    else {
        data.vehicleChecks.tellMeQuestions.forEach(function (element) {
            if (element.outcome == null) {
                tellMeQuestionComplete = false;
            }
        });
    }
    return (showMeQuestionComplete && tellMeQuestionComplete);
};
//# sourceMappingURL=test-data.cat-be.selector.js.map