var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { pickBy, endsWith, sumBy } from 'lodash';
export var sumManoeuvreFaults = function (manoeuvres, faultType) {
    if (!manoeuvres) {
        return 0;
    }
    var inputManoeuvres = __spreadArray([], (Array.isArray(manoeuvres) ? manoeuvres : [manoeuvres]));
    var manoeuvresCollection = [];
    return inputManoeuvres.reduce(function (acc, manoeuvre) {
        manoeuvresCollection = Object.values(manoeuvre);
        return acc + sumBy(manoeuvresCollection, function (manoeuvre) {
            if (manoeuvre.selected) {
                var dFkeys = pickBy(manoeuvre, function (val, key) { return endsWith(key, 'Fault') && val === faultType; });
                return Object.keys(dFkeys).length;
            }
            return 0;
        });
    }, 0);
};
//# sourceMappingURL=faults.js.map