import { NUMBER_OF_SHOW_ME_QUESTIONS, } from '../../../../shared/constants/show-me-questions/show-me-questions.cat-home-test.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS, } from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-home-test.constants';
import { get } from 'lodash';
export var getVehicleChecks = function (state) { return state.vehicleChecks; };
export var getManoeuvres = function (data) { return get(data, 'manoeuvres'); };
// TODO - We should pass a Manoeuvre object here instead of TestData
export var hasManoeuvreBeenCompletedCatHomeTest = function (data) {
    return (get(data, 'manoeuvres.reverseLeft.selected', undefined) // default to undefined for CAT K
    );
};
// TODO - We should really pass a Vehicle Checks object here and not Test Data
// TODO - Also this has to go into a provider
export var hasVehicleChecksBeenCompletedCatHomeTest = function (data) {
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
//# sourceMappingURL=test-data.cat-home.selector.js.map