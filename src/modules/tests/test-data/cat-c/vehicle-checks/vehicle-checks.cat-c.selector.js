var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { createFeatureSelector } from '@ngrx/store';
import { some } from 'lodash';
export var getSelectedShowMeQuestions = function (vehicleChecks) {
    return vehicleChecks.showMeQuestions;
};
export var getSelectedTellMeQuestions = function (vehicleChecksCatCReducer) {
    return vehicleChecksCatCReducer.tellMeQuestions;
};
export var vehicleChecksExist = function (vehicleChecks) {
    var questions = __spreadArray(__spreadArray([], vehicleChecks.showMeQuestions), vehicleChecks.tellMeQuestions);
    return some(questions, function (fault) { return fault.outcome != null; });
};
export var getVehicleChecksCompleted = function (vehicleChecks) { return vehicleChecks.vehicleChecksCompleted; };
export var getVehicleChecksCatC = createFeatureSelector('vehicleChecks');
//# sourceMappingURL=vehicle-checks.cat-c.selector.js.map