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
export var getSelectedTellMeQuestions = function (vehicleChecks) {
    return vehicleChecks.tellMeQuestions;
};
export var getVehicleChecksSerious = function (vehicleChecks) {
    return vehicleChecks.seriousFault;
};
export var getVehicleChecksDangerous = function (vehicleChecks) {
    return vehicleChecks.dangerousFault;
};
export var vehicleChecksExist = function (vehicleChecks) {
    return some(__spreadArray([], vehicleChecks.tellMeQuestions), function (fault) { return fault.outcome != null; });
};
export var getVehicleChecksCatADI2 = createFeatureSelector('vehicleChecks');
//# sourceMappingURL=vehicle-checks.cat-adi-part2.selector.js.map