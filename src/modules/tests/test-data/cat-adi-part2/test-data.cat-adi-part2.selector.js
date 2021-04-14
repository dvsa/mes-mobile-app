import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { QuestionProvider } from '../../../../providers/question/question';
import { NUMBER_OF_TELL_ME_QUESTIONS } from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-adi-part2.constants';
export var getDrivingFaultCount = function (data, competency) { return data.drivingFaults[competency]; };
export var getManoeuvresADI2 = function (data) {
    return data.manoeuvres;
};
export var hasManoeuvreBeenCompletedCatADIPart2 = function (manoeuvres) {
    if (!manoeuvres || manoeuvres.length < 2)
        return false;
    return manoeuvres.every(function (manoeuvre) {
        return (get(manoeuvre, 'forwardPark.selected') ||
            get(manoeuvre, 'reverseParkCarpark.selected') ||
            get(manoeuvre, 'reverseParkRoad.selected') ||
            get(manoeuvre, 'reverseRight.selected'));
    });
};
export var hasEyesightTestBeenCompleted = function (data) { return data.eyesightTest.complete; };
export var hasEyesightTestGotSeriousFault = function (data) { return data.eyesightTest.seriousFault; };
export var hasLegalRequirementBeenCompleted = function (data, legalRequirement) {
    return data[legalRequirement];
};
export var getVehicleChecksCatADIPart2 = function (state) { return state.vehicleChecks; };
export var getTellMeQuestion = function (state) {
    var questionProvider = new QuestionProvider();
    return questionProvider
        .getTellMeQuestions("ADI2" /* ADI2 */)
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
export var hasVehicleChecksBeenCompletedCatADI2 = function (vehicleChecks) {
    if (!(vehicleChecks && vehicleChecks.tellMeQuestions instanceof Array) ||
        vehicleChecks.tellMeQuestions.length !== NUMBER_OF_TELL_ME_QUESTIONS ||
        !vehicleChecks.vehicleChecksCompleted) {
        return false;
    }
    vehicleChecks.tellMeQuestions.forEach(function (element) {
        if (element.outcome == null) {
            return false;
        }
    });
    return true;
};
//# sourceMappingURL=test-data.cat-adi-part2.selector.js.map